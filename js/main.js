import { CRITERIA, PRINCIPLES, CONFORMANCE_LEVELS } from './criteria.js';
import { loadState, saveState, computeProgress } from './state.js';
import { generateReportHTML } from './report.js';
import { luhnCheck, validateExpiry, validateCVC, submitSandboxPayment } from './checkout.js';

const state = loadState();

// Wizard step order: product info, one step per WCAG principle, then preview.
const STEP_IDS = ['product-info', ...PRINCIPLES.map(p => p.id), 'preview'];
let currentStepIndex = 0;

const el = {
    introView: document.getElementById('intro-view'),
    wizardView: document.getElementById('wizard-view'),
    btnStart: document.getElementById('btn-start'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    productInfoStep: document.getElementById('step-product-info'),
    criteriaSteps: document.getElementById('criteria-steps'),
    previewStep: document.getElementById('step-preview'),
    reportFrame: document.getElementById('report-preview'),
    btnBack: document.getElementById('btn-back'),
    btnNext: document.getElementById('btn-next'),
    btnExport: document.getElementById('btn-export'),
    checkoutModal: document.getElementById('checkout-modal'),
    btnCloseCheckout: document.getElementById('btn-close-checkout'),
    btnPay: document.getElementById('btn-pay'),
    checkoutResult: document.getElementById('checkout-result')
};

function buildCriteriaSteps() {
    for (const principle of PRINCIPLES) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.id = `step-${principle.id}`;
        stepDiv.hidden = true;

        const criteriaForPrinciple = CRITERIA.filter(c => c.principle === principle.id);
        stepDiv.innerHTML = `
            <h2>${principle.label}</h2>
            <p class="step-hint">${criteriaForPrinciple.length} criteria in this section.</p>
            <div class="criteria-list">
                ${criteriaForPrinciple.map(c => `
                    <div class="criterion-card">
                        <div class="criterion-head">
                            <span class="criterion-id">${c.id}</span>
                            <span class="criterion-title">${c.title}</span>
                            <span class="criterion-level-badge">Level ${c.level}</span>
                        </div>
                        <p class="criterion-plain">${c.plain}</p>
                        <label class="conformance-label">Conformance level
                            <select data-crit="${c.id}" class="conformance-select">
                                ${CONFORMANCE_LEVELS.map(l => `<option value="${l.id}">${l.label}</option>`).join('')}
                            </select>
                        </label>
                        <label class="remarks-label">Remarks and explanations (optional)
                            <textarea data-crit-remarks="${c.id}" rows="2" placeholder="Any details worth noting..."></textarea>
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
        el.criteriaSteps.appendChild(stepDiv);
    }
}

function getStepElement(stepId) {
    if (stepId === 'product-info') return el.productInfoStep;
    if (stepId === 'preview') return el.previewStep;
    return document.getElementById(`step-${stepId}`);
}

function showStep(index) {
    STEP_IDS.forEach((id, i) => {
        const stepEl = getStepElement(id);
        if (stepEl) stepEl.hidden = i !== index;
    });
    currentStepIndex = index;

    el.btnBack.hidden = index === 0;
    el.btnNext.hidden = index === STEP_IDS.length - 1;

    const progress = computeProgress(state);
    const stepProgress = Math.round(((index + 1) / STEP_IDS.length) * 100);
    el.progressFill.style.width = `${stepProgress}%`;
    el.progressText.textContent = `Step ${index + 1} of ${STEP_IDS.length} — ${progress.evaluated}/${progress.total} criteria evaluated`;

    if (STEP_IDS[index] === 'preview') renderPreview();
    window.scrollTo(0, 0);
}

function bindProductInfoFields() {
    const fields = ['productName', 'productVersion', 'vendorName', 'vendorContact', 'evaluationDate', 'evaluationMethods'];
    for (const field of fields) {
        const input = document.getElementById(`f-${field}`);
        input.value = state.productInfo[field] || '';
        input.addEventListener('input', () => {
            state.productInfo[field] = input.value;
            saveState(state);
        });
    }
}

function bindCriteriaFields() {
    document.querySelectorAll('.conformance-select').forEach(select => {
        const critId = select.dataset.crit;
        select.value = state.entries[critId]?.level || 'not-evaluated';
        select.addEventListener('change', () => {
            state.entries[critId].level = select.value;
            saveState(state);
        });
    });
    document.querySelectorAll('[data-crit-remarks]').forEach(textarea => {
        const critId = textarea.dataset.critRemarks;
        textarea.value = state.entries[critId]?.remarks || '';
        textarea.addEventListener('input', () => {
            state.entries[critId].remarks = textarea.value;
            saveState(state);
        });
    });
}

function renderPreview() {
    state._generatedAt = Date.now();
    const html = generateReportHTML(state, { watermark: !state.purchased });
    el.reportFrame.srcdoc = html;
    el.btnExport.textContent = state.purchased ? 'Download clean report' : 'Export clean report — $49';
}

el.btnStart.addEventListener('click', () => {
    el.introView.hidden = true;
    el.wizardView.hidden = false;
    showStep(0);
});

el.btnNext.addEventListener('click', () => {
    if (currentStepIndex < STEP_IDS.length - 1) showStep(currentStepIndex + 1);
});
el.btnBack.addEventListener('click', () => {
    if (currentStepIndex > 0) showStep(currentStepIndex - 1);
});

el.btnExport.addEventListener('click', () => {
    if (state.purchased) {
        downloadReport();
    } else {
        el.checkoutModal.hidden = false;
    }
});

el.btnCloseCheckout.addEventListener('click', () => {
    el.checkoutModal.hidden = true;
    el.checkoutResult.hidden = true;
});

el.btnPay.addEventListener('click', async () => {
    const cardNumber = document.getElementById('pay-card').value;
    const expiry = document.getElementById('pay-expiry').value;
    const cvc = document.getElementById('pay-cvc').value;

    el.checkoutResult.hidden = false;
    el.checkoutResult.textContent = 'Processing (sandbox)...';
    el.btnPay.disabled = true;

    const result = await submitSandboxPayment({ cardNumber, expiry, cvc });
    el.btnPay.disabled = false;
    if (result.ok) {
        state.purchased = true;
        saveState(state);
        el.checkoutResult.textContent = `✓ Payment successful (sandbox). Reference: ${result.reference}`;
        renderPreview();
        setTimeout(() => {
            el.checkoutModal.hidden = true;
            el.checkoutResult.hidden = true;
            downloadReport();
        }, 1200);
    } else {
        const messages = {
            invalid_card_number: 'Card number failed validation (not a real Luhn-valid number).',
            invalid_expiry: 'Expiry date is invalid or in the past.',
            invalid_cvc: 'CVC must be 3-4 digits.',
            declined: 'Card declined (sandbox test card).'
        };
        el.checkoutResult.textContent = `✕ ${messages[result.reason] || 'Payment failed.'}`;
    }
});

function downloadReport() {
    const html = generateReportHTML(state, { watermark: false });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vpat-report.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

buildCriteriaSteps();
bindProductInfoFields();
bindCriteriaFields();
