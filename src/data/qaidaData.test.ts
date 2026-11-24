import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ARABIC_LETTERS,
  CORE_FEATURES,
  PRICING_PLANS,
  dwellEase,
  cueOpacity,
  calculateCouponPreview,
  validateComplaintForm,
  filterLettersByRegion
} from './qaidaData';

test('contains all 29 Noorani Qaida Arabic letters with Makhraj and steps', () => {
  assert.equal(ARABIC_LETTERS.length, 29);
  assert.equal(ARABIC_LETTERS[0].arabic, 'ا');
  assert.equal(ARABIC_LETTERS[20].arabic, 'ق');
  assert.equal(ARABIC_LETTERS[28].arabic, 'ي');
  for (const letter of ARABIC_LETTERS) {
    assert.ok(letter.makhrajBn.length > 5);
    assert.ok(letter.makhrajEn.length > 5);
    assert.equal(letter.stepsBn.length, 3);
    assert.equal(letter.stepsEn.length, 3);
  }
});

test('contains all 6 core features and 3 pricing plans from Digital Qaida', () => {
  assert.equal(CORE_FEATURES.length, 6);
  assert.equal(PRICING_PLANS.length, 3);
  assert.equal(PRICING_PLANS[0].rawPriceBdt, 0);
  assert.equal(PRICING_PLANS[1].rawPriceBdt, 500);
  assert.equal(PRICING_PLANS[2].rawPriceBdt, 1000);
});

test('scroll-craft dwellEase preserves endpoints 0 and 1 and settles at 0.5', () => {
  assert.equal(dwellEase(0, 0.4), 0);
  assert.equal(dwellEase(1, 0.4), 1);
  assert.equal(dwellEase(0.5, 0.4), 0.5);
});

test('scroll-craft cueOpacity computes greet, plateau, and hold states accurately', () => {
  // Greet cue: from=0, to=0.7, rampIn=0 -> full opacity at p=0
  assert.equal(cueOpacity(0, 0, 0.7, 0, 0.3), 1);
  // Plateau middle
  assert.equal(cueOpacity(0.35, 0.1, 0.7, 0.2, 0.2), 1);
  // Hold cue: to=null holds at 1 after ramp
  assert.equal(cueOpacity(0.95, 0.4, null), 1);
});

test('calculateCouponPreview applies valid discount codes and rejects invalid ones', () => {
  const valid = calculateCouponPreview('student_pro', 'UMMAH20');
  assert.equal(valid.valid, true);
  assert.equal(valid.finalBdt, 400);

  const invalid = calculateCouponPreview('teacher_pro', 'FAKECODE');
  assert.equal(invalid.valid, false);
  assert.equal(invalid.finalBdt, 1000);
});

test('validateComplaintForm enforces required issue type, minimum 12 chars details, and email format', () => {
  assert.equal(
    validateComplaintForm({ issueType: '', location: 'home', details: 'Valid details text here', contactEmail: '' }, 'en').valid,
    false
  );
  assert.equal(
    validateComplaintForm({ issueType: 'writing', location: 'writing', details: 'Too short', contactEmail: '' }, 'en').valid,
    false
  );
  assert.equal(
    validateComplaintForm({ issueType: 'writing', location: 'writing', details: 'The calligraphy pen stroke lags on mobile.', contactEmail: 'bad-email' }, 'en').valid,
    false
  );
  assert.equal(
    validateComplaintForm({ issueType: 'writing', location: 'writing', details: 'The calligraphy pen stroke works great now!', contactEmail: 'user@example.com' }, 'en').valid,
    true
  );
});

test('filterLettersByRegion filters the 29 letters by anatomical articulation zone', () => {
  const throatLetters = filterLettersByRegion('throat');
  assert.equal(throatLetters.length, 6); // ء ه ع ح غ خ
  const allLetters = filterLettersByRegion('all');
  assert.equal(allLetters.length, 29);
});
