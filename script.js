initThemeToggle();
initContactForm();
initScrollStrips();

function initThemeToggle() {
    const toggles = document.querySelectorAll('.theme-toggle');
    if (!toggles.length) {
        return;
    }

    const root = document.documentElement;
    const storageKey = 'bk-theme-preference';
    const storedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    toggles.forEach((button) => {
        button.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem(storageKey, nextTheme);
        });
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.dataset.theme = 'dark';
        } else {
            delete root.dataset.theme;
            theme = 'light';
        }

        toggles.forEach((button) => {
            button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusBox = document.getElementById('form-status');

    if (!form || !statusBox) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameValue = form.name.value.trim();
        const emailValue = form.email.value.trim();
        const messageValue = form.message.value.trim();

        if (!nameValue || !emailValue || !messageValue) {
            statusBox.textContent = 'Please fill in all fields before sending.';
            statusBox.className = 'error';
            return;
        }

        if (!emailValue.includes('@')) {
            statusBox.textContent = 'Email must include the @ symbol.';
            statusBox.className = 'error';
            return;
        }

        statusBox.textContent = 'Thanks! I will reply soon.';
        statusBox.className = 'success';
        form.reset();
    });
}

function initScrollStrips() {
    const shells = document.querySelectorAll('.scroll-shell');

    if (!shells.length) {
        return;
    }

    shells.forEach((shell) => {
        const strip = shell.querySelector('[data-scroll-strip]');
        const prevBtn = shell.querySelector('.scroll-btn.prev');
        const nextBtn = shell.querySelector('.scroll-btn.next');

        if (!strip || !prevBtn || !nextBtn) {
            return;
        }

        const getStepAmount = () => {
            const cardWidth = strip.querySelector('.project-card')?.offsetWidth || strip.clientWidth;
            const styles = window.getComputedStyle(strip);
            const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
            const gap = Number.isNaN(gapValue) ? 0 : gapValue;
            return cardWidth + gap;
        };

        const updateButtons = () => {
            const maxScroll = strip.scrollWidth - strip.clientWidth;
            const left = strip.scrollLeft;
            const threshold = 4;
            prevBtn.disabled = left <= threshold;
            nextBtn.disabled = left >= maxScroll - threshold;
        };

        const scrollByStep = (direction) => {
            const amount = getStepAmount() * direction;
            strip.scrollBy({ left: amount, behavior: 'smooth' });
        };

        prevBtn.addEventListener('click', () => scrollByStep(-1));
        nextBtn.addEventListener('click', () => scrollByStep(1));
        strip.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);

        updateButtons();
    });
}
