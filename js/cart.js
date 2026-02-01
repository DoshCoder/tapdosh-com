// Cart functionality for TapDosh

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
let currentRestaurant = localStorage.getItem('tapdoshCurrentRestaurant') || null;
let lastInteractionTime = Date.now();

// Track user activity for WhatsApp float
function trackUserActivity() {
    lastInteractionTime = Date.now();
    if (window.hideWhatsAppFloat) {
        hideWhatsAppFloat();
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
    
    return totalItems;
}

// Format price with Nigerian Naira
function formatPrice(price) {
    return `₦${price.toLocaleString('en-NG')}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('tapdoshCart', JSON.stringify(cart));
    localStorage.setItem('tapdoshCurrentRestaurant', currentRestaurant);
    updateCartCount();
    trackUserActivity(); // User is active
}

// Add item to cart
function addToCart(item, restaurant) {
    // Set current restaurant
    currentRestaurant = restaurant;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.restaurant === restaurant
    );
    
    if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
        // Add new item
        cart.push({
            ...item,
            restaurant: restaurant,
            quantity: item.quantity || 1
        });
    }
    
    saveCart();
    
    // Show notification
    showNotification(`${item.name} added to cart!`);
    
    return true;
}

// Remove item from cart
function removeFromCart(itemId, restaurant) {
    cart = cart.filter(item => 
        !(item.id === itemId && item.restaurant === restaurant)
    );
    
    // If cart is empty, clear current restaurant
    if (cart.length === 0) {
        currentRestaurant = null;
    }
    
    saveCart();
    trackUserActivity(); // User is active
    return true;
}

// Update item quantity in cart
function updateQuantity(itemId, restaurant, quantity) {
    const itemIndex = cart.findIndex(item => 
        item.id === itemId && item.restaurant === restaurant
    );
    
    if (itemIndex > -1) {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.splice(itemIndex, 1);
            
            // If cart is empty, clear current restaurant
            if (cart.length === 0) {
                currentRestaurant = null;
            }
        } else {
            // Update quantity
            cart[itemIndex].quantity = quantity;
        }
        saveCart();
    }
    trackUserActivity(); // User is active
    return true;
}

// Clear entire cart
function clearCart() {
    cart = [];
    currentRestaurant = null;
    localStorage.removeItem('tapdoshCart');
    localStorage.removeItem('tapdoshCurrentRestaurant');
    updateCartCount();
    
    // Show notification
    showNotification('Cart cleared successfully!');
    
    // Update cart display if on cart page
    if (document.getElementById('cartItems')) {
        displayCartItems();
    }
    
    trackUserActivity(); // User is active
    return true;
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Tap fee of ₦50 per order
    const tapFee = 50;
    
    const total = subtotal + tapFee;
    
    return {
        subtotal,
        tapFee,
        total
    };
}

// Display cart items on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const restaurantInfo = document.getElementById('restaurantInfo');
    const restaurantName = document.getElementById('restaurantName');
    const restaurantAddress = document.getElementById('restaurantAddress');
    const subtotalEl = document.getElementById('subtotal');
    const tapFeeEl = document.getElementById('tapFee');
    const totalEl = document.getElementById('totalAmount');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add items from our certified restaurants</p>
                <a href="index.html#restaurants" class="btn btn-primary">
                    <i class="fas fa-utensils"></i> Browse Restaurants
                </a>
            </div>
        `;
        
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (restaurantInfo) restaurantInfo.style.display = 'none';
        return;
    }
    
    // Show restaurant info if we have one
    if (currentRestaurant && restaurantInfo && restaurantName && restaurantAddress) {
        let name = '';
        let address = '';
        
        if (currentRestaurant.includes('olas')) {
            name = 'Olas Nutrition';
            address = 'Opposite Alhikmah University, Ilorin';
        } else if (currentRestaurant.includes('k-bakes')) {
            name = 'K Bakes';
            address = 'Near Alhikmah University, Ilorin';
        } else if (currentRestaurant.includes('beiroot')) {
            name = 'Beiroot Restaurant';
            address = 'Tanke, Near Alhikmah University';
        }
        
        restaurantName.textContent = name;
        restaurantAddress.textContent = address;
        restaurantInfo.style.display = 'block';
    }
    
    // Display cart items
    const itemsHTML = cart.map(item => {
        const total = item.price * item.quantity;
        return `
            <div class="cart-item" data-id="${item.id}" data-restaurant="${item.restaurant}">
                <div class="item-image">
                    ${getItemEmoji(item.name)}
                </div>
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">${formatPrice(item.price)} each</p>
                    <p class="item-restaurant">${getRestaurantName(item.restaurant)}</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" onclick="updateCartQuantity('${item.id}', '${item.restaurant}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="updateCartQuantity('${item.id}', '${item.restaurant}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-total">${formatPrice(total)}</div>
                    <button class="remove-btn" onclick="removeCartItem('${item.id}', '${item.restaurant}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Add clear cart button if there are items
    if (cart.length > 0) {
        const clearCartBtn = document.createElement('div');
        clearCartBtn.className = 'clear-cart-container';
        clearCartBtn.innerHTML = `
            <button class="btn btn-outline" onclick="clearCart()">
                <i class="fas fa-trash-alt"></i> Clear Cart
            </button>
        `;
        cartItemsContainer.appendChild(clearCartBtn);
    }
    
    // Calculate and display totals
    const totals = calculateCartTotals();
    if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
    if (tapFeeEl) tapFeeEl.textContent = formatPrice(totals.tapFee);
    if (totalEl) totalEl.textContent = formatPrice(totals.total);
    
    // Enable checkout button
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Get restaurant name from ID
function getRestaurantName(restaurantId) {
    if (restaurantId.includes('olas')) return 'Olas Nutrition';
    if (restaurantId.includes('k-bakes')) return 'K Bakes';
    if (restaurantId.includes('beiroot')) return 'Beiroot Restaurant';
    return 'Restaurant';
}

// Get emoji for item based on name
function getItemEmoji(name) {
    if (name.toLowerCase().includes('jollof') || name.toLowerCase().includes('rice')) return '🍚';
    if (name.toLowerCase().includes('chicken')) return '🍗';
    if (name.toLowerCase().includes('shawarma') || name.toLowerCase().includes('wrap')) return '🌯';
    if (name.toLowerCase().includes('bread')) return '🍞';
    if (name.toLowerCase().includes('pie') || name.toLowerCase().includes('doughnut') || name.toLowerCase().includes('roll')) return '🥧';
    if (name.toLowerCase().includes('ice cream') || name.toLowerCase().includes('cream')) return '🍦';
    if (name.toLowerCase().includes('drink') || name.toLowerCase().includes('zobo') || name.toLowerCase().includes('fura') || name.toLowerCase().includes('yogurt')) return '🥤';
    if (name.toLowerCase().includes('sandwich')) return '🥪';
    if (name.toLowerCase().includes('fries') || name.toLowerCase().includes('potato')) return '🍟';
    return '🍽️';
}

// Functions to call from HTML onclick
function updateCartQuantity(itemId, restaurant, newQuantity) {
    updateQuantity(itemId, restaurant, newQuantity);
    displayCartItems();
}

function removeCartItem(itemId, restaurant) {
    removeFromCart(itemId, restaurant);
    displayCartItems();
}

// Show notification
function showNotification(message) {
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
    
    trackUserActivity(); // User is active
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Display cart items if on cart page
    if (document.getElementById('cartItems')) {
        displayCartItems();
        
        // Setup checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    showNotification('Your cart is empty!');
                    return;
                }
                
                // Show checkout modal
                const modal = document.getElementById('checkoutModal');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Populate order summary in modal
                    const modalOrderSummary = document.getElementById('modalOrderSummary');
                    if (modalOrderSummary) {
                        const summaryHTML = cart.map(item => `
                            <div class="modal-order-item">
                                <span>${item.name} × ${item.quantity}</span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `).join('');
                        
                        const totals = calculateCartTotals();
                        const restaurantName = getRestaurantName(currentRestaurant);
                        
                        modalOrderSummary.innerHTML = `
                            <div class="modal-order-restaurant">
                                <i class="fas fa-store"></i>
                                <strong>${restaurantName}</strong>
                            </div>
                            ${summaryHTML}
                            <div class="modal-order-item">
                                <span>Tap Fee</span>
                                <span>${formatPrice(totals.tapFee)}</span>
                            </div>
                            <div class="order-total">
                                <span>Total</span>
                                <span>${formatPrice(totals.total)}</span>
                            </div>
                        `;
                    }
                }
                
                trackUserActivity(); // User is active
            });
        }
        
        // Setup modal close button
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                const modal = document.getElementById('checkoutModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                trackUserActivity(); // User is active
            });
        }
        
        // Close modal when clicking outside
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                trackUserActivity(); // User is active
            });
        }
    }
    
    // Add activity tracking to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('click', trackUserActivity);
        element.addEventListener('focus', trackUserActivity);
        element.addEventListener('keydown', trackUserActivity);
    });
});

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.clearCart = clearCart;
window.calculateCartTotals = calculateCartTotals;
window.formatPrice = formatPrice;
window.getRestaurantName = getRestaurantName;
window.showNotification = showNotification;
window.trackUserActivity = trackUserActivity;