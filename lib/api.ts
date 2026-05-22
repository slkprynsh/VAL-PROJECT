/**
 * VALTRIX API Client
 * Place this at: lib/api.ts in your Next.js project
 *
 * Usage:
 *   import { api } from '@/lib/api'
 *   const quotes = await api.quotes.getMyQuotes()
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// ─── Token management (in-memory, never localStorage) ─────────────────
let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
}

// ─── Core fetcher ──────────────────────────────────────────────────────
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Auto-refresh on 401
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      setTokens(data.accessToken, data.refreshToken);
      headers['Authorization'] = `Bearer ${data.accessToken}`;

      // Retry original request
      const retry = await fetch(`${BASE_URL}${path}`, { ...options, headers });
      return retry.json();
    } else {
      clearTokens();
      throw new Error('Session expired. Please log in again.');
    }
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ─── API surface ───────────────────────────────────────────────────────
export const api = {

  auth: {
    register: (body: { name: string; email: string; password: string; company?: string }) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

    login: (body: { email: string; password: string }) =>
      request<{ accessToken: string; refreshToken: string; user: unknown }>(
        '/auth/login', { method: 'POST', body: JSON.stringify(body) }
      ),

    forgotPassword: (email: string) =>
      request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),

    resetPassword: (token: string, body: { password: string; confirmPassword: string }) =>
      request(`/auth/reset-password/${token}`, { method: 'POST', body: JSON.stringify(body) }),

    googleLogin: () => { window.location.href = `${BASE_URL}/auth/google`; },
    linkedinLogin: () => { window.location.href = `${BASE_URL}/auth/linkedin`; },
  },

  users: {
    me: () => request('/users/me'),
    updateMe: (body: Partial<{ name: string; company: string; phone: string }>) =>
      request('/users/me', { method: 'PATCH', body: JSON.stringify(body) }),
  },

  quotes: {
    create: (body: unknown) =>
      request('/quotes', { method: 'POST', body: JSON.stringify(body) }),

    getMyQuotes: () => request('/quotes/my'),

    getByRef: (ref: string) => request(`/quotes/${ref}`),
  },

  contact: {
    send: (body: { name: string; email: string; company?: string; message: string; type?: string }) =>
      request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  },

  blog: {
    list: (params?: { category?: string; page?: number; limit?: number; tag?: string }) => {
      const qs = new URLSearchParams(params as Record<string, string>).toString();
      return request(`/blog${qs ? `?${qs}` : ''}`);
    },
    getBySlug: (slug: string) => request(`/blog/${slug}`),
  },

  testimonials: {
    list: () => request('/testimonials'),
  },

  careers: {
    apply: (formData: FormData) =>
      fetch(`${BASE_URL}/careers/apply`, {
        method: 'POST',
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        body: formData, // multipart — no Content-Type header (browser sets it)
      }).then((r) => r.json()),
  },

  upload: {
    image: async (file: File, folder = 'misc') => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${BASE_URL}/upload/image?folder=${folder}`, {
        method: 'POST',
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        body: formData,
      });
      return res.json();
    },
  },
};
