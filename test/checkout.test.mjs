import assert from 'node:assert/strict';
import { luhnCheck, validateExpiry, validateCVC, submitSandboxPayment } from '../js/checkout.js';

// Luhn validation
assert.equal(luhnCheck('4242424242424242'), true, 'known Luhn-valid test card must pass');
assert.equal(luhnCheck('4242424242424241'), false, 'off-by-one digit must fail Luhn check');
assert.equal(luhnCheck('not-a-card'), false, 'non-numeric input must fail');
assert.equal(luhnCheck('123'), false, 'too-short input must fail');
console.log('✓ Luhn algorithm correctly validates and rejects card numbers');

// Expiry validation (fixed reference date: July 2026)
assert.equal(validateExpiry('12/28'), true, 'future expiry must be valid');
assert.equal(validateExpiry('01/20'), false, 'past expiry must be invalid');
assert.equal(validateExpiry('13/28'), false, 'invalid month must be rejected');
assert.equal(validateExpiry('garbage'), false, 'malformed input must be rejected');
console.log('✓ expiry validation correctly checks format and date');

// CVC validation
assert.equal(validateCVC('123'), true);
assert.equal(validateCVC('1234'), true);
assert.equal(validateCVC('12'), false);
assert.equal(validateCVC('abcd'), false);
console.log('✓ CVC validation accepts 3-4 digits only');

// Full sandbox payment flow
const success = await submitSandboxPayment({ cardNumber: '4242424242424242', expiry: '12/28', cvc: '123' });
assert.equal(success.ok, true);
assert.ok(success.reference.startsWith('SANDBOX-'), 'reference must be clearly marked as sandbox, never look like a real transaction id');
console.log('✓ valid test card completes the sandbox flow with a clearly-labeled reference');

const declined = await submitSandboxPayment({ cardNumber: '4000000000000002', expiry: '12/28', cvc: '123' });
assert.equal(declined.ok, false);
assert.equal(declined.reason, 'declined');
console.log('✓ documented decline test card correctly returns declined');

const badCard = await submitSandboxPayment({ cardNumber: '1234', expiry: '12/28', cvc: '123' });
assert.equal(badCard.ok, false);
assert.equal(badCard.reason, 'invalid_card_number');
console.log('✓ invalid card number is rejected before any "processing" occurs');

console.log('\nAll checkout.js tests passed.');
