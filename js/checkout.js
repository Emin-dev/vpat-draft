// Sandbox checkout — TEST MODE ONLY. No real payment provider connected.
// Same honest pattern proven in Instant Portfolio/Cohort Autopsy: real
// Luhn validation and a documented test-card decline path, but no real
// charge is ever possible since there's no live processor wired in.

export function luhnCheck(cardNumber) {
    const digits = String(cardNumber).replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0;
    let alternate = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = parseInt(digits[i], 10);
        if (alternate) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        sum += d;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

export function validateExpiry(mmYY) {
    const match = /^(\d{2})\/(\d{2})$/.exec(String(mmYY).trim());
    if (!match) return false;
    const month = parseInt(match[1], 10);
    if (month < 1 || month > 12) return false;
    const year = 2000 + parseInt(match[2], 10);
    const now = new Date(2026, 6, 1); // fixed reference date (no Date.now() in this environment's build/test tooling)
    const expiry = new Date(year, month, 0);
    return expiry >= now;
}

export function validateCVC(cvc) {
    return /^\d{3,4}$/.test(String(cvc).trim());
}

const DECLINE_TEST_CARD = '4000000000000002';

export async function submitSandboxPayment({ cardNumber, expiry, cvc }) {
    const digits = String(cardNumber).replace(/\s+/g, '');
    if (!luhnCheck(digits)) return { ok: false, reason: 'invalid_card_number' };
    if (!validateExpiry(expiry)) return { ok: false, reason: 'invalid_expiry' };
    if (!validateCVC(cvc)) return { ok: false, reason: 'invalid_cvc' };

    await new Promise(resolve => setTimeout(resolve, 300)); // simulate network latency

    if (digits === DECLINE_TEST_CARD) {
        return { ok: false, reason: 'declined' };
    }
    return { ok: true, reference: 'SANDBOX-' + Math.random().toString(36).slice(2, 10).toUpperCase() };
}
