// Animaciones y efectos para la página de rap
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animar las barras del menú
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Animación de scroll reveal para elementos
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de tracks
    document.querySelectorAll('.track-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observar eventos
    document.querySelectorAll('.event-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Play track al hacer click
    document.querySelectorAll('.track-card').forEach(card => {
        card.addEventListener('click', () => {
            const trackName = card.querySelector('.track-name').textContent;
            playTrack(trackName);
        });
    });
    
    // Newsletter form
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                // Animación de éxito
                newsletterBtn.textContent = '¡SUSCRITO!';
                newsletterBtn.style.background = 'var(--accent-secondary)';
                newsletterBtn.style.color = 'var(--bg-dark)';
                
                // Confetti effect
                createConfetti();
                
                setTimeout(() => {
                    newsletterBtn.textContent = 'SUSCRÍBETE';
                    newsletterBtn.style.background = 'var(--bg-dark)';
                    newsletterBtn.style.color = 'var(--text-primary)';
                    newsletterInput.value = '';
                }, 3000);
            } else {
                // Shake animation
                newsletterInput.style.animation = 'shake 0.5s';
                newsletterInput.style.borderColor = 'var(--accent-primary)';
                
                setTimeout(() => {
                    newsletterInput.style.animation = '';
                    newsletterInput.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }, 500);
            }
        });
        
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Scroll a la sección de tracks
            document.querySelector('#beats').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Event tickets
    document.querySelectorAll('.event-ticket').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventName = e.target.closest('.event-item').querySelector('.event-name').textContent;
            buyTicket(eventName);
        });
    });
    
    // Parallax effect en scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const vinyl = document.querySelector('.vinyl-spinner');
        const boombox = document.querySelector('.boombox-bg');
        
        if (vinyl) {
            vinyl.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
        }
        
        if (boombox) {
            boombox.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
    
    // Cursor personalizado para modo desktop
    if (window.innerWidth > 768) {
        createCustomCursor();
    }
});

// Funciones auxiliares

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function playTrack(trackName) {
    console.log(`Reproduciendo: ${trackName}`);
    // Aquí iría la lógica para reproducir el track
    // Por ahora solo mostramos un mensaje
    showNotification(`▶ Reproduciendo: ${trackName}`);
}

function buyTicket(eventName) {
    console.log(`Comprando entrada para: ${eventName}`);
    showNotification(`🎫 Redirigiendo a tickets para: ${eventName}`);
}

function showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.2rem;
        letter-spacing: 0.1em;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(255, 8, 68, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function createConfetti() {
    const colors = ['#ff0844', '#00ff88', '#ffd700'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            opacity: 1;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    function animateGlow() {
        const diffX = mouseX - glowX;
        const diffY = mouseY - glowY;
        
        glowX += diffX * 0.15;
        glowY += diffY * 0.15;
        
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
    
    // Efectos hover
    const interactiveElements = document.querySelectorAll('a, button, .track-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.background = 'var(--gradient-fire)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'var(--accent-primary)';
        });
    });
}

// Añadir estilos adicionales para animaciones
const additionalStyles = `
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(13, 13, 13, 0.98);
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 2px solid var(--accent-primary);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                ${Math.random() * 400 - 200}px,
                ${Math.random() * 800 + 400}px
            ) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .custom-cursor {
        width: 20px;
        height: 20px;
        background: var(--accent-primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        top: -10px;
        left: -10px;
        transition: width 0.3s, height 0.3s, background 0.3s;
        mix-blend-mode: difference;
    }
    
    .cursor-glow {
        width: 60px;
        height: 60px;
        border: 2px solid var(--accent-secondary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        top: -30px;
        left: -30px;
        opacity: 0.5;
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-glow {
            display: none;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);