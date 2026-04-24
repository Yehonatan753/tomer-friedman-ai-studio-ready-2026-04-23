export type LeadSource =
  | 'download-popup'
  | 'course-popup'
  | 'newsletter'
  | 'final-cta'
  | 'footer'
  | 'insurance'
  | 'pathfinder'
  | 'gemini-agent';

export type LeadPayload = {
  source: LeadSource;
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

export type LeadResponse = {
  ok: boolean;
  persisted?: boolean;
  error?: string;
};

export const TOMER_WHATSAPP = 'https://wa.me/972546699574';

export function openWhatsApp(message: string) {
  const url = `${TOMER_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, error: 'lead-request-failed' };
    }

    return (await response.json()) as LeadResponse;
  } catch {
    return { ok: false, error: 'lead-network-error' };
  }
}
