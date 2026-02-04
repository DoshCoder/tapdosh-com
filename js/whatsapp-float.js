// WhatsApp Float Behavior
let whatsAppFloat = null;
let inactivityTimer = null;

function initWhatsAppFloat() {
    // Check if WhatsApp float already exists
    if (document.querySelector('.whatsapp-float')) {
        whatsAppFloat = document.querySelector('.whatsapp-float');
        return;
    }
    
    // Create WhatsApp float element
    whatsAppFloat = document.createElement('a');
    whatsAppFloat.href = 'https://wa.me/2349050270392';
    whatsAppFloat.target = '_blank';
    whatsAppFloat.className = 'whatsapp-float';
    whatsAppFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsAppFloat.style.display = 'none'; // Hidden by default
    
    // Add styles if not already in CSS
    if (!document.querySelector('#whatsapp-float-styles')) {
        const style = document.createElement('style');
        style.id = 'whatsapp-float-styles';
        style.textContent = `
            .whatsapp-float {
                position: fixed;
                bottom: 30px;
                right: 20px;
                background: #25D366;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                text-decoration: none;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                z-index: 2000;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .whatsapp-float:hover {
                transform: scale(1.1);
                background: #128C7E;
                box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(whatsAppFloat);
    
    // Add hover effect
    whatsAppFloat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(37, 211, 102, 0.4)';
    });
    
    whatsAppFloat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    });
    
    // Add click tracking
    whatsAppFloat.addEventListener('click', function() {
        if (typeof trackUserActivity === 'function') {
            trackUserActivity();
        }
    });
    
    // Start inactivity timer
    startInactivityTimer();
}

function showWhatsAppFloat() {
    if (whatsAppFloat) {
        whatsAppFloat.style.display = 'flex';
        whatsAppFloat.style.animation = 'slideInUp 0.5s ease forwards';
    }
}

function hideWhatsAppFloat() {
    if (whatsAppFloat && whatsAppFloat.style.display !== 'none') {
        whatsAppFloat.style.animation = 'slideOutDown 0.5s ease forwards';
        setTimeout(() => {
            if (whatsAppFloat) {
                whatsAppFloat.style.display = 'none';
            }
        }, 500);
    }
}

function startInactivityTimer() {
    // Clear any existing timer
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    
    // Hide WhatsApp float initially
    hideWhatsAppFloat();
    
    // Start new timer (30 seconds)
    inactivityTimer = setTimeout(() => {
        // Check if cart is empty (user hasn't picked anything)
        const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
        if (cart.length === 0) {
            showWhatsAppFloat();
        }
    }, 30000); // 30 seconds
}

// Reset timer on user activity
function resetInactivityTimer() {
    hideWhatsAppFloat();
    startInactivityTimer();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure all other scripts are loaded
    setTimeout(initWhatsAppFloat, 1000);
    
    // Add event listeners for user activity
    document.addEventListener('click', function() {
        if (typeof resetInactivityTimer === 'function') {
            resetInactivityTimer();
        }
    });
    
    document.addEventListener('scroll', function() {
        if (typeof resetInactivityTimer === 'function') {
            resetInactivityTimer();
        }
    });
    
    document.addEventListener('keydown', function() {
        if (typeof resetInactivityTimer === 'function') {
            resetInactivityTimer();
        }
    });
});

// Export functions
window.initWhatsAppFloat = initWhatsAppFloat;
window.hideWhatsAppFloat = hideWhatsAppFloat;
window.showWhatsAppFloat = showWhatsAppFloat;
window.resetInactivityTimer = resetInactivityTimer;