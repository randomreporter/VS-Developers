document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const leadForm = document.getElementById('leadForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Modal Dynamic Fields
    const successName = document.getElementById('success-user-name');
    const successPhone = document.getElementById('success-user-phone');
    const successEmail = document.getElementById('success-user-email');

    // 1. Sticky Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Phone Input Formatting & Sanitation
    phoneInput.addEventListener('input', (e) => {
        // Only allow numbers, strip any other characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit length to 10 digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        e.target.value = value;
        
        // Dynamic border color checking
        if (value.length === 10 && /^[6789]\d{9}$/.test(value)) {
            hideError(phoneInput, 'phone-error');
        }
    });

    // 3. Helper functions for Validation Errors
    function showError(inputElement, errorId) {
        inputElement.style.borderColor = '#DC2626';
        const errorMsg = document.getElementById(errorId);
        if (errorMsg) {
            errorMsg.style.display = 'block';
        }
    }

    function hideError(inputElement, errorId) {
        inputElement.style.borderColor = '';
        const errorMsg = document.getElementById(errorId);
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }

    // Individual field validation on Blur (User interaction focus-out)
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'name-error');
        } else {
            hideError(nameInput, 'name-error');
        }
    });

    phoneInput.addEventListener('blur', () => {
        const phoneVal = phoneInput.value.trim();
        if (!/^[6789]\d{9}$/.test(phoneVal)) {
            showError(phoneInput, 'phone-error');
        } else {
            hideError(phoneInput, 'phone-error');
        }
    });

    emailInput.addEventListener('blur', () => {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showError(emailInput, 'email-error');
        } else {
            hideError(emailInput, 'email-error');
        }
    });

    // Reset styles on key input
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 3) {
            hideError(nameInput, 'name-error');
        }
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value.trim())) {
            hideError(emailInput, 'email-error');
        }
    });

    // 4. Form Submission Handling
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Name Validation
        const nameVal = nameInput.value.trim();
        if (nameVal.length < 3) {
            showError(nameInput, 'name-error');
            isValid = false;
        } else {
            hideError(nameInput, 'name-error');
        }
        
        // Phone Validation (Indian mobile format: 10 digits starting with 6-9)
        const phoneVal = phoneInput.value.trim();
        if (!/^[6789]\d{9}$/.test(phoneVal)) {
            showError(phoneInput, 'phone-error');
            isValid = false;
        } else {
            hideError(phoneInput, 'phone-error');
        }
        
        // Email Validation
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showError(emailInput, 'email-error');
            isValid = false;
        } else {
            hideError(emailInput, 'email-error');
        }
        
        if (isValid) {
            // Fill modal summary data
            successName.textContent = nameVal;
            successPhone.textContent = `+91 ${phoneVal.substring(0, 5)} ${phoneVal.substring(5)}`;
            successEmail.textContent = emailVal;
            
            // Show Success Modal
            successModal.classList.add('active');
            
            // Reset the form values
            leadForm.reset();
        }
    });

    // 5. Close Modal Event Listeners
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // Close on backdrop overlay click
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });

    // Esc Key Closes Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });

    // 6. Smooth scroll visual feedback (CTA Highlight)
    const bottomCta = document.getElementById('bottom-cta-btn');
    if (bottomCta) {
        bottomCta.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('lead-form-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight target card with border color pulse after scrolling completes
                setTimeout(() => {
                    targetSection.style.transition = 'all 0.4s ease';
                    targetSection.style.borderColor = 'var(--color-accent)';
                    targetSection.style.boxShadow = '0 0 0 4px rgba(255, 107, 0, 0.3)';
                    
                    setTimeout(() => {
                        targetSection.style.borderColor = '';
                        targetSection.style.boxShadow = '';
                    }, 1500);
                }, 800);
            }
        });
    }
});
