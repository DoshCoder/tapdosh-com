// Order processing and WhatsApp integration

// Process order and redirect to WhatsApp
function processOrder(event) {
    event.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('fullName').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const specialInstructions = document.getElementById('specialInstructions').value.trim();
    
    // Validate form
    if (!fullName || !deliveryAddress || !phoneNumber) {
        showNotification('Please fill in all required fields');
        return;
    }
    
    // Validate phone number - accept both 10 and 11 digit numbers
    const phoneRegex = /^[0-9]{10,11}$/;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showNotification('Please enter a valid phone number (10 or 11 digits)');
        return;
    }
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
    const restaurant = localStorage.getItem('tapdoshCurrentRestaurant') || '';
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal;
    
    // Get restaurant name
    let restaurantName = '';
    const restaurantId = restaurant;
    
    // Get restaurant from global restaurants array if available
    if (typeof restaurants !== 'undefined') {
        const restaurantData = restaurants.find(r => r.id === restaurantId);
        if (restaurantData) {
            restaurantName = restaurantData.name;
        }
    }
    
    // Fallback to hardcoded names
    if (!restaurantName) {
        if (restaurant.includes('olas')) restaurantName = 'Olas Nutrition';
        else if (restaurant.includes('k-bakes')) restaurantName = 'K Bakes';
        else if (restaurant.includes('beiroot')) restaurantName = 'BEIROOT.NG';
        else if (restaurant.includes('sherrif')) restaurantName = 'Sherrif Mai Shayi';
        else if (restaurant.includes('parfait')) restaurantName = 'ParfaitStop';
        else if (restaurant.includes('item7')) restaurantName = 'Item7 Restaurant';
        else if (restaurant.includes('sesede')) restaurantName = 'Sesede Food Restaurant';
        else if (restaurant.includes('mac-dee')) restaurantName = 'MAC-DEE';
        else if (restaurant.includes('alhaja')) restaurantName = 'Alhaja Habibat Restaurant';
        else if (restaurant.includes('abu-adamu')) restaurantName = 'Abu Adamu Fruits';
        else if (restaurant.includes('cake-delight')) restaurantName = 'Cake Delight';
        else if (restaurant.includes('crunch-express')) restaurantName = 'Crunch Express';
        else if (restaurant.includes('farmers-kitchen')) restaurantName = 'The Farmer\'s Kitchen';
        else if (restaurant.includes('safianu')) restaurantName = 'Safianu Brahim Mai Shayi';
        else if (restaurant.includes('mummy-saoban')) restaurantName = 'Mummy Saoban Restaurant';
        else if (restaurant.includes('fatimah')) restaurantName = 'Fatimah A\' Wara & Gurasa';
        else if (restaurant.includes('red-caffino')) restaurantName = 'Red Caffino Restaurant';
        else restaurantName = 'Restaurant';
    }
    
    // Check for minimum purchase requirement (Fatimah A' Wara & Gurasa)
    if (restaurant.includes('fatimah') && total < 500) {
        showNotification(`Minimum purchase of ₦500 required for ${restaurantName}. Add more items to your cart.`);
        return;
    }
    
    // Format items list for WhatsApp
    const itemsList = cart.map(item => 
        `• ${item.name} × ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString('en-NG')}`
    ).join('\n');
    
    // Create WhatsApp message
    const message = `Hello TapDosh! I'd like to place an order.

*ORDER DETAILS:*
🏪 Restaurant: ${restaurantName}
👤 Customer: ${fullName}
📞 Phone: ${cleanPhone}
📍 Delivery Address: ${deliveryAddress}

*ORDER ITEMS:*
${itemsList}

*PAYMENT SUMMARY:*
Subtotal: ₦${subtotal.toLocaleString('en-NG')}
Tap Fee: Will be determined by number of take-away/order wraps
*TOTAL: ₦${total.toLocaleString('en-NG')}*

📝 Special Instructions: ${specialInstructions || 'None'}

*IMPORTANT NOTES:*
• Your delivery fee will be determined by your location
• Your tap fee will be determined by number of take-away/order wraps
• Our representative will respond with the exact delivery fee and tap fee
• Payment can be made via bank transfer before order can be placed

Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (TapDosh representative)
    const whatsappNumber = '2349050270392';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show confirmation message
    const confirmationMessage = `Opening WhatsApp to complete your order!\n\nYour order details will be sent to our TapDosh representative.\n\nPlease make sure to send the message when WhatsApp opens.\n\nNote: Your delivery fee will be determined by your location and tap fee by number of take-away/order wraps.`;
    
    if (confirm(confirmationMessage)) {
        // Clear cart
        localStorage.removeItem('tapdoshCart');
        localStorage.removeItem('tapdoshCurrentRestaurant');
        
        // Update cart count
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
        
        // Close modal
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Redirect to success page after a short delay
        setTimeout(() => {
            window.location.href = 'order-success.html';
        }, 1000);
    }
}

// Initialize order form
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', processOrder);
    }
    
    // Format phone number input
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove all non-digits
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 11 digits maximum
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Format as Nigerian phone number
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = `${value.substring(0, 3)} ${value.substring(3)}`;
            } else if (value.length <= 10) {
                value = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
            } else {
                value = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 10)}`;
            }
            
            e.target.value = value;
        });
        
        // Auto-format on focus out
        phoneInput.addEventListener('blur', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length === 10 || value.length === 11) {
                if (value.length === 11 && value.startsWith('0')) {
                    this.value = `0${value.substring(1, 4)} ${value.substring(4, 7)} ${value.substring(7)}`;
                } else if (value.length === 10) {
                    this.value = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
                }
            }
        });
    }
    
    // Track user activity
    const formInputs = document.querySelectorAll('#orderForm input, #orderForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (typeof trackUserActivity === 'function') {
                trackUserActivity();
            }
        });
        input.addEventListener('focus', () => {
            if (typeof trackUserActivity === 'function') {
                trackUserActivity();
            }
        });
    });
    
    // Initialize WhatsApp float if function exists
    if (typeof initWhatsAppFloat === 'function') {
        initWhatsAppFloat();
    }
});

// Show notification function (fallback)
function showNotification(message) {
    if (window.showNotification) {
        window.showNotification(message);
        return;
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// Export for use in other files
window.processOrder = processOrder;
window.showNotification = showNotification;