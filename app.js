// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const currentYearSpan = document.getElementById('currentYear');
const typingText = document.querySelector('.typing-text');
const statNumbers = document.querySelectorAll('.stat-number');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Typing Animation
function typeWriter() {
    const texts = typingText.dataset.text.split('|');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = texts[textIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingText.textContent = currentText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Stats Counter Animation
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        function updateCounter() {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(stat);
    });
}

// Enhanced header scroll effect with throttling
let lastScroll = 0;
const scrollThrottle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', scrollThrottle(() => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        if (currentScroll > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    lastScroll = currentScroll;
}, 100));

// Enhanced mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Authentication Page Functionality
if (window.location.pathname.includes('auth.html')) {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Enhanced tab switching animations
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = document.getElementById(tab.dataset.tab + 'Form');

            // Remove active classes with smooth transitions
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(form => {
                form.style.opacity = '0';
                form.style.transform = 'translateX(20px)';
                setTimeout(() => form.classList.remove('active'), 300);
            });

            // Add active classes with animations
            tab.classList.add('active');
            setTimeout(() => {
                targetForm.classList.add('active');
                requestAnimationFrame(() => {
                    targetForm.style.opacity = '1';
                    targetForm.style.transform = 'translateX(0)';
                });
            }, 50);
        });
    });

    // Enhanced form submissions with visual feedback
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // Loading state animation
            button.innerHTML = '<span class="loading-dots">Processing</span>';
            button.style.opacity = '0.7';
            button.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset button state with animation
            button.style.opacity = '1';
            button.disabled = false;
            button.textContent = originalText;

            alert('This is a demo version. Authentication functionality is not implemented.');
        });
    });
}

// Contact Form Handling
if (window.location.pathname.includes('contact.html')) {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        // Loading state animation
        button.innerHTML = '<span class="loading-dots">Sending</span>';
        button.style.opacity = '0.7';
        button.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset button state with animation
        button.style.opacity = '1';
        button.disabled = false;
        button.textContent = originalText;

        // Show success message
        alert('This is a demo version. Message sending functionality is not implemented.');

        // Clear form
        contactForm.reset();
    });
}

// Add loading dots animation if not already present
if (!document.querySelector('style[data-loading-dots]')) {
    const style = document.createElement('style');
    style.setAttribute('data-loading-dots', '');
    style.textContent = `
        .loading-dots::after {
            content: '...';
            animation: dots 1.5s steps(4, end) infinite;
        }
        @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80% { content: '...'; }
        }
    `;
    document.head.appendChild(style);
}

// Reviews Data
const reviewsData = [
    {
        initials: 'JD',
        name: 'John Doe',
        position: 'CEO, TechCorp',
        rating: 5,
        text: 'Outstanding web development service! The team delivered our project ahead of schedule.'
    },
    {
        initials: 'AS',
        name: 'Alice Smith',
        position: 'CTO, DataFlow',
        rating: 5,
        text: 'Their AI solutions have transformed our business processes completely.'
    },
    {
        initials: 'MJ',
        name: 'Mike Johnson',
        position: 'Founder, StartupX',
        rating: 5,
        text: 'Exceptional cloud services and support. Highly recommended!'
    },
    {
        initials: 'EW',
        name: 'Emma Wilson',
        position: 'Director, DataTech',
        rating: 5,
        text: 'The mobile app they developed exceeded our expectations.'
    },
    {
        initials: 'RB',
        name: 'Robert Brown',
        position: 'CIO, SecureNet',
        rating: 5,
        text: 'Top-notch cybersecurity solutions. They really know their stuff.'
    }
];

// Generate Reviews
function generateReviews() {
    const container = document.querySelector('.reviews-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Generate 100+ reviews by duplicating and slightly modifying the base reviews
    const allReviews = [];
    for (let i = 0; i < 20; i++) { // 20 iterations * 5 base reviews = 100 reviews
        reviewsData.forEach((review, index) => {
            const modifiedReview = {
                ...review,
                name: `${review.name}${i > 0 ? ` ${String.fromCharCode(65 + i)}` : ''}`, // Add suffix to names
                text: i > 0 ? `${review.text} ${i + 1}` : review.text // Slightly modify text
            };
            allReviews.push(modifiedReview);
        });
    }

    // Create and append review cards
    allReviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-avatar">${review.initials}</div>
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <p>${review.position}</p>
                </div>
            </div>
            <div class="stars">${'★'.repeat(review.rating)}</div>
            <p class="review-text">"${review.text}"</p>
        `;
        container.appendChild(card);
    });

    // Clone the reviews for seamless infinite scroll
    const reviewCards = container.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        const clone = card.cloneNode(true);
        container.appendChild(clone);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    animateStats();
    generateReviews();
});