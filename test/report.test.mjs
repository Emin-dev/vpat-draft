import assert from 'node:assert/strict';
import { generateReportHTML, escapeHTML } from '../js/report.js';
import { createInitialState } from '../js/state.js';
import { CRITERIA } from '../js/criteria.js';

// escapeHTML covers all 5 special characters
assert.equal(escapeHTML('<'), '&lt;');
assert.equal(escapeHTML('>'), '&gt;');
assert.equal(escapeHTML('&'), '&amp;');
assert.equal(escapeHTML('"'), '&quot;');
assert.equal(escapeHTML("'"), '&#39;');
assert.equal(escapeHTML(null), '');
assert.equal(escapeHTML(undefined), '');
console.log('✓ escapeHTML handles all special characters and nullish input');

// Malicious payload never appears unescaped in the generated report
const state = createInitialState();
state.productInfo.productName = '<script>alert(1)</script>';
state.productInfo.vendorName = 'Acme & "Co" <b>Ltd</b>';
state.entries['1.1.1'].level = 'supports';
state.entries['1.1.1'].remarks = '<img src=x onerror=alert(2)>';

const html = generateReportHTML(state);
assert.ok(!html.includes('<script>alert(1)</script>'), 'raw script tag must not appear unescaped');
assert.ok(!html.includes('<img src=x onerror=alert(2)>'), 'raw onerror payload must not appear unescaped');
assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'escaped product name must appear');
assert.ok(html.includes('&lt;img src=x onerror=alert(2)&gt;'), 'escaped remarks must appear');
assert.ok(html.includes('Acme &amp; &quot;Co&quot; &lt;b&gt;Ltd&lt;/b&gt;'), 'escaped vendor name must appear');
console.log('✓ XSS payloads in product info and remarks are escaped, never injected raw');

// Every one of the real 55 WCAG criteria appears in the generated report
for (const c of CRITERIA) {
    assert.ok(html.includes(c.id), `criterion ${c.id} must appear in the report`);
    assert.ok(html.includes(escapeHTML(c.title)), `criterion ${c.id} title must appear`);
}
console.log(`✓ all ${CRITERIA.length} WCAG criteria appear in the generated report`);

// Conformance level renders correctly for an evaluated criterion, and
// "Not Evaluated" is the default for everything else. The report also has
// one summary chip literally labeled "Not Evaluated: N" in addition to one
// occurrence per table row, so the raw string count is rows + 1, not rows.
assert.ok(html.includes('Supports'), 'the entered "Supports" level must render');
const notEvaluatedCount = (html.match(/Not Evaluated/g) || []).length;
assert.equal(notEvaluatedCount, (CRITERIA.length - 1) + 1, 'table rows (criteria - 1) plus one summary chip should say Not Evaluated');
assert.ok(html.includes('Not Evaluated: ' + (CRITERIA.length - 1)), 'the summary chip must report the correct not-evaluated count');
console.log('✓ conformance levels render correctly, unset criteria default to Not Evaluated');

// Watermark mode adds the preview banner; normal mode doesn't
const watermarked = generateReportHTML(state, { watermark: true });
assert.ok(watermarked.includes('PREVIEW — NOT FOR DISTRIBUTION'));
assert.ok(!html.includes('PREVIEW — NOT FOR DISTRIBUTION'));
console.log('✓ watermark flag correctly toggles the preview banner');

// Empty remarks render a placeholder, not an empty cell that looks broken
const emptyState = createInitialState();
const emptyHTML = generateReportHTML(emptyState);
assert.ok(emptyHTML.includes('<span class="empty">—</span>'));
console.log('✓ empty remarks render a placeholder dash');

console.log('\nAll report.js tests passed.');
