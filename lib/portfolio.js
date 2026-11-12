(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PortfolioLogic = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const VALIDATION_MESSAGES = {
    en: {
      name: 'Please enter your name (at least 2 characters).',
      email: 'Please enter a valid email address.',
      message: 'Please enter a message of at least 10 characters.'
    },
    tr: {
      name: 'Lütfen adınızı girin (en az 2 karakter).',
      email: 'Lütfen geçerli bir e-posta adresi girin.',
      message: 'Lütfen en az 10 karakterlik bir mesaj yazın.'
    }
  };

  const YEAR_LABELS = {
    en: {
      prep: 'Preparatory Year',
      1: '1st Year',
      2: '2nd Year',
      3: '3rd Year',
      4: '4th Year',
      graduate: 'Graduate'
    },
    tr: {
      prep: 'Hazırlık',
      1: '1. Sınıf',
      2: '2. Sınıf',
      3: '3. Sınıf',
      4: '4. Sınıf',
      graduate: 'Mezun'
    }
  };

  function calculateUniversityYear(dateInput) {
    const date = dateInput instanceof Date && !Number.isNaN(dateInput.getTime())
      ? dateInput
      : new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed: 8 = September
    const academicYear = month >= 8 ? year : year - 1;
    const rawYear = academicYear - 2025 + 1;

    if (rawYear < 1) {
      return { code: 'prep', yearNumber: 0 };
    }
    if (rawYear > 4) {
      return { code: 'graduate', yearNumber: rawYear };
    }
    return { code: `year${rawYear}`, yearNumber: rawYear };
  }

  function formatUniversityYearLabel(dateInput, lang) {
    const locale = lang === 'tr' ? 'tr' : 'en';
    const status = calculateUniversityYear(dateInput);
    if (status.code === 'prep') {
      return YEAR_LABELS[locale].prep;
    }
    if (status.code === 'graduate') {
      return YEAR_LABELS[locale].graduate;
    }
    return YEAR_LABELS[locale][status.yearNumber];
  }

  function validateContactInput(input, lang) {
    const locale = lang === 'tr' ? 'tr' : 'en';
    const messages = VALIDATION_MESSAGES[locale];
    const errors = {};
    const name = typeof input?.name === 'string' ? input.name.trim() : '';
    const email = typeof input?.email === 'string' ? input.email.trim() : '';
    const message = typeof input?.message === 'string' ? input.message.trim() : '';

    if (name.length < 2) {
      errors.name = messages.name;
    }
    if (!EMAIL_REGEX.test(email)) {
      errors.email = messages.email;
    }
    if (message.length < 10) {
      errors.message = messages.message;
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors: errors,
      cleaned: { name: name, email: email, message: message }
    };
  }

  function resolveActiveSection(sections, scrollY, viewportHeight, docHeight) {
    if (!Array.isArray(sections) || sections.length === 0) return 'home';
    if (viewportHeight + scrollY >= docHeight - 24) {
      return sections[sections.length - 1].id;
    }
    const probe = scrollY + 140;
    let activeId = sections[0].id;
    for (let i = 0; i < sections.length; i++) {
      if (probe >= sections[i].offsetTop) {
        activeId = sections[i].id;
      }
    }
    return activeId;
  }

  return {
    calculateUniversityYear: calculateUniversityYear,
    formatUniversityYearLabel: formatUniversityYearLabel,
    validateContactInput: validateContactInput,
    resolveActiveSection: resolveActiveSection
  };
}));
