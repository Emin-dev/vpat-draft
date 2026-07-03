import assert from 'node:assert/strict';
import { createInitialState, computeProgress } from '../js/state.js';
import { CRITERIA } from '../js/criteria.js';

// Initial state has every criterion defaulted to not-evaluated
const state = createInitialState();
assert.equal(Object.keys(state.entries).length, CRITERIA.length, 'every criterion must have an entry');
for (const c of CRITERIA) {
    assert.equal(state.entries[c.id].level, 'not-evaluated');
    assert.equal(state.entries[c.id].remarks, '');
}
console.log(`✓ initial state covers all ${CRITERIA.length} criteria, defaulted to not-evaluated`);

// Progress computation
const p0 = computeProgress(state);
assert.equal(p0.evaluated, 0);
assert.equal(p0.percent, 0);

state.entries[CRITERIA[0].id].level = 'supports';
state.entries[CRITERIA[1].id].level = 'not-applicable';
const p2 = computeProgress(state);
assert.equal(p2.evaluated, 2);
assert.equal(p2.total, CRITERIA.length);
assert.equal(p2.percent, Math.round((2 / CRITERIA.length) * 100));
console.log('✓ progress tracking counts evaluated criteria correctly');

// No duplicate criterion IDs (a real content-integrity check on the WCAG data)
const ids = CRITERIA.map(c => c.id);
assert.equal(new Set(ids).size, ids.length, 'no duplicate criterion IDs allowed');
console.log('✓ no duplicate WCAG criterion IDs in the dataset');

// Every criterion has a non-empty plain-English explanation (the actual
// value proposition of a "guided" tool vs. a bare official-title list)
for (const c of CRITERIA) {
    assert.ok(c.plain && c.plain.length > 15, `criterion ${c.id} must have a real plain-English explanation`);
    assert.ok(['A', 'AA'].includes(c.level), `criterion ${c.id} must be Level A or AA`);
}
console.log('✓ every criterion has a real plain-English explanation and a valid level');

console.log('\nAll state.js tests passed.');
