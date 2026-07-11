// Custom Cursor & Follower
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';

    // Smooth delay for outer cursor
    setTimeout(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    cursor.style.backgroundColor = 'rgba(0, 255, 204, 0.2)';
});
document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'transparent';
});

// Interactive Elements Hover
const interactables = document.querySelectorAll('a, button, .card, input, textarea');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = 'var(--accent-secondary)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderColor = 'var(--accent)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Animated Typewriter
const typeTarget = document.querySelector('.typewriter');
if (typeTarget) {
    const roles = ["Security Automation Expert", "Penetration Tester", "QA Innovator", "Founder"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);
}

// 3D Tilt Effect on Cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';

        // Add metallic glare effect dynamically
        let glare = card.querySelector('.glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.classList.add('glare');
            glare.style.cssText = `
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; opacity: 0; transition: opacity 0.3s;
                background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%);
                z-index: 10;
            `;
            card.appendChild(glare);
        }
        glare.style.opacity = '1';
        glare.style.transform = `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-out';
        const glare = card.querySelector('.glare');
        if (glare) glare.style.opacity = '0';
    });
});

// Interactive Network Canvas Particles
const canvas = document.getElementById('glcanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numParticles = Math.min((canvas.width * canvas.height) / 12000, 100);
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 204, ${0.15 - distance / 1000})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        // Mouse interaction with particles
        const dxMouse = cursorDot.getBoundingClientRect().left - particlesArray[i].x;
        const dyMouse = cursorDot.getBoundingClientRect().top - particlesArray[i].y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 85, ${0.3 - distMouse / 500})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            // using current mouse position
            ctx.lineTo(cursorDot.getBoundingClientRect().left, cursorDot.getBoundingClientRect().top);
            ctx.stroke();

            // Push particles away subtly
            particlesArray[i].x -= dxMouse * 0.02;
            particlesArray[i].y -= dyMouse * 0.02;
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Scroll & Reveal
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate progress bars if they exist
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const perc = bar.getAttribute('data-perc');
                bar.style.width = perc;
            });

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => revealObserver.observe(el));
