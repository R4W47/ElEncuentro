// ===== INICIALIZACIÃ"N AL CARGAR EL DOM =====
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initImageLoadingEffects();
    initPriceAnimations();
    createScrollToTopButton();
    initParallaxEffect();
    initHeaderScrollEffect();
    
    console.log('âš¡ Distribuidora El Encuentro - Sistema cargado correctamente');
    console.log('ðŸ"± Para consultas: https://wa.me/50683149916');
});

// ===== NAVEGACIÃ"N SUAVE =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Cerrar menÃº mÃ³vil si estÃ¡ abierto
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                }
            }
        });
    });
}

// ===== CAMBIO DE FONDO DEL HEADER AL HACER SCROLL =====
function initHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Cambio de opacidad basado en scroll
        if (scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.98), rgba(30, 64, 175, 0.98))';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(30, 64, 175, 0.95))';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }

        // Efecto hide/show header al hacer scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    });
}

// ===== MENÃš MÃ"VIL =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            
            // Cambiar icono del botÃ³n
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
                mobileMenuBtn.style.transform = 'rotate(180deg)';
            } else {
                icon.className = 'fas fa-bars';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });

        // Cerrar menÃº al hacer clic en enlaces
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            });
        });

        // Cerrar menÃº al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos de productos
    document.querySelectorAll('.product-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observar estadÃ­sticas
    document.querySelectorAll('.stat-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Observar elementos de contacto
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });
}

// ===== EFECTO PARALLAX =====
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== ANIMACIÃ"N DE CONTADOR PARA ESTADÃSTICAS =====
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('+')) {
            element.textContent = `${currentValue}+`;
        } else if (element.textContent.includes('/')) {
            element.textContent = `${currentValue}/7`;
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== FUNCIÓN PARA EXTRAER NÚMEROS DE PRECIOS (MEJORADA PARA GITHUB) =====
function extractPriceNumber(priceText) {
    if (!priceText || typeof priceText !== 'string') {
        console.warn('Texto de precio inválido:', priceText);
        return null;
    }

    // Normalizar el texto removiendo caracteres especiales y espacios extra
    let cleanText = priceText.toString().trim();
    
    // Remover símbolos de moneda comunes
    cleanText = cleanText.replace(/[₡$€£¥]/g, '');
    
    // Remover palabras comunes que no son números
    cleanText = cleanText.replace(/desde|from|price|precio|colones|dollars|euros/gi, '');
    
    // Buscar el primer grupo de números consecutivos (puede incluir separadores)
    const numberMatch = cleanText.match(/(\d{1,3}(?:[,\.]\d{3})*|\d+)/);
    
    if (numberMatch) {
        // Limpiar separadores y convertir
        const numberStr = numberMatch[1].replace(/[,\.]/g, '');
        const number = parseInt(numberStr, 10);
        
        if (!isNaN(number) && number > 0) {
            return number;
        }
    }
    
    // Intento alternativo: buscar cualquier secuencia de dígitos
    const fallbackMatch = cleanText.match(/\d+/);
    if (fallbackMatch) {
        const number = parseInt(fallbackMatch[0], 10);
        if (!isNaN(number) && number > 0) {
            return number;
        }
    }
    
    return null;
}

// ===== ANIMACIÃ"N DE PRECIOS (CORREGIDA) =====
function initPriceAnimations() {
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                
                try {
                    const priceText = entry.target.textContent || entry.target.innerText || '';
                    console.log('Procesando precio:', priceText);
                    
                    const priceNumber = extractPriceNumber(priceText);
                    console.log('Número extraído:', priceNumber);
                    
                    if (priceNumber !== null && priceNumber > 0) {
                        entry.target.dataset.originalFormat = priceText;
                        animatePriceValue(entry.target, 0, priceNumber, 1500, priceText);
                    } else {
                        console.warn('No se pudo extraer número válido de:', priceText);
                    }
                } catch (error) {
                    console.error('Error procesando precio:', error, entry.target);
                }
            }
        });
    }, { threshold: 0.3, rootMargin: '50px' });

    // Observar estadÃ­sticas para animarlas
    document.querySelectorAll('.stat-item h4').forEach((stat, index) => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const text = entry.target.textContent;
                    
                    setTimeout(() => {
                        if (text.includes('500') || text.includes('100')) {
                            animateCounter(entry.target, 0, 100, 2000);
                        } else if (text.includes('13') || text.includes('10')) {
                            animateCounter(entry.target, 0, 10, 1500);
                        } else if (text.includes('24')) {
                            animateCounter(entry.target, 0, 24, 1000);
                        }
                    }, index * 300);
                }
            });
        }, { threshold: 0.7 });
        
        observer.observe(stat);
    });

    // Agregar pequeño delay para asegurar que los elementos estén cargados
    setTimeout(() => {
        document.querySelectorAll('.price').forEach(price => {
            if (price) {
                priceObserver.observe(price);
            }
        });
    }, 100);
}

