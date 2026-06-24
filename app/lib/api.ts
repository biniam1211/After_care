import Constants from 'expo-constants';
import { supabase } from './supabase';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Constants.expoConfig?.extra?.apiUrl as string) ??
  'http://localhost:4000';

/**
 * Thin fetch wrapper that attaches the Supabase access token to every request.
 */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface CitedResource {
  id: string;
  name: string;
  phone: string | null;
  url: string | null;
}

export const api = {
  getMe: () => request<{ user: unknown }>('/me'),
  saveProfile: (profile: Record<string, unknown>) =>
    request<{ user: unknown }>('/me', { method: 'POST', body: JSON.stringify(profile) }),

  sendChat: (message: string, conversationId?: string) =>
    request<{ conversationId: string; reply: string; resources: CitedResource[] }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversationId }),
    }),

  listQuests: () => request<{ quests: Quest[] }>('/quests'),
  getQuest: (slug: string) => request<Quest>(`/quests/${slug}`),
  advanceQuest: (slug: string, currentStep: number) =>
    request<{ progress: unknown; completed: boolean }>(`/quests/${slug}/progress`, {
      method: 'POST',
      body: JSON.stringify({ currentStep }),
    }),

  listResources: (params: { category?: string; state?: string; zip?: string }) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v) as [string, string][],
    ).toString();
    return request<{ resources: Resource[] }>(`/resources?${qs}`);
  },

  panic: (scenario: PanicScenario) =>
    request<PanicPlan>('/panic', { method: 'POST', body: JSON.stringify({ scenario }) }),
};

export interface QuestStep {
  step: number;
  title: string;
  what: string;
  why: string;
  action: string;
  ai_check: string;
}

export interface Quest {
  id: string;
  slug: string;
  title: string;
  description: string;
  steps: QuestStep[];
  progress: { current_step: number; completed_at: string | null } | null;
}

export interface Resource {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  phone: string | null;
  url: string | null;
  address: string | null;
}

export type PanicScenario = 'homeless' | 'kicked_out' | 'abuse' | 'eviction' | 'other';

export interface CrisisResource {
  name: string;
  phone?: string;
  sms?: string;
  url?: string;
  note: string;
}

export interface PanicPlan {
  scenario: PanicScenario;
  national: CrisisResource[];
  local: Resource[];
}
