// Restaurant page functionality

// Get restaurant data from URL parameter
function getRestaurantData() {
    // Try to get from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');
    
    // If no URL parameter, redirect to home
    if (!restaurantId) {
        window.location.href = 'index.html';
        return null;
    }
    
    // Define restaurant data
    const restaurants = {
        'olas-nutrition': {
            name: 'Olas Nutrition',
            tagline: 'Authentic Nigerian Cuisine',
            location: 'Opposite Alhikmah University, Ilorin',
            deliveryTime: '30-45 minutes',
            hours: '8:00 AM - 11:00 PM',
            badges: ['🏆 Certified', '⚡ Fast', '🍗 Chicken', '🎓 Student Favorite'],
            menu: [
                {
                    id: 1,
                    name: 'Jollof Rice & Chicken',
                    description: 'One plate of authentic Nigerian jollof rice with well-seasoned chicken',
                    price: 2900,
                    category: 'rice'
                },
                {
                    id: 2,
                    name: 'Extra Jollof Rice & Chicken',
                    description: 'Large portion of jollof rice with extra chicken',
                    price: 3500,
                    category: 'rice'
                },
                {
                    id: 3,
                    name: 'Shawarma (No Sausage)',
                    description: 'Delicious shawarma wrap with chicken, vegetables, and special sauce',
                    price: 3000,
                    category: 'shawarma'
                },
                {
                    id: 4,
                    name: 'Shawarma (Single Sausage)',
                    description: 'Shawarma with chicken and sausage',
                    price: 3300,
                    category: 'shawarma'
                },
                {
                    id: 5,
                    name: 'Shawarma (Double Sausage)',
                    description: 'Shawarma with chicken and double sausage',
                    price: 3600,
                    category: 'shawarma'
                },
                {
                    id: 6,
                    name: 'Masa (Pack of 10)',
                    description: 'Traditional rice cakes, soft and delicious',
                    price: 500,
                    category: 'snacks'
                },
                {
                    id: 7,
                    name: 'Cow Leg',
                    description: 'Tender cow leg delicacy',
                    price: 1000,
                    category: 'proteins'
                },
                {
                    id: 8,
                    name: 'Chicken',
                    description: 'Well-seasoned chicken portion',
                    price: 2000,
                    category: 'proteins'
                }
            ]
        },
        'k-bakes': {
            name: 'K Bakes',
            tagline: 'Fresh Baked Goods & More',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '25-40 minutes',
            hours: '7:00 AM - 10:00 PM',
            badges: ['🏆 Certified', '🍞 Fresh', '🎓 Student Favorite', '🌙 Late Night'],
            menu: [
                {
                    id: 9,
                    name: 'Bread',
                    description: 'Freshly baked bread',
                    price: 800,
                    category: 'bread'
                },
                {
                    id: 10,
                    name: 'Bread (Large)',
                    description: 'Large freshly baked bread',
                    price: 1000,
                    category: 'bread'
                },
                {
                    id: 11,
                    name: 'Fish Bread',
                    description: 'Bread filled with fish',
                    price: 1200,
                    category: 'special-bread'
                },
                {
                    id: 12,
                    name: 'Sardine Bread',
                    description: 'Bread filled with sardine',
                    price: 2000,
                    category: 'special-bread'
                },
                {
                    id: 13,
                    name: 'Chocolate Bread',
                    description: 'Chocolate flavored bread',
                    price: 1000,
                    category: 'special-bread'
                },
                {
                    id: 14,
                    name: 'Coconut Bread',
                    description: 'Coconut flavored bread',
                    price: 2000,
                    category: 'special-bread'
                },
                {
                    id: 15,
                    name: 'Chicken Shawarma',
                    description: 'Chicken shawarma wrap',
                    price: 3000,
                    category: 'shawarma'
                },
                {
                    id: 16,
                    name: 'Chicken Shawarma (Jumbo)',
                    description: 'Extra large chicken shawarma',
                    price: 4000,
                    category: 'shawarma'
                },
                {
                    id: 17,
                    name: 'Beef Shawarma',
                    description: 'Beef shawarma wrap',
                    price: 2800,
                    category: 'shawarma'
                },
                {
                    id: 18,
                    name: 'Parfait',
                    description: 'Delicious parfait dessert',
                    price: 2800,
                    category: 'desserts'
                },
                {
                    id: 19,
                    name: 'Big Fura',
                    description: 'Traditional fura drink (large)',
                    price: 3000,
                    category: 'drinks'
                },
                {
                    id: 20,
                    name: 'Small Fura',
                    description: 'Traditional fura drink (small)',
                    price: 2500,
                    category: 'drinks'
                },
                {
                    id: 21,
                    name: 'Indomie with Egg',
                    description: 'Indomie noodles with egg',
                    price: 3000,
                    category: 'noodles'
                },
                {
                    id: 22,
                    name: 'Jam Doughnut',
                    description: 'Doughnut with jam filling',
                    price: 700,
                    category: 'pastries'
                },
                {
                    id: 23,
                    name: 'Meat Pie',
                    description: 'Flaky pastry with meat filling',
                    price: 800,
                    category: 'pastries'
                },
                {
                    id: 24,
                    name: 'Chicken Pie',
                    description: 'Flaky pastry with chicken filling',
                    price: 1000,
                    category: 'pastries'
                },
                {
                    id: 25,
                    name: 'Doughnut',
                    description: 'Classic doughnut',
                    price: 500,
                    category: 'pastries'
                },
                {
                    id: 26,
                    name: 'Bake Fish Roll',
                    description: 'Baked fish roll',
                    price: 400,
                    category: 'pastries'
                },
                {
                    id: 27,
                    name: 'Egg Roll',
                    description: 'Egg roll pastry',
                    price: 700,
                    category: 'pastries'
                },
                {
                    id: 28,
                    name: 'Zobo',
                    description: 'Hibiscus drink',
                    price: 1000,
                    category: 'drinks'
                },
                {
                    id: 29,
                    name: 'Yogurt',
                    description: 'Fresh yogurt',
                    price: 2500,
                    category: 'drinks'
                },
                {
                    id: 30,
                    name: 'Tiger Nut',
                    description: 'Tiger nut milk drink',
                    price: 1500,
                    category: 'drinks'
                },
                {
                    id: 31,
                    name: 'Ice Cream (250ml)',
                    description: 'Ice cream in 250ml container',
                    price: 1100,
                    category: 'ice-cream'
                },
                {
                    id: 32,
                    name: 'Ice Cream (500ml)',
                    description: 'Ice cream in 500ml container',
                    price: 2200,
                    category: 'ice-cream'
                },
                {
                    id: 33,
                    name: 'Ice Cream (1 Liter)',
                    description: 'Ice cream in 1 liter container',
                    price: 4000,
                    category: 'ice-cream'
                }
            ]
        },
        'beiroot-restaurant': {
            name: 'Beiroot Restaurant',
            tagline: 'Premium Sandwiches & Wraps',
            location: 'Tanke, Near Alhikmah University',
            deliveryTime: '35-50 minutes',
            hours: '9:00 AM - 11:00 PM',
            badges: ['🏆 Certified', '🥪 Premium', '⚡ Fast', '🎓 Student Favorite'],
            menu: [
                {
                    id: 34,
                    name: 'Small Beiroot Sandwich',
                    description: 'Small sized sandwich',
                    price: 1700,
                    category: 'sandwiches'
                },
                {
                    id: 35,
                    name: 'Large Beiroot Sandwich',
                    description: 'Large sized sandwich',
                    price: 2100,
                    category: 'sandwiches'
                },
                {
                    id: 36,
                    name: 'Medium Chicken/Beef Sandwich',
                    description: 'Medium sandwich with chicken or beef',
                    price: 2700,
                    category: 'sandwiches'
                },
                {
                    id: 37,
                    name: 'Large Chicken/Beef Sandwich',
                    description: 'Large sandwich with chicken or beef',
                    price: 3100,
                    category: 'sandwiches'
                },
                {
                    id: 38,
                    name: 'Beiroot Bomb Sandwich',
                    description: 'Special bomb sandwich',
                    price: 3900,
                    category: 'sandwiches'
                },
                {
                    id: 39,
                    name: 'Beiroot Loaded Fries',
                    description: 'Fries loaded with toppings',
                    price: 3500,
                    category: 'loaded-fries'
                },
                {
                    id: 40,
                    name: 'Chicken/Beef Loaded Fries (Regular)',
                    description: 'Regular loaded fries with chicken or beef',
                    price: 3600,
                    category: 'loaded-fries'
                },
                {
                    id: 41,
                    name: 'Chicken/Beef Loaded Fries (Large)',
                    description: 'Large loaded fries with chicken or beef',
                    price: 5000,
                    category: 'loaded-fries'
                },
                {
                    id: 42,
                    name: 'Fully Loaded Fries (Regular)',
                    description: 'Regular fully loaded fries',
                    price: 5500,
                    category: 'loaded-fries'
                },
                {
                    id: 43,
                    name: 'Fully Loaded Fries (Large)',
                    description: 'Large fully loaded fries',
                    price: 6900,
                    category: 'loaded-fries'
                },
                {
                    id: 44,
                    name: 'Sweet Beiroot Loaded Fries',
                    description: 'Sweet potato loaded fries',
                    price: 2800,
                    category: 'sweet-potatoes'
                },
                {
                    id: 45,
                    name: 'Sweet Chicken/Beef Loaded Fries (Regular)',
                    description: 'Regular sweet potato fries with chicken or beef',
                    price: 3600,
                    category: 'sweet-potatoes'
                },
                {
                    id: 46,
                    name: 'Sweet Chicken/Beef Loaded Fries (Large)',
                    description: 'Large sweet potato fries with chicken or beef',
                    price: 4400,
                    category: 'sweet-potatoes'
                },
                {
                    id: 47,
                    name: 'Sweet Fully Loaded Fries (Regular)',
                    description: 'Regular fully loaded sweet potato fries',
                    price: 4500,
                    category: 'sweet-potatoes'
                },
                {
                    id: 48,
                    name: 'Sweet Fully Loaded Fries (Large)',
                    description: 'Large fully loaded sweet potato fries',
                    price: 5500,
                    category: 'sweet-potatoes'
                },
                {
                    id: 49,
                    name: 'Chicken Wrap/Shawarma (Regular)',
                    description: 'Regular chicken wrap/shawarma',
                    price: 3200,
                    category: 'wraps'
                },
                {
                    id: 50,
                    name: 'Chicken Wrap/Shawarma (Large)',
                    description: 'Large chicken wrap/shawarma',
                    price: 5200,
                    category: 'wraps'
                }
            ]
        }
    };
    
    return {
        id: restaurantId,
        ...restaurants[restaurantId]
    };
}