function animatePriceValue(element, start, end, duration, originalFormat) {
    // Verificar que end sea un número válido
    if (isNaN(end) || end <= 0) {
        console.error('Valor de precio inválido:', end);
        return;
    }

    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Mantener el formato original pero actualizar el número
        if (originalFormat.toLowerCase().includes('desde')) {
            element.innerHTML = `Desde ₡${currentValue.toLocaleString()}`;
        } else if (originalFormat.includes('₡')) {
            element.innerHTML = `₡${currentValue.toLocaleString()}`;
        } else if (originalFormat.includes('$')) {
            element.innerHTML = `$${currentValue.toLocaleString()}`;
        } else {
            // Para otros formatos, intentar mantener la estructura original
            const words = originalFormat.split(' ');
            const newWords = words.map(word => {
                if (/\d/.test(word)) {
                    return currentValue.toLocaleString();
                }
                return word;
            });
            element.innerHTML = newWords.join(' ');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ===== EFECTOS DE CARGA PARA IMÃGENES =====
function initImageLoadingEffects() {
    const images = document.querySelectorAll('.product-item img');
    
    images.forEach(img => {
        img.style.filter = 'blur(5px) opacity(0.7)';
        img.style.transition = 'filter 0.5s ease, opacity 0.5s ease';
        
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb, #f3f4f6);
            background-size: 200% 200%;
            animation: shimmer 1.5s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
        `;
        placeholder.innerHTML = '<i class="fas fa-image" style="font-size: 2rem;"></i>';
        
        // Agregar shimmer animation
        if (!document.querySelector('#shimmer-style')) {
            const style = document.createElement('style');
            style.id = 'shimmer-style';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        img.parentElement.style.position = 'relative';
        img.parentElement.insertBefore(placeholder, img);
        
        img.addEventListener('load', function() {
            img.style.filter = 'none';
            img.style.opacity = '1';
            placeholder.style.opacity = '0';
            setTimeout(() => placeholder.remove(), 300);
        });
        
        if (img.complete) {
            img.style.filter = 'none';
            img.style.opacity = '1';
            placeholder.remove();
        }
    });
}

// ===== BOTÃ"N SCROLL TO TOP =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        font-size: 1.3rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
    });
}

// ===== EFECTOS ADICIONALES =====
// Efecto de typing para el tÃ­tulo hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Efecto de partÃ­culas en el hero (opcional)
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 187, 36, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        
        hero.appendChild(particle);
    }

    // Agregar animaciÃ³n de partÃ­culas
    if (!document.querySelector('#particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FUNCIONES DE UTILIDAD =====
// Throttle para optimizar eventos de scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle a eventos de scroll costosos
window.addEventListener('scroll', throttle(function() {
    // AquÃ­ puedes agregar mÃ¡s efectos de scroll si es necesario
}, 16)); // ~60fps

// ===== INTERACCIONES AVANZADAS =====
document.addEventListener('DOMContentLoaded', function() {
    // Agregar efecto hover avanzado a productos
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Inicializar efecto de partÃ­culas (opcional - descomenta si lo deseas)
    // initParticleEffect();
});
