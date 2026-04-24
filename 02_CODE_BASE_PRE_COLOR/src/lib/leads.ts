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
  const opened = window.open(url, '_blank');
  if (opened) {
    opened.opener = null;
    return;
  }

  window.location.assign(url);
}

export function submitLeadInBackground(payload: LeadPayload) {
  const body = JSON.stringify(payload);

  try {
    if ('sendBeacon' in navigator) {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon('/api/leads', blob)) {
        return;
      }
    }
  } catch {
    // Fall back to fetch below.
  }

  void submitLead(payload);
}

export function submitLeadAndOpenWhatsApp(payload: LeadPayload, message: string) {
  openWhatsApp(message);
  submitLeadInBackground(payload);
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
