// ============================================
// BACKGROUND AUDIO
// ============================================
const backgroundMusic = document.getElementById('backgroundMusic');

// Play audio when "Begin the Journey" button is clicked
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().then(() => {
                console.log('Audio started successfully');
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    });
});

// Also try on any click as fallback
document.addEventListener('click', () => {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}, { once: true });

// ============================================
// CUSTOM CURSOR
// ============================================
const customCursor = document.getElementById('custom-cursor');
const cursorImage = document.querySelector('.cursor-image');

// Move custom cursor with mouse
document.addEventListener('mousemove', (e) => {
    if (customCursor) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    }
});

// Change cursor on click
document.addEventListener('mousedown', () => {
    if (customCursor) {
        customCursor.classList.add('clicking');
        cursorImage.src = 'normal.png';
    }
});

document.addEventListener('mouseup', () => {
    if (customCursor) {
        customCursor.classList.remove('clicking');
        cursorImage.src = 'gm.png';
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    if (customCursor) {
        customCursor.style.opacity = '0';
    }
});

document.addEventListener('mouseenter', () => {
    if (customCursor) {
        customCursor.style.opacity = '1';
    }
});

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ============================================
// CINEMATIC LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const loadingBar = document.querySelector('.loading-bar');

    // Update progress bar for accessibility
    if (loadingBar) {
        loadingBar.setAttribute('aria-valuenow', '100');
    }

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.add('visible');
    }, 2800);
});

// ============================================
// BACKGROUND PARTICLES SYSTEM
// ============================================
const particlesCanvas = document.querySelector('.particles-canvas');
const ctx = particlesCanvas.getContext('2d');

/**
 * Resize canvas to fit window
 * Performance: Debounced resize event
 */
function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

resizeCanvas();
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
});

/**
 * Particle class for atmospheric effects
 * Handles position, movement, and pulsing opacity
 */
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        const colors = ['#d4af37', '#8b0000', '#ff0000', '#cc0000', '#ffd700'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseOffset += this.pulseSpeed;
        
        if (this.x < 0 || this.x > particlesCanvas.width ||
            this.y < 0 || this.y > particlesCanvas.height) {
            this.reset();
        }
    }
    
    draw() {
        const pulseOpacity = this.opacity + Math.sin(this.pulseOffset) * 0.2;
        const currentOpacity = Math.max(0.1, Math.min(0.8, pulseOpacity));
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

// Initialize particle system
const particles = [];
for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

/**
 * Animation loop for particles
 * Uses requestAnimationFrame for smooth performance
 */
function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ============================================
// FLOATING EMBBERS SYSTEM
// ============================================
const embersContainer = document.querySelector('.embers-container');

/**
 * Create a single ember element
 * Randomizes position and animation timing
 */
function createEmber() {
    const ember = document.createElement('div');
    ember.classList.add('ember');
    ember.style.left = Math.random() * 100 + '%';
    ember.style.animationDuration = (Math.random() * 4 + 6) + 's';
    ember.style.animationDelay = Math.random() * 2 + 's';
    embersContainer.appendChild(ember);
    
    // Clean up ember after animation completes
    setTimeout(() => {
        ember.remove();
    }, 10000);
}

// Create embers at regular intervals
setInterval(createEmber, 500);

// Scroll Reveal Animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Mouse Parallax Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
    }
    
    const floatingImages = document.querySelectorAll('.floating-image');
    floatingImages.forEach((image, index) => {
        const depth = (index + 1) * 10;
        image.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
    });
});

// Smooth Scroll for CTA Buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // Scroll to next section if no href
            const currentSection = button.closest('section');
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for Enhanced Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .section-text, .memory-card, .wish-card').forEach(element => {
    observer.observe(element);
});

// Smooth Page Transition on Link Click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Text Appearance for Hero Section
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroDescription = document.querySelector('.hero-description');

function animateText(element, delay) {
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// Initialize animations after loading screen
setTimeout(() => {
    animateText(heroTitle, 100);
    animateText(heroSubtitle, 400);
    animateText(heroDescription, 700);
}, 3000);

// Parallax Effect on Scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${currentScrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (currentScrollY / 700);
    }
    
    // Parallax for moon glow
    const moonGlow = document.querySelector('.moon-glow');
    if (moonGlow) {
        moonGlow.style.transform = `translateY(${currentScrollY * 0.2}px) scale(${1 + currentScrollY * 0.0005})`;
    }
    
    // Parallax for ambient lights
    const ambientLights = document.querySelectorAll('.ambient-light');
    ambientLights.forEach((light, index) => {
        const speed = (index + 1) * 0.1;
        light.style.transform = `translateY(${currentScrollY * speed}px)`;
    });
    
    lastScrollY = currentScrollY;
});

// Enhanced Button Hover Effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Image Zoom Effect on Scroll
const zoomImages = document.querySelectorAll('.zoom-image');

zoomImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        const img = image.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.3)';
        }
    });
    
    image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Memory Cards Staggered Animation
const memoryCards = document.querySelectorAll('.memory-card');

memoryCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Wish Cards Staggered Animation
const wishCards = document.querySelectorAll('.wish-card');

wishCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`;
});

// Performance Optimization: Throttle Scroll Events
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Interactive Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => ({
    src: item.dataset.fullsize,
    alt: item.querySelector('img').alt
}));

// Open modal when clicking on gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openModal();
    });
});

function openModal() {
    modal.classList.add('active');
    modalImage.src = galleryImages[currentImageIndex].src;
    modalCaption.textContent = galleryImages[currentImageIndex].alt;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        modalImage.src = '';
    }, 300);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = galleryImages[currentImageIndex].src;
        modalCaption.textContent = galleryImages[currentImageIndex].alt;
        modalImage.style.opacity = '1';
    }, 200);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = galleryImages[currentImageIndex].src;
        modalCaption.textContent = galleryImages[currentImageIndex].alt;
        modalImage.style.opacity = '1';
    }, 200);
}

// Event listeners for modal controls
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', showNextImage);
modalPrev.addEventListener('click', showPrevImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
});

// Add smooth transition to modal image
modalImage.style.transition = 'opacity 0.2s ease';

// Cinematic Fade-in for Sections
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// Initialize first section immediately
if (sections.length > 0) {
    sections[0].style.opacity = '1';
    sections[0].style.transform = 'translateY(0)';
}
