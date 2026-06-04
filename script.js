// ========== 3D CANVAS ФОН С ЧАСТИЦАМИ ==========
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Анимированные частицы (золотисто-зелёные, как стройка)
let particles = [];
const PARTICLE_COUNT = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
        // разные цвета частиц: золотой, зелёный, белый
        const colorType = Math.random();
        if (colorType < 0.33) {
            this.color = `rgba(0, 230, 153, ${this.opacity})`; // зелёный
        } else if (colorType < 0.66) {
            this.color = `rgba(255, 215, 0, ${this.opacity})`; // золотой
        } else {
            this.color = `rgba(255, 255, 255, ${this.opacity * 0.7})`; // белый
        }
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Пересоздаём частицы при ресайзе (чтобы пропорции не ломались)
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// ========== ПЕЧАТНЫЙ ТЕКСТ (TYPING ANIMATION) ==========
const words = ['реконструкции школ 🏫', 'демонтаже 🔨', 'отделке 🎨', 'стройке века 🏗️'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function typeEffect() {
    if (!typedElement) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const speed = isDeleting ? 60 : 100;
    setTimeout(typeEffect, speed);
}

if (typedElement) {
    setTimeout(typeEffect, 500);
}

// ========== АНИМИРОВАННЫЕ СЧЁТЧИКИ ==========
const counters = document.querySelectorAll('.stat-number');

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60;
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Запускаем счётчики, когда они появляются в зоне видимости
const observerOptions = { threshold: 0.3, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
const exploreBtn = document.getElementById('exploreBtn');
const contactBtnHeader = document.getElementById('contactBtnHeader');

if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        const vacanciesSection = document.getElementById('vacancies');
        if (vacanciesSection) {
            vacanciesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

if (contactBtnHeader) {
    contactBtnHeader.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ========== ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ ЭМОДЗИ ==========
document.addEventListener('mousemove', (e) => {
    const emojis = document.querySelectorAll('.floating-emoji');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    emojis.forEach((emoji, i) => {
        const offsetX = (mouseX - 0.5) * 25;
        const offsetY = (mouseY - 0.5) * 25;
        emoji.style.transform = `translate(${offsetX * (i + 1) * 0.7}px, ${offsetY * (i + 1) * 0.7}px)`;
    });
});

// ========== АНИМАЦИЯ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ (ДОП. ЭФФЕКТ) ==========
const cards = document.querySelectorAll('.job-card, .benefit-card, .stat-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
});

// ========== ДОБАВЛЯЕМ ЦИФРУ 2026 В КОНСОЛЬ И НЕБОЛЬШОЙ ПРИВЕТ ==========
console.log('🏗️🔥 PROFSTROYTEAM 2026 — стройка, которая меняет жизни! Присоединяйся к команде мечты! 🔥🏗️');
console.log('📞 Контакты: WhatsApp +375 29 844 5000 | Telegram +375 33 655 8368 | +375 29 731 0322');

// ========== ЭФФЕКТ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ ==========
const fadeElements = document.querySelectorAll('.job-card, .benefit-card, .stat-card, .salary-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ========== МАГНИТНЫЙ ЭФФЕКТ ДЛЯ КНОПОК (НЕБОЛЬШОЙ ВАЙБ) ==========
const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;
        btn.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});