// Animación de entrada suave
document.addEventListener('DOMContentLoaded', () => {
    // Prevenir el comportamiento por defecto del formulario
    const notifyBtn = document.querySelector('.notify-btn');
    const emailInput = document.querySelector('.email-input');
    
    notifyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // Animación de éxito
            notifyBtn.textContent = '¡Registrado!';
            notifyBtn.style.background = 'var(--accent)';
            notifyBtn.style.color = 'var(--bg-primary)';
            notifyBtn.style.borderColor = 'var(--accent)';
            
            // Resetear después de 3 segundos
            setTimeout(() => {
                notifyBtn.textContent = 'Notificarme';
                notifyBtn.style.background = 'transparent';
                notifyBtn.style.color = 'var(--accent)';
                notifyBtn.style.borderColor = 'var(--accent)';
                emailInput.value = '';
            }, 3000);
        } else {
            // Animación de error
            emailInput.style.borderColor = '#ff6b6b';
            emailInput.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                emailInput.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                emailInput.style.animation = '';
            }, 500);
        }
    });
    
    // Validar email al presionar Enter
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            notifyBtn.click();
        }
    });
    
    // Efecto parallax sutil en elementos decorativos
    document.addEventListener('mousemove', (e) => {
        const circles = document.querySelectorAll('.circle');
        const lines = document.querySelectorAll('.line');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        lines.forEach((line, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            line.style.transform = `translateX(${x}px)`;
        });
    });
    
    // Efecto de cursor personalizado (opcional)
    createCustomCursor();
});

// Función de validación de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Cursor personalizado
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Animación suave del follower
    function animate() {
        const diffX = mouseX - followerX;
        const diffY = mouseY - followerY;
        
        followerX += diffX * 0.1;
        followerY += diffY * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Efectos hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, input');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

// Añadir estilos para el cursor personalizado
const cursorStyles = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        top: -5px;
        left: -5px;
        transition: width 0.3s, height 0.3s;
        mix-blend-mode: difference;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 1px solid var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        top: -20px;
        left: -20px;
        transition: width 0.3s, height 0.3s;
        opacity: 0.5;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);