// Display restaurant information
function displayRestaurantInfo(restaurant) {
    // Update page title
    document.title = `${restaurant.name} - TapDosh`;
    
    // Update restaurant name
    const nameElement = document.getElementById('restaurantName');
    if (nameElement) nameElement.textContent = restaurant.name;
    
    // Update tagline
    const taglineElement = document.getElementById('restaurantTagline');
    if (taglineElement) taglineElement.textContent = restaurant.tagline;
    
    // Update location
    const locationElement = document.getElementById('restaurantLocation');
    if (locationElement) locationElement.textContent = restaurant.location;
    
    // Update hours
    const hoursElement = document.getElementById('restaurantHours');
    if (hoursElement) hoursElement.textContent = restaurant.hours;
    
    // Update delivery info
    const deliveryElement = document.getElementById('restaurantDelivery');
    if (deliveryElement) {
        deliveryElement.textContent = restaurant.deliveryTime;
    }
}

// Display restaurant menu
function displayRestaurantMenu(restaurant) {
    const menuContainer = document.getElementById('menuContainer');
    const categoriesContainer = document.getElementById('menuCategories');
    
    if (!menuContainer) return;
    
    // Get all unique categories
    const categories = [...new Set(restaurant.menu.map(item => item.category))];
    
    // Display category buttons
    if (categoriesContainer) {
        categoriesContainer.innerHTML = `
            <button class="category-btn active" data-category="all">All</button>
            ${categories.map(category => 
                `<button class="category-btn" data-category="${category}">
                    ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>`
            ).join('')}
        `;
        
        // Add event listeners to category buttons
        const categoryButtons = categoriesContainer.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter menu items
                const category = this.dataset.category;
                displayMenuItems(restaurant.menu, category);
            });
        });
    }
    
    // Display all menu items initially
    displayMenuItems(restaurant.menu, 'all');
}

