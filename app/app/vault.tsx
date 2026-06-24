import { useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type DocumentKind, type VaultDocument } from '../lib/api';
import { supabase } from '../lib/supabase';
import { track } from '../lib/analytics';
import { colors, radius, spacing } from '../lib/theme';

const KINDS: { value: DocumentKind; label: string }[] = [
  { value: 'birth_certificate', label: 'Birth certificate' },
  { value: 'ssn', label: 'Social Security card' },
  { value: 'id', label: 'Photo ID' },
  { value: 'school', label: 'School records' },
  { value: 'medical', label: 'Medical records' },
  { value: 'court', label: 'Court papers' },
  { value: 'other', label: 'Other' },
];

const KIND_LABEL = Object.fromEntries(KINDS.map((k) => [k.value, k.label]));

/**
 * Document Vault — encrypted, private storage for the papers foster youth lose
 * between placements. Upload, list, and one-tap share via short-lived signed URLs.
 */
export default function VaultScreen() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['documents'], queryFn: api.listDocuments });
  const [uploadingKind, setUploadingKind] = useState<DocumentKind | null>(null);

  async function pickAndUpload(kind: DocumentKind) {
    const picked = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'], copyToCacheDirectory: true });
    if (picked.canceled || !picked.assets?.[0]) return;
    const asset = picked.assets[0];

    setUploadingKind(kind);
    try {
      const { bucket, path, token } = await api.createDocument(kind, asset.name);
      const fileBody = await (await fetch(asset.uri)).blob();
      const { error } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, fileBody, {
        contentType: asset.mimeType ?? 'application/octet-stream',
      });
      if (error) throw error;
      track('doc_uploaded', { kind });
      qc.invalidateQueries({ queryKey: ['documents'] });
    } catch (e) {
      Alert.alert('Upload failed', e instanceof Error ? e.message : 'Try again');
    } finally {
      setUploadingKind(null);
    }
  }

  const share = useMutation({
    mutationFn: (id: string) => api.shareDocument(id),
    onSuccess: ({ url }) => Linking.openURL(url),
    onError: (e) => Alert.alert('Could not create link', e instanceof Error ? e.message : 'Try again'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.deleteDocument(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: 'Document vault', headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.text }} />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.muted}>Keep your important papers in one safe place. Only you can open them. Share a copy in one tap when a caseworker, landlord, or employer needs it.</Text>

        <Text style={styles.section}>Add a document</Text>
        <View style={styles.kindGrid}>
          {KINDS.map((k) => (
            <Pressable key={k.value} style={styles.kindChip} onPress={() => pickAndUpload(k.value)} disabled={!!uploadingKind}>
              {uploadingKind === k.value ? <ActivityIndicator color={colors.text} /> : <Text style={styles.kindChipText}>＋ {k.label}</Text>}
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>Your documents</Text>
        {isLoading ? (
          <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.md }} />
        ) : (data?.documents ?? []).length === 0 ? (
          <Text style={styles.muted}>Nothing here yet. Add your birth certificate or ID to start.</Text>
        ) : (
          (data?.documents ?? []).map((doc: VaultDocument) => (
            <View key={doc.id} style={styles.docRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.docKind}>{KIND_LABEL[doc.kind] ?? doc.kind}</Text>
                <Text style={styles.docName}>{doc.filename}</Text>
              </View>
              <Pressable style={styles.docAction} onPress={() => share.mutate(doc.id)}>
                <Text style={styles.docActionText}>Share</Text>
              </Pressable>
              <Pressable style={styles.docAction} onPress={() => remove.mutate(doc.id)}>
                <Text style={[styles.docActionText, { color: colors.panic }]}>Delete</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  muted: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  section: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.xl, marginBottom: spacing.sm },
  kindGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  kindChip: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  kindChipText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  docKind: { color: colors.text, fontWeight: '700', fontSize: 15 },
  docName: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  docAction: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  docActionText: { color: colors.accent, fontWeight: '700', fontSize: 13 },
});
