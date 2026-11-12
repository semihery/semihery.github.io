document.addEventListener('DOMContentLoaded', function () {
    const logic = window.PortfolioLogic;

    const TRANSLATIONS = {
        en: {
            pageTitle: 'Semih Eryücel | Electrical & Electronics Engineering',
            skip: 'Skip to main content',
            'lang.label': 'Language',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.education': 'Education',
            'nav.contact': 'Contact',
            'cta.about': 'About Me',
            'cta.contact': 'Contact Me',
            'hero.rolePrefix': 'Electrical & Electronics Engineering Student at ',
            'hero.school': 'Ege University',
            'hero.roleSuffix': '',
            'about.heading': 'About Me',
            'about.lead': 'I am Semih Eryücel, an Electrical & Electronics Engineering student at Ege University. My academic journey at Ege University began in 2024.',
            'about.body1': 'I have a strong passion for technology and innovation, and I am constantly seeking to expand my knowledge and skills in the fields of electrical and electronics engineering as well as ',
            'about.em1': 'software development',
            'about.body2': '. I am particularly interested in ',
            'about.em2': 'embedded systems and robotics',
            'about.body3': '. In my free time, I enjoy working on personal projects that challenge my problem-solving abilities. I am excited about the future and the opportunities that lie ahead in my career as an engineer.',
            'fact.universityLabel': 'University',
            'fact.universityValue': 'Ege University',
            'fact.departmentLabel': 'Department',
            'fact.departmentValue': 'Electrical & Electronics Engineering',
            'fact.interestsLabel': 'Interests',
            'fact.interestsValue': 'Embedded Systems, Robotics, Software Development',
            'edu.heading': 'Education',
            'edu.ege.years': '2024 - Present',
            'edu.ege.school': 'Ege University',
            'edu.ege.degree': 'Electrical & Electronics Engineering',
            'edu.ege.location': 'Bornova, İzmir',
            'edu.hs.school': 'Bilal Güngör Science High School',
            'edu.hs.location': 'Nallıhan, Ankara',
            'contact.heading': 'Contact Me',
            'contact.note': 'Feel free to send a message regarding engineering projects, embedded systems, robotics, or collaboration.',
            'contact.nameLabel': 'Name',
            'contact.namePlaceholder': 'Your name',
            'contact.emailLabel': 'Email',
            'contact.emailPlaceholder': 'you@example.com',
            'contact.messageLabel': 'Message',
            'contact.messagePlaceholder': 'Write your message...',
            'contact.submit': 'Send Message',
            'contact.sending': 'Sending...',
            'contact.success': 'Thank you—your message has been sent.',
            'contact.fail': 'Unable to deliver message right now. Please try again shortly.',
            'contact.networkError': 'Network error while sending your message. Please try again.'
        },
        tr: {
            pageTitle: 'Semih Eryücel | Elektrik-Elektronik Mühendisliği',
            skip: 'Ana içeriğe geç',
            'lang.label': 'Dil',
            'nav.home': 'Ana Sayfa',
            'nav.about': 'Hakkımda',
            'nav.education': 'Eğitim',
            'nav.contact': 'İletişim',
            'cta.about': 'Hakkımda',
            'cta.contact': 'İletişime Geç',
            'hero.rolePrefix': '',
            'hero.school': 'Ege Üniversitesi',
            'hero.roleSuffix': ' Elektrik-Elektronik Mühendisliği Öğrencisi',
            'about.heading': 'Hakkımda',
            'about.lead': 'Ben Semih Eryücel, Ege Üniversitesi Elektrik-Elektronik Mühendisliği öğrencisiyim. Ege Üniversitesi’ndeki akademik yolculuğum 2024 yılında başladı.',
            'about.body1': 'Teknoloji ve yeniliğe karşı güçlü bir tutkum var; elektrik ve elektronik mühendisliğinin yanı sıra ',
            'about.em1': 'yazılım geliştirme',
            'about.body2': ' alanındaki bilgi ve becerilerimi sürekli geliştirmeye çalışıyorum. Özellikle ',
            'about.em2': 'gömülü sistemler ve robotik',
            'about.body3': ' konularına ilgi duyuyorum. Boş zamanlarımda problem çözme becerilerimi sınayan kişisel projeler üzerinde çalışmaktan keyif alıyorum. Bir mühendis olarak beni bekleyen fırsatlar ve gelecek için heyecanlıyım.',
            'fact.universityLabel': 'Üniversite',
            'fact.universityValue': 'Ege Üniversitesi',
            'fact.departmentLabel': 'Bölüm',
            'fact.departmentValue': 'Elektrik-Elektronik Mühendisliği',
            'fact.interestsLabel': 'İlgi Alanları',
            'fact.interestsValue': 'Gömülü Sistemler, Robotik, Yazılım Geliştirme',
            'edu.heading': 'Eğitim',
            'edu.ege.years': '2024 - Devam Ediyor',
            'edu.ege.school': 'Ege Üniversitesi',
            'edu.ege.degree': 'Elektrik-Elektronik Mühendisliği',
            'edu.ege.location': 'Bornova, İzmir',
            'edu.hs.school': 'Bilal Güngör Fen Lisesi',
            'edu.hs.location': 'Nallıhan, Ankara',
            'contact.heading': 'İletişim',
            'contact.note': 'Mühendislik projeleri, gömülü sistemler, robotik veya iş birliği konularında mesaj gönderebilirsiniz.',
            'contact.nameLabel': 'Ad Soyad',
            'contact.namePlaceholder': 'Adınız',
            'contact.emailLabel': 'E-posta',
            'contact.emailPlaceholder': 'ornek@eposta.com',
            'contact.messageLabel': 'Mesaj',
            'contact.messagePlaceholder': 'Mesajınızı yazın...',
            'contact.submit': 'Mesaj Gönder',
            'contact.sending': 'Gönderiliyor...',
            'contact.success': 'Teşekkürler, mesajınız gönderildi.',
            'contact.fail': 'Mesaj şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin.',
            'contact.networkError': 'Mesaj gönderilirken ağ hatası oluştu. Lütfen tekrar deneyin.'
        }
    };

    function getInitialLanguage() {
        try {
            const saved = localStorage.getItem('site-lang');
            if (saved === 'en' || saved === 'tr') return saved;
        } catch (err) {
            // Ignore storage restrictions
        }
        return 'en';
    }

    let currentLang = getInitialLanguage();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const gradeLabelEl = document.getElementById('ege-grade-label');
    const langButtons = Array.from(document.querySelectorAll('.lang-btn'));

    function updateDynamicUniversityGrade() {
        if (!gradeLabelEl || !logic) return;
        gradeLabelEl.textContent = logic.formatUniversityYearLabel(new Date(), currentLang);
    }

    function applyLanguage(lang) {
        currentLang = lang === 'tr' ? 'tr' : 'en';
        const dict = TRANSLATIONS[currentLang];

        document.documentElement.lang = currentLang;
        document.title = dict.pageTitle;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
                el.textContent = dict[key];
            }
        });

        if (nameInput) nameInput.placeholder = dict['contact.namePlaceholder'];
        if (emailInput) emailInput.placeholder = dict['contact.emailPlaceholder'];
        if (messageInput) messageInput.placeholder = dict['contact.messagePlaceholder'];

        langButtons.forEach(function (btn) {
            const active = btn.getAttribute('data-lang') === currentLang;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', String(active));
        });

        updateDynamicUniversityGrade();

        // Clear transient validation/status messages when switching language
        [
            [nameInput, 'error-name'],
            [emailInput, 'error-email'],
            [messageInput, 'error-message']
        ].forEach(function (pair) {
            const errorEl = document.getElementById(pair[1]);
            if (pair[0]) pair[0].removeAttribute('aria-invalid');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.hidden = true;
            }
        });
        if (formStatus) formStatus.hidden = true;

        try {
            localStorage.setItem('site-lang', currentLang);
        } catch (err) {
            // Ignore storage restrictions
        }
    }

    langButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && targetLang !== currentLang) {
                applyLanguage(targetLang);
            }
        });
    });

    applyLanguage(currentLang);

    // 1. Header Scroll Shadow & Active Section Tracking
    const siteHeader = document.getElementById('site-header');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const trackedSections = Array.from(document.querySelectorAll('main section[id]'));

    function updateScrollState() {
        if (siteHeader) {
            siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
        }

        if (logic && trackedSections.length > 0) {
            const offsets = trackedSections.map(function (section) {
                return { id: section.id, offsetTop: section.offsetTop };
            });
            const activeId = logic.resolveActiveSection(
                offsets,
                window.scrollY,
                window.innerHeight,
                document.documentElement.scrollHeight
            );

            navLinks.forEach(function (link) {
                const target = link.getAttribute('data-section');
                link.classList.toggle('active', target === activeId);
            });
        }
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    // 2. Accessible Mobile Drawer
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

    function setDrawerOpen(open) {
        if (!menuToggle || !mobileDrawer) return;
        menuToggle.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        mobileDrawer.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', function () {
            const isCurrentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            setDrawerOpen(!isCurrentlyOpen);
        });

        mobileDrawerLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setDrawerOpen(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
                setDrawerOpen(false);
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                setDrawerOpen(false);
            }
        });
    }

    // 3. Contact Form Validation & Submission
    const contactForm = document.getElementById('contact-form');

    function setFieldError(inputEl, errorId, message) {
        const errorEl = document.getElementById(errorId);
        if (!inputEl || !errorEl) return;
        if (message) {
            inputEl.setAttribute('aria-invalid', 'true');
            errorEl.textContent = message;
            errorEl.hidden = false;
        } else {
            inputEl.removeAttribute('aria-invalid');
            errorEl.textContent = '';
            errorEl.hidden = true;
        }
    }

    function showFormStatus(type, text) {
        if (!formStatus) return;
        formStatus.className = `form-status ${type === 'success' ? 'is-success' : 'is-error'}`;
        formStatus.textContent = text;
        formStatus.hidden = false;
    }

    if (contactForm && nameInput && emailInput && messageInput) {
        [
            [nameInput, 'error-name'],
            [emailInput, 'error-email'],
            [messageInput, 'error-message']
        ].forEach(function (pair) {
            pair[0].addEventListener('input', function () {
                setFieldError(pair[0], pair[1], '');
            });
        });

        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            if (formStatus) formStatus.hidden = true;

            const dict = TRANSLATIONS[currentLang];
            const result = logic
                ? logic.validateContactInput({
                      name: nameInput.value,
                      email: emailInput.value,
                      message: messageInput.value
                  }, currentLang)
                : { valid: true, errors: {}, cleaned: {} };

            setFieldError(nameInput, 'error-name', result.errors.name || '');
            setFieldError(emailInput, 'error-email', result.errors.email || '');
            setFieldError(messageInput, 'error-message', result.errors.message || '');

            if (!result.valid) {
                const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = dict['contact.sending'];
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result.cleaned)
                });

                if (response.ok) {
                    contactForm.reset();
                    showFormStatus('success', dict['contact.success']);
                } else {
                    showFormStatus('error', dict['contact.fail']);
                }
            } catch (err) {
                showFormStatus('error', dict['contact.networkError']);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = dict['contact.submit'];
                }
            }
        });
    }
});