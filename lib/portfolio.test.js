const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calculateUniversityYear,
  formatUniversityYearLabel,
  validateContactInput,
  resolveActiveSection
} = require('./portfolio');

test('calculateUniversityYear advances every September starting September 2025 as 1st year', () => {
  assert.deepEqual(calculateUniversityYear(new Date(2025, 7, 31)), { code: 'prep', yearNumber: 0 });
  assert.deepEqual(calculateUniversityYear(new Date(2025, 8, 1)), { code: 'year1', yearNumber: 1 });
  assert.deepEqual(calculateUniversityYear(new Date(2026, 7, 31)), { code: 'year1', yearNumber: 1 });
  assert.deepEqual(calculateUniversityYear(new Date(2026, 8, 1)), { code: 'year2', yearNumber: 2 });
  assert.deepEqual(calculateUniversityYear(new Date(2026, 10, 12)), { code: 'year2', yearNumber: 2 });
  assert.deepEqual(calculateUniversityYear(new Date(2027, 8, 15)), { code: 'year3', yearNumber: 3 });
  assert.deepEqual(calculateUniversityYear(new Date(2028, 8, 1)), { code: 'year4', yearNumber: 4 });
  assert.deepEqual(calculateUniversityYear(new Date(2029, 8, 1)), { code: 'graduate', yearNumber: 5 });
});

test('formatUniversityYearLabel formats localized EN and TR grade strings', () => {
  const nov2026 = new Date(2026, 10, 12);
  assert.equal(formatUniversityYearLabel(nov2026, 'en'), '2nd Year');
  assert.equal(formatUniversityYearLabel(nov2026, 'tr'), '2. Sınıf');

  const aug2025 = new Date(2025, 7, 15);
  assert.equal(formatUniversityYearLabel(aug2025, 'en'), 'Preparatory Year');
  assert.equal(formatUniversityYearLabel(aug2025, 'tr'), 'Hazırlık');
});

test('validateContactInput validates and localizes errors for EN and TR', () => {
  const invalidTr = validateContactInput({
    name: 'A',
    email: 'bad',
    message: 'kısa'
  }, 'tr');
  assert.equal(invalidTr.valid, false);
  assert.match(invalidTr.errors.name, /en az 2 karakter/i);
  assert.match(invalidTr.errors.email, /geçerli bir e-posta/i);
  assert.match(invalidTr.errors.message, /en az 10 karakter/i);

  const valid = validateContactInput({
    name: '  Semih Eryücel  ',
    email: 'semih@example.com',
    message: '  Hello, reaching out regarding embedded systems.  '
  }, 'en');
  assert.equal(valid.valid, true);
  assert.equal(valid.cleaned.name, 'Semih Eryücel');
});

test('resolveActiveSection selects section by scroll offset and clamps bottom to last section', () => {
  const sections = [
    { id: 'home', offsetTop: 0 },
    { id: 'about', offsetTop: 620 },
    { id: 'education', offsetTop: 1120 },
    { id: 'contact', offsetTop: 1620 }
  ];

  assert.equal(resolveActiveSection(sections, 0, 900, 2200), 'home');
  assert.equal(resolveActiveSection(sections, 1050, 900, 2200), 'education');
  assert.equal(resolveActiveSection(sections, 1300, 900, 2200), 'contact');
});
