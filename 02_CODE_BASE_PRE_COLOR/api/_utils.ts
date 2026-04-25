import { z } from 'zod';

export type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

export type ApiResponse = {
  status(code: number): ApiResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
  end(): void;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: ApiRequest) {
  const forwarded = req.headers?.['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}

export function rateLimit(req: ApiRequest, limit = 25, windowMs = 60_000) {
  const now = Date.now();
  const ip = getClientIp(req);
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}

export function methodNotAllowed(res: ApiResponse, allowed = 'POST') {
  res.setHeader('Allow', allowed);
  return res.status(405).json({ ok: false, error: 'method-not-allowed' });
}

export function trimText(value: string | undefined, max = 2000) {
  return (value || '').trim().slice(0, max);
}

export function normalizeIsraeliPhone(input = '') {
  const digits = input.replace(/\D/g, '');

  if (digits.startsWith('972') && digits.length >= 11) {
    return `0${digits.slice(3)}`;
  }

  return digits;
}

export function isValidIsraeliPhone(input = '') {
  const value = input.trim();
  return /^(?:\+?972[\s-]?|0)(?:5\d|7\d|[23489])[\s-]?\d{3}[\s-]?\d{4}$/.test(value) || /^0(?:5\d{8}|7\d{8}|[23489]\d{7})$/.test(normalizeIsraeliPhone(value));
}

export const LeadSchema = z.object({
  source: z.string().min(1).max(80),
  name: z.string().max(120).optional(),
  phone: z.string().max(40).optional().refine((value) => !value || isValidIsraeliPhone(value), 'invalid-phone'),
  email: z.string().email().max(160).optional().or(z.literal('')),
  product: z.string().max(160).optional(),
  message: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});
