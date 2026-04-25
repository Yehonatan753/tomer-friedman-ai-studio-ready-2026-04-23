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
export const ISRAELI_PHONE_PATTERN = '(?:\\+?972[\\s-]?|0)(?:5\\d|7\\d|[23489])[\\s-]?\\d{3}[\\s-]?\\d{4}';
const HTML_PHONE_PATTERN = '[0-9+\\- ]{9,16}';

export const leadInputProps = {
  fullName: {
    minLength: 5,
    autoComplete: 'name',
    title: 'הכניסו שם מלא, לפחות שם פרטי ומשפחה',
  },
  phone: {
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
    pattern: HTML_PHONE_PATTERN,
    title: 'הכניסו מספר ישראלי תקין, לדוגמה 054-669-9574',
  },
  email: {
    type: 'email',
    inputMode: 'email',
    autoComplete: 'email',
    title: 'הכניסו כתובת אימייל תקינה',
  },
} as const;

export function normalizeIsraeliPhone(input = '') {
  const digits = input.replace(/\D/g, '');

  if (digits.startsWith('972') && digits.length >= 11) {
    return `0${digits.slice(3)}`;
  }

  return digits;
}

export function isValidIsraeliPhone(input = '') {
  return new RegExp(`^${ISRAELI_PHONE_PATTERN}$`).test(input.trim()) || /^0(?:5\d{8}|7\d{8}|[23489]\d{7})$/.test(normalizeIsraeliPhone(input));
}

export function isValidEmailAddress(input = '', required = false) {
  const value = input.trim();
  if (!value) return !required;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function markInvalid(input: HTMLInputElement, message: string, currentFirst?: HTMLInputElement) {
  input.setCustomValidity(message);
  return currentFirst ?? input;
}

export function validateLeadForm(form: HTMLFormElement) {
  const inputs = Array.from(form.querySelectorAll<HTMLInputElement>('input'));
  inputs.forEach((input) => input.setCustomValidity(''));

  const nameInput = form.querySelector<HTMLInputElement>('input[name="name"], input[data-lead-name]');
  const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"], input[data-lead-phone]');
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"], input[type="email"], input[data-lead-email]');

  let firstInvalid: HTMLInputElement | undefined;

  if (nameInput?.required && nameInput.value.trim().length < leadInputProps.fullName.minLength) {
    firstInvalid = markInvalid(nameInput, 'הכניסו שם מלא, לפחות שם פרטי ומשפחה.', firstInvalid);
  }

  if (phoneInput && (phoneInput.required || phoneInput.value.trim()) && !isValidIsraeliPhone(phoneInput.value)) {
    firstInvalid = markInvalid(phoneInput, 'הכניסו מספר טלפון ישראלי תקין, לדוגמה 054-669-9574.', firstInvalid);
  }

  if (emailInput && !isValidEmailAddress(emailInput.value, emailInput.required)) {
    firstInvalid = markInvalid(emailInput, 'הכניסו כתובת אימייל תקינה.', firstInvalid);
  }

  if (firstInvalid || !form.checkValidity()) {
    firstInvalid?.focus();
    form.reportValidity();
    return false;
  }

  return true;
}

export function cleanLeadPayload(payload: LeadPayload): LeadPayload {
  return {
    ...payload,
    name: payload.name?.trim(),
    phone: payload.phone ? normalizeIsraeliPhone(payload.phone) : undefined,
    email: payload.email?.trim().toLowerCase(),
  };
}

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
  const body = JSON.stringify(cleanLeadPayload(payload));

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
      body: JSON.stringify(cleanLeadPayload(payload)),
    });

    if (!response.ok) {
      return { ok: false, error: 'lead-request-failed' };
    }

    return (await response.json()) as LeadResponse;
  } catch {
    return { ok: false, error: 'lead-network-error' };
  }
}
