// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll to Top Button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if it's open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous validation states
        name.classList.remove('is-invalid', 'is-valid');
        email.classList.remove('is-invalid', 'is-valid');
        
        let isValid = true;
        
        // Validate name field
        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.add('is-valid');
        }
        
        // Validate email field
        if (email.value.trim() === '') {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }
        
        // If form is valid, show success message
        if (isValid) {
            // Hide form and show success message
            successMessage.classList.remove('d-none');
            
            // Reset form
            contactForm.reset();
            name.classList.remove('is-valid');
            email.classList.remove('is-valid');
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.classList.add('d-none');
            }, 5000);
            
            // Scroll to success message
            successMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
    
    // Add some simple animations to feature cards when they come into view
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation class
    function addAnimationClass(elements) {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        addAnimationClass(featureCards);
        addAnimationClass(testimonialCards);
    });
    
    // Check on page load
    addAnimationClass(featureCards);
    addAnimationClass(testimonialCards);
    
    // Dynamic content update example (bonus feature)
    // Change hero button text on click
    const heroBtn = document.querySelector('.hero-section .custom-btn');
    let originalText = heroBtn.textContent;
    let isChanged = false;
    
    heroBtn.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#contact') {
            return; // Let normal navigation happen
        }
        
        e.preventDefault();
        
        if (!isChanged) {
            this.textContent = 'Let\'s Talk!';
            this.style.background = '#10b981';
            this.style.color = 'white';
            isChanged = true;
        } else {
            this.textContent = originalText;
            this.style.background = '';
            this.style.color = '';
            isChanged = false;
        }
    });
    
    // Add hover effect to navbar brand
    const navbarBrand = document.querySelector('.navbar-brand');
    navbarBrand.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    navbarBrand.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Simple loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    });
    
    // Add click effect to feature cards
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a small bounce effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    console.log('TechSolutions website loaded successfully!');
});

// Function to show alert messages (can be used for notifications)
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}