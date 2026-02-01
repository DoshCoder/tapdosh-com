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
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10,15}$/;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showNotification('Please enter a valid phone number');
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
    const tapFee = 50; // Fixed tap fee
    const total = subtotal + tapFee;
    
    // Get restaurant name
    let restaurantName = '';
    if (restaurant.includes('olas')) restaurantName = 'Olas Nutrition';
    else if (restaurant.includes('k-bakes')) restaurantName = 'K Bakes';
    else if (restaurant.includes('beiroot')) restaurantName = 'Beiroot Restaurant';
    else restaurantName = 'Restaurant';
    
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
Tap Fee: ₦${tapFee.toLocaleString('en-NG')}
*TOTAL: ₦${total.toLocaleString('en-NG')}*

📝 Special Instructions: ${specialInstructions || 'None'}

*IMPORTANT NOTES:*
• Your delivery fee will be determined by your location
• Our representative will respond with the exact delivery fee
• Payment can be made via bank transfer or cash on delivery

Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (TapDosh representative)
    const whatsappNumber = '2349031123030';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show confirmation message
    const confirmationMessage = `Opening WhatsApp to complete your order!\n\nYour order details will be sent to our TapDosh representative.\n\nPlease make sure to send the message when WhatsApp opens.\n\nNote: Your delivery fee will be determined by your location.`;
    
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
            if (value.length === 11 && value.startsWith('0')) {
                this.value = `0${value.substring(1, 4)} ${value.substring(4, 7)} ${value.substring(7)}`;
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
});