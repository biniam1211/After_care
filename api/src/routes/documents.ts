import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';

export const documentsRouter = Router();

const BUCKET = 'user-documents';

const DOC_KINDS = ['birth_certificate', 'ssn', 'id', 'school', 'medical', 'court', 'other'] as const;

const createSchema = z.object({
  kind: z.enum(DOC_KINDS),
  filename: z.string().min(1).max(200),
});

/**
 * POST /documents — register a document and get a signed upload URL.
 * The app uploads bytes directly to storage via uploadToSignedUrl(path, token).
 */
documentsRouter.post('/documents', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const db = supabaseForUser(req.accessToken!);
  const safeName = parsed.data.filename.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Create the row first to get an id for a collision-free path.
  const { data: doc, error } = await db
    .from('documents')
    .insert({ user_id: req.userId!, kind: parsed.data.kind, filename: safeName, file_path: 'pending' })
    .select('id')
    .single();
  if (error || !doc) return res.status(500).json({ error: 'Could not create document' });

  const path = `${req.userId}/${doc.id}/${safeName}`;
  const { data: signed, error: signErr } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
  if (signErr || !signed) return res.status(500).json({ error: 'Could not create upload URL' });

  await db.from('documents').update({ file_path: path }).eq('id', doc.id);

  res.json({ id: doc.id, bucket: BUCKET, path, token: signed.token });
});

/** GET /documents — list the user's documents (metadata only). */
documentsRouter.get('/documents', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);
  const { data, error } = await db
    .from('documents')
    .select('id, kind, filename, created_at')
    .eq('user_id', req.userId!)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: 'Could not load documents' });
  res.json({ documents: data ?? [] });
});

/** POST /documents/:id/share — short-lived signed URL for one-tap sharing. */
documentsRouter.post('/documents/:id/share', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);
  const { data: doc, error } = await db
    .from('documents')
    .select('file_path')
    .eq('id', req.params.id)
    .eq('user_id', req.userId!)
    .maybeSingle();
  if (error || !doc) return res.status(404).json({ error: 'Document not found' });

  const { data: signed, error: signErr } = await db.storage
    .from(BUCKET)
    .createSignedUrl(doc.file_path, 60 * 60); // 1 hour
  if (signErr || !signed) return res.status(500).json({ error: 'Could not create share link' });

  res.json({ url: signed.signedUrl, expiresInSeconds: 3600 });
});

/** DELETE /documents/:id — remove the row and the stored object. */
documentsRouter.delete('/documents/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);
  const { data: doc } = await db
    .from('documents')
    .select('file_path')
    .eq('id', req.params.id)
    .eq('user_id', req.userId!)
    .maybeSingle();
  if (doc?.file_path) await db.storage.from(BUCKET).remove([doc.file_path]);
  await db.from('documents').delete().eq('id', req.params.id).eq('user_id', req.userId!);
  res.json({ ok: true });
});
