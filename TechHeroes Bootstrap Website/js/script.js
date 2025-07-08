document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.pageYOffset > 300);
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }     
            // Close mobile menu
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        });
    });
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email'); 
        // Reset validation
        [name, email].forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });
        
        let isValid = true;
        
        // Validate fields
        [name, email].forEach(field => {
            if (field.value.trim() === '') {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.add('is-valid');
            }
        });
        // Show success if valid
        if (isValid) {
            successMessage.classList.remove('d-none');
            contactForm.reset();
            [name, email].forEach(field => field.classList.remove('is-valid'));
            
            setTimeout(() => successMessage.classList.add('d-none'), 5000);
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card');
    
    function checkAndAnimate() {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight) {
                el.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }
    
    window.addEventListener('scroll', checkAndAnimate);
    checkAndAnimate(); // Check on load
    
    // Hero button toggle
    const heroBtn = document.querySelector('.hero-section .custom-btn');
    const originalText = heroBtn.textContent;
    let isChanged = false;
    
    heroBtn.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#contact') return;
        
        e.preventDefault();
        if (!isChanged) {
            this.textContent = 'Let\'s Talk!';
            this.style.cssText = 'background: #10b981; color: white;';
        } else {
            this.textContent = originalText;
            this.style.cssText = '';
        }
        isChanged = !isChanged;
    });
    
    // Navbar brand hover effect
    const navbarBrand = document.querySelector('.navbar-brand');
    navbarBrand.addEventListener('mouseenter', () => navbarBrand.style.transform = 'scale(1.1)');
    navbarBrand.addEventListener('mouseleave', () => navbarBrand.style.transform = 'scale(1)');
    
    // Image loading animation
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.cssText = 'opacity: 0; animation: fadeInUp 0.5s ease forwards;';
        });
    });
    
    // Feature card click effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
        });
    });
    
    console.log('TechSolutions website loaded successfully!');
});

// Alert function
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999;';
    alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;   
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}
