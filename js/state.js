// Wizard state: product info + per-criterion conformance/remarks.
// Persisted to localStorage so a user doesn't lose their work.

import { CRITERIA } from './criteria.js';

const STORAGE_KEY = 'vpatdraft.state.v1';

export function createInitialState() {
    const entries = {};
    for (const c of CRITERIA) {
        entries[c.id] = { level: 'not-evaluated', remarks: '' };
    }
    return {
        productInfo: {
            productName: '',
            productVersion: '',
            vendorName: '',
            vendorContact: '',
            evaluationDate: '',
            evaluationMethods: ''
        },
        entries,
        purchased: false
    };
}

export function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createInitialState();
        const parsed = JSON.parse(raw);
        // Merge against a fresh initial state so new criteria added in a
        // future version don't break an old saved draft.
        const fresh = createInitialState();
        return {
            productInfo: { ...fresh.productInfo, ...(parsed.productInfo || {}) },
            entries: { ...fresh.entries, ...(parsed.entries || {}) },
            purchased: !!parsed.purchased
        };
    } catch {
        return createInitialState();
    }
}

export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // localStorage unavailable (private browsing, quota) — fail silently,
        // the wizard still works for the current session.
    }
}

export function clearState() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}

// Progress = how many criteria have moved past the default "not-evaluated".
export function computeProgress(state) {
    const total = CRITERIA.length;
    const evaluated = CRITERIA.filter(c => state.entries[c.id]?.level !== 'not-evaluated').length;
    return { total, evaluated, percent: total === 0 ? 0 : Math.round((evaluated / total) * 100) };
}
