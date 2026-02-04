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
    
    // Update cart count in localStorage for cross-page updates
    localStorage.setItem('tapdoshCartCount', totalItems);
    
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
    
    const total = subtotal;
    
    return {
        subtotal,
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
        
        // Get restaurant name and address
        const restaurant = getRestaurantById(currentRestaurant);
        if (restaurant) {
            name = restaurant.name;
            address = restaurant.location;
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
    if (tapFeeEl) tapFeeEl.textContent = 'Will be determined by number of take-away/order wraps';
    if (totalEl) totalEl.textContent = formatPrice(totals.total);
    
    // Enable checkout button
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Get restaurant by ID
function getRestaurantById(restaurantId) {
    // This function will be overridden by main.js restaurant data
    if (typeof restaurants !== 'undefined') {
        return restaurants.find(r => r.id === restaurantId);
    }
    return null;
}

// Get restaurant name from ID
function getRestaurantName(restaurantId) {
    const restaurant = getRestaurantById(restaurantId);
    if (restaurant) return restaurant.name;
    return 'Restaurant';
}

// Get emoji for item based on name
function getItemEmoji(name) {
    name = name.toLowerCase();
    if (name.includes('jollof') || name.includes('rice')) return '🍚';
    if (name.includes('chicken')) return '🍗';
    if (name.includes('shawarma') || name.includes('wrap')) return '🌯';
    if (name.includes('bread')) return '🍞';
    if (name.includes('pie') || name.includes('doughnut') || name.includes('roll') || name.includes('pastry')) return '🥧';
    if (name.includes('ice cream') || name.includes('cream')) return '🍦';
    if (name.includes('drink') || name.includes('zobo') || name.includes('fura') || name.includes('yogurt') || name.includes('juice')) return '🥤';
    if (name.includes('sandwich')) return '🥪';
    if (name.includes('fries') || name.includes('potato')) return '🍟';
    if (name.includes('indomie') || name.includes('noodle')) return '🍜';
    if (name.includes('egg')) return '🥚';
    if (name.includes('tea')) return '☕';
    if (name.includes('burger')) return '🍔';
    if (name.includes('pasta')) return '🍝';
    if (name.includes('soup')) return '🥣';
    if (name.includes('beef')) return '🥩';
    if (name.includes('fish')) return '🐟';
    if (name.includes('plantain')) return '🍌';
    if (name.includes('orange') || name.includes('pineapple') || name.includes('banana') || name.includes('fruit')) return '🍎';
    if (name.includes('cheese') || name.includes('wara')) return '🧀';
    if (name.includes('smoothie') || name.includes('milkshake')) return '🥛';
    if (name.includes('water')) return '💧';
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
    // Load cart from localStorage
    const savedCart = localStorage.getItem('tapdoshCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    const savedRestaurant = localStorage.getItem('tapdoshCurrentRestaurant');
    if (savedRestaurant) {
        currentRestaurant = savedRestaurant;
    }
    
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
    
    // Listen for cart updates from other pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'tapdoshCart') {
            const newCart = JSON.parse(e.newValue) || [];
            cart = newCart;
            updateCartCount();
            
            if (document.getElementById('cartItems')) {
                displayCartItems();
            }
        }
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