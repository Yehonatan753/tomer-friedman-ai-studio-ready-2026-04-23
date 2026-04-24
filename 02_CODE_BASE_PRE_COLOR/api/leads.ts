import { LeadSchema, type ApiRequest, type ApiResponse, methodNotAllowed, rateLimit, trimText } from './_utils';

async function forwardLead(payload: unknown) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { persisted: false };
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (process.env.LEADS_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.LEADS_WEBHOOK_SECRET}`;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  return { persisted: response.ok };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST, OPTIONS');
  }

  if (!rateLimit(req, 40, 60_000)) {
    return res.status(429).json({ ok: false, error: 'rate-limited' });
  }

  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'invalid-lead' });
  }

  const lead = {
    ...parsed.data,
    name: trimText(parsed.data.name, 120),
    phone: trimText(parsed.data.phone, 40),
    email: trimText(parsed.data.email, 160),
    product: trimText(parsed.data.product, 160),
    message: trimText(parsed.data.message, 2000),
    createdAt: new Date().toISOString(),
  };

  try {
    const result = await forwardLead(lead);
    return res.status(200).json({ ok: true, ...result });
  } catch {
    return res.status(200).json({ ok: true, persisted: false, warning: 'lead-forward-failed' });
  }
}