// Display menu items with filtering
function displayMenuItems(menu, category) {
    const menuContainer = document.getElementById('menuContainer');
    if (!menuContainer) return;
    
    // Filter items by category
    const filteredItems = category === 'all' 
        ? menu 
        : menu.filter(item => item.category === category);
    
    // Display items
    menuContainer.innerHTML = filteredItems.map(item => {
        // Check if item is in cart
        const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
        const restaurantId = new URLSearchParams(window.location.search).get('id');
        const cartItem = cart.find(cartItem => 
            cartItem.id === item.id && cartItem.restaurant === restaurantId
        );
        const quantity = cartItem ? cartItem.quantity : 0;
        
        return `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-price">
                        ${formatPrice ? formatPrice(item.price) : `₦${item.price.toLocaleString('en-NG')}`}
                    </div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" onclick="updateMenuItemQuantity(${item.id}, ${quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn plus" onclick="updateMenuItemQuantity(${item.id}, ${quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="add-to-cart ${quantity > 0 ? 'added' : ''}" onclick="addMenuItemToCart(${item.id})">
                        <i class="fas fa-${quantity > 0 ? 'check' : 'cart-plus'}"></i>
                        ${quantity > 0 ? 'Added' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Add menu item to cart
function addMenuItemToCart(itemId) {
    const restaurantId = new URLSearchParams(window.location.search).get('id');
    const restaurant = getRestaurantData();
    
    if (!restaurant) return;
    
    // Find the item in the restaurant menu
    const item = restaurant.menu.find(menuItem => menuItem.id === itemId);
    
    if (item) {
        // Add to cart with quantity 1
        addToCart(item, restaurantId);
        
        // Update the display
        displayRestaurantMenu(restaurant);
    }
}

// Update menu item quantity
function updateMenuItemQuantity(itemId, newQuantity) {
    const restaurantId = new URLSearchParams(window.location.search).get('id');
    const restaurant = getRestaurantData();
    
    if (!restaurant) return;
    
    // Find the item in the restaurant menu
    const item = restaurant.menu.find(menuItem => menuItem.id === itemId);
    
    if (item) {
        if (newQuantity <= 0) {
            // Remove from cart
            removeFromCart(itemId, restaurantId);
        } else {
            // Update quantity in cart
            updateQuantity(itemId, restaurantId, newQuantity);
        }
        
        // Update the display
        displayRestaurantMenu(restaurant);
    }
}

// Initialize restaurant page
document.addEventListener('DOMContentLoaded', function() {
    // Get restaurant data
    const restaurant = getRestaurantData();
    
    if (restaurant) {
        // Display restaurant info
        displayRestaurantInfo(restaurant);
        
        // Display restaurant menu
        displayRestaurantMenu(restaurant);
        
        // Save restaurant to localStorage for cart page
        localStorage.setItem('tapdoshCurrentRestaurant', restaurant.id);
    }
});

// Export functions for use in HTML
window.addMenuItemToCart = addMenuItemToCart;
window.updateMenuItemQuantity = updateMenuItemQuantity;