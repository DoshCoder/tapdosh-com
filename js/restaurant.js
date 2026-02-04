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
    
    // Use the restaurant data from main.js (which should be loaded first)
    if (typeof restaurants !== 'undefined' && restaurants) {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        if (restaurant) {
            return {
                id: restaurantId,
                ...restaurant
            };
        }
    }
    
    // Fallback to individual restaurant data (from main.js)
    const fallbackRestaurants = {
        'olas-nutrition': {
            name: 'Olas Nutrition',
            tagline: 'Authentic Nigerian Cuisine',
            location: 'Opposite Alhikmah University, Ilorin',
            deliveryTime: '30-45 minutes',
            hours: '10:00 AM - 10:00 PM',
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
                    name: 'Masa (Pack of 5)',
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
            hours: '10:00 AM - 10:00 PM',
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
        // Additional restaurants from the updated list
        'abu-adamu-fruits': {
            name: 'Abu Adamu Fruits',
            tagline: 'Fresh Fruits & Juices',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '20-35 minutes',
            hours: '10:00 AM - 10:00 PM',
            badges: ['🏆 Certified', '🍊 Fresh', '🎓 Student Favorite', '🥤 Juice'],
            menu: [
                {
                    id: 700,
                    name: 'Small Orange (1 piece)',
                    description: 'Fresh small orange',
                    price: 100,
                    category: 'oranges'
                },
                {
                    id: 701,
                    name: 'Small Orange (6 pieces)',
                    description: 'Pack of 6 small oranges',
                    price: 500,
                    category: 'oranges'
                },
                {
                    id: 702,
                    name: 'Big Orange (1 piece)',
                    description: 'Fresh big orange',
                    price: 200,
                    category: 'oranges'
                },
                {
                    id: 703,
                    name: 'Big Orange (3 pieces)',
                    description: 'Pack of 3 big oranges',
                    price: 500,
                    category: 'oranges'
                },
                {
                    id: 704,
                    name: 'Pineapple (cut piece)',
                    description: 'Pineapple cut into small piece',
                    price: 200,
                    category: 'pineapple'
                },
                {
                    id: 705,
                    name: 'Complete Big Pineapple',
                    description: 'Whole big pineapple',
                    price: 4000,
                    category: 'pineapple'
                },
                {
                    id: 706,
                    name: 'Complete Medium Pineapple',
                    description: 'Whole medium pineapple',
                    price: 3000,
                    category: 'pineapple'
                },
                {
                    id: 707,
                    name: 'Banana (Small Pack)',
                    description: 'Small pack of bananas',
                    price: 500,
                    category: 'banana'
                },
                {
                    id: 708,
                    name: 'Banana (Medium Pack)',
                    description: 'Medium pack of bananas',
                    price: 1000,
                    category: 'banana'
                },
                {
                    id: 709,
                    name: 'Banana (Large Pack)',
                    description: 'Large pack of bananas',
                    price: 2000,
                    category: 'banana'
                },
                {
                    id: 710,
                    name: 'Banana (Extra Large Pack)',
                    description: 'Extra large pack of bananas',
                    price: 3500,
                    category: 'banana'
                },
                {
                    id: 711,
                    name: 'Agbalumo (per one)',
                    description: 'African star apple',
                    price: 100,
                    category: 'fruits'
                }
            ]
        },
        'cake-delight': {
            name: 'Cake Delight',
            tagline: 'Sweet Pastries & Cakes',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '25-40 minutes',
            hours: '10:00 AM - 5:00 PM',
            badges: ['🏆 Certified', '🍰 Sweet', '🎓 Student Favorite', '🥧 Pastry'],
            menu: [
                {
                    id: 800,
                    name: 'Meat Pie',
                    description: 'Flaky pastry with meat filling',
                    price: 700,
                    category: 'pastries'
                },
                {
                    id: 801,
                    name: 'Fish Roll',
                    description: 'Roll with fish filling',
                    price: 500,
                    category: 'pastries'
                },
                {
                    id: 802,
                    name: 'Doughnut',
                    description: 'Classic doughnut',
                    price: 300,
                    category: 'pastries'
                },
                {
                    id: 803,
                    name: 'Egg Roll',
                    description: 'Roll with egg filling',
                    price: 500,
                    category: 'pastries'
                },
                {
                    id: 804,
                    name: 'Bounce',
                    description: 'Sweet pastry bounce',
                    price: 100,
                    category: 'pastries'
                }
            ]
        },
        'crunch-express': {
            name: 'Crunch Express',
            tagline: 'Street Food & Quick Bites',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '30-45 minutes',
            hours: '10:00 AM - 10:00 PM',
            badges: ['🏆 Certified', '🌯 Wraps', '🎓 Student Favorite', '🍔 Burgers'],
            menu: [
                {
                    id: 900,
                    name: 'Shredded Chicken Pasta',
                    description: 'Pasta with shredded chicken',
                    price: 3999,
                    category: 'chow-street-meals'
                },
                {
                    id: 901,
                    name: 'Shredded Beef Pasta',
                    description: 'Pasta with shredded beef',
                    price: 3999,
                    category: 'chow-street-meals'
                },
                {
                    id: 902,
                    name: 'Native Pasta',
                    description: 'Pasta with native sauce',
                    price: 3999,
                    category: 'chow-street-meals'
                },
                {
                    id: 903,
                    name: 'Native Rice',
                    description: 'Rice with native sauce',
                    price: 3999,
                    category: 'chow-street-meals'
                },
                {
                    id: 904,
                    name: 'Chicken/Beef Shawarma (Regular)',
                    description: 'Regular shawarma wrap',
                    price: 3500,
                    category: 'burgs-wraps'
                },
                {
                    id: 905,
                    name: 'Chicken/Beef Shawarma (Large)',
                    description: 'Large shawarma wrap',
                    price: 4500,
                    category: 'burgs-wraps'
                },
                {
                    id: 906,
                    name: 'Chicken/Beef Sandwich',
                    description: 'Sandwich with chicken or beef',
                    price: 3000,
                    category: 'burgs-wraps'
                },
                {
                    id: 907,
                    name: 'Chicken/Beef Loaded Fries (Regular)',
                    description: 'Regular loaded fries',
                    price: 5999,
                    category: 'burgs-wraps'
                },
                {
                    id: 908,
                    name: 'Chicken/Beef Loaded Fries (Large)',
                    description: 'Large loaded fries',
                    price: 6999,
                    category: 'burgs-wraps'
                },
                {
                    id: 909,
                    name: 'Chicken & Chips',
                    description: 'Chicken with potato chips',
                    price: 6000,
                    category: 'burgs-wraps'
                },
                {
                    id: 910,
                    name: 'Chicken Pie',
                    description: 'Pie with chicken filling',
                    price: 850,
                    category: 'pastry-box'
                },
                {
                    id: 911,
                    name: 'Meat Pie',
                    description: 'Pie with meat filling',
                    price: 850,
                    category: 'pastry-box'
                },
                {
                    id: 912,
                    name: 'Sausage Roll',
                    description: 'Roll with sausage filling',
                    price: 650,
                    category: 'pastry-box'
                }
            ]
        },
        'fatimah-a-wara-gurasa': {
            name: 'Fatimah A\' Wara & Gurasa',
            tagline: 'Traditional Northern Delicacies',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '20-35 minutes',
            hours: '7:30 AM - 10:00 PM',
            badges: ['🏆 Certified', '🥛 Cheese', '🎓 Student Favorite', '🍞 Bread'],
            menu: [
                {
                    id: 1300,
                    name: 'Gurasa',
                    description: 'Northern style bread',
                    price: 300,
                    category: 'bread'
                },
                {
                    id: 1301,
                    name: 'Wara',
                    description: 'Local cheese',
                    price: 50,
                    category: 'cheese'
                }
            ],
            note: 'Note: Minimum purchase of ₦500 required'
        },
        'red-caffino': {
            name: 'Red Caffino Restaurant',
            tagline: 'Premium Dining Experience',
            location: 'Near Alhikmah University, Ilorin',
            deliveryTime: '45-60 minutes',
            hours: '12:00 PM - 5:00 PM',
            badges: ['🏆 Certified', '🍷 Premium', '🎓 Student Favorite', '🥂 Cocktails'],
            menu: [
                {
                    id: 1400,
                    name: 'Wine',
                    description: 'Premium wine',
                    price: 10000,
                    category: 'non-alcohol'
                },
                {
                    id: 1401,
                    name: 'Water',
                    description: 'Bottled water',
                    price: 500,
                    category: 'non-alcohol'
                },
                {
                    id: 1402,
                    name: 'Pet Drinks',
                    description: 'PET bottled drinks',
                    price: 700,
                    category: 'non-alcohol'
                },
                {
                    id: 1403,
                    name: 'Juice',
                    description: 'Fresh juice',
                    price: 3000,
                    category: 'non-alcohol'
                },
                {
                    id: 1404,
                    name: 'Energy Drinks',
                    description: 'Energy beverages',
                    price: 2000,
                    category: 'non-alcohol'
                },
                {
                    id: 1405,
                    name: 'Yogurt',
                    description: 'Fresh yogurt',
                    price: 3000,
                    category: 'non-alcohol'
                },
                {
                    id: 1406,
                    name: 'Banana Smoothie',
                    description: 'Banana smoothie',
                    price: 5000,
                    category: 'smoothie'
                },
                {
                    id: 1407,
                    name: 'Tropical Smoothie',
                    description: 'Tropical fruit smoothie',
                    price: 5000,
                    category: 'smoothie'
                },
                {
                    id: 1408,
                    name: 'Virgin Mojito',
                    description: 'Non-alcoholic mojito',
                    price: 5000,
                    category: 'mocktails'
                },
                {
                    id: 1409,
                    name: 'Grape-Pom-Paloma',
                    description: 'Grapefruit paloma mocktail',
                    price: 5000,
                    category: 'mocktails'
                },
                {
                    id: 1410,
                    name: 'Ginger Lemonade',
                    description: 'Ginger lemonade',
                    price: 5000,
                    category: 'mocktails'
                },
                {
                    id: 1411,
                    name: 'Redcaffino Mocktails',
                    description: 'Special mocktail',
                    price: 5000,
                    category: 'mocktails'
                }
            ]
        }
    };
    
    if (fallbackRestaurants[restaurantId]) {
        return {
            id: restaurantId,
            ...fallbackRestaurants[restaurantId]
        };
    }
    
    // If restaurant not found, redirect to home
    window.location.href = 'index.html';
    return null;
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
    
    // Update badges
    const badgesElement = document.querySelector('.restaurant-badges');
    if (badgesElement && restaurant.badges) {
        badgesElement.innerHTML = `
            <span class="badge certified">
                <i class="fas fa-award"></i> Certified
            </span>
            ${restaurant.badges.slice(1).map(badge => `
                <span class="badge">
                    ${badge.includes('🍗') ? '<i class="fas fa-drumstick-bite"></i>' : 
                      badge.includes('⚡') ? '<i class="fas fa-bolt"></i>' :
                      badge.includes('🎓') ? '<i class="fas fa-graduation-cap"></i>' :
                      badge.includes('🌙') ? '<i class="fas fa-moon"></i>' :
                      badge.includes('🍊') ? '<i class="fas fa-lemon"></i>' :
                      badge.includes('🥪') ? '<i class="fas fa-bread-slice"></i>' :
                      badge.includes('☕') ? '<i class="fas fa-coffee"></i>' :
                      badge.includes('🥘') ? '<i class="fas fa-utensils"></i>' :
                      badge.includes('🥛') ? '<i class="fas fa-wine-bottle"></i>' :
                      badge.includes('🥂') ? '<i class="fas fa-glass-cheers"></i>' :
                      badge.includes('🍷') ? '<i class="fas fa-wine-glass-alt"></i>' :
                      ''}
                    ${badge.replace(/[^\w\s]/g, '')}
                </span>
            `).join('')}
        `;
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
                    ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
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
    
    // Add restaurant note if exists
    if (restaurant.note) {
        const menuNote = document.querySelector('.menu-note');
        if (menuNote) {
            menuNote.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <p><strong>Note:</strong> ${restaurant.note}. All orders are processed via WhatsApp. Add items to cart and proceed to checkout.</p>
            `;
        }
    }
}

// Display menu items with filtering
function displayMenuItems(menu, category) {
    const menuContainer = document.getElementById('menuContainer');
    if (!menuContainer) return;
    
    // Filter items by category
    const filteredItems = category === 'all' 
        ? menu 
        : menu.filter(item => item.category === category);
    
    // Check if we have items to display
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = `
            <div class="menu-item" style="text-align: center; padding: 3rem;">
                <i class="fas fa-utensils" style="font-size: 3rem; color: var(--gray); margin-bottom: 1rem;"></i>
                <h3>No items in this category</h3>
                <p>Select a different category or browse all items</p>
            </div>
        `;
        return;
    }
    
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
    const restaurantId = new URLSearchParams(window.location.search).get('id');
    
    // Display items
    menuContainer.innerHTML = filteredItems.map(item => {
        // Check if item is in cart
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
        // Check for minimum purchase requirement (Fatimah A' Wara & Gurasa)
        if (restaurant.id === 'fatimah-a-wara-gurasa') {
            const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
            const currentCartTotal = cart.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
            
            // Check if adding this item would meet minimum requirement
            const newItemValue = item.price;
            
            if (currentCartTotal + newItemValue < 500) {
                showNotification(`Minimum purchase of ₦500 required for ${restaurant.name}. Add more items.`);
                return;
            }
        }
        
        // Add to cart with quantity 1
        if (typeof addToCart === 'function') {
            addToCart(item, restaurantId);
        } else {
            // Fallback to direct cart manipulation
            const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
            const existingItemIndex = cart.findIndex(cartItem => 
                cartItem.id === item.id && cartItem.restaurant === restaurantId
            );
            
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    ...item,
                    restaurant: restaurantId,
                    quantity: 1
                });
            }
            
            localStorage.setItem('tapdoshCart', JSON.stringify(cart));
            localStorage.setItem('tapdoshCurrentRestaurant', restaurantId);
            
            // Update cart count
            const cartCountElements = document.querySelectorAll('.cart-count');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElements.forEach(element => {
                element.textContent = totalItems;
            });
            
            // Show notification
            if (typeof showNotification === 'function') {
                showNotification(`${item.name} added to cart!`);
            }
        }
        
        // Update the display
        displayRestaurantMenu(restaurant);
        
        // Update cart count in restaurant page
        updateCartCountRestaurant();
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
        if (typeof updateQuantity === 'function') {
            if (newQuantity <= 0) {
                // Remove from cart
                removeFromCart(itemId, restaurantId);
            } else {
                // Update quantity in cart
                updateQuantity(itemId, restaurantId, newQuantity);
            }
        } else {
            // Fallback to direct cart manipulation
            const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
            const itemIndex = cart.findIndex(cartItem => 
                cartItem.id === itemId && cartItem.restaurant === restaurantId
            );
            
            if (itemIndex > -1) {
                if (newQuantity <= 0) {
                    cart.splice(itemIndex, 1);
                } else {
                    cart[itemIndex].quantity = newQuantity;
                }
                
                localStorage.setItem('tapdoshCart', JSON.stringify(cart));
                
                // Update cart count
                const cartCountElements = document.querySelectorAll('.cart-count');
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCountElements.forEach(element => {
                    element.textContent = totalItems;
                });
            }
        }
        
        // Update the display
        displayRestaurantMenu(restaurant);
        
        // Update cart count in restaurant page
        updateCartCountRestaurant();
    }
}

// Function to update cart count in restaurant page
function updateCartCountRestaurant() {
    const cart = JSON.parse(localStorage.getItem('tapdoshCart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cartCountRestaurant');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    // Also update navigation cart count
    const navCartElements = document.querySelectorAll('.cart-count');
    navCartElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Show notification function (fallback if not defined elsewhere)
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
        
        // Update cart count
        updateCartCountRestaurant();
    }
    
    // Update cart count initially
    updateCartCountRestaurant();
    
    // Listen for cart updates from other pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'tapdoshCart') {
            updateCartCountRestaurant();
            if (restaurant) {
                displayRestaurantMenu(restaurant);
            }
        }
    });
    
    // Initialize WhatsApp float if function exists
    if (typeof initWhatsAppFloat === 'function') {
        initWhatsAppFloat();
    }
});

// Export functions for use in HTML
window.addMenuItemToCart = addMenuItemToCart;
window.updateMenuItemQuantity = updateMenuItemQuantity;
window.updateCartCountRestaurant = updateCartCountRestaurant;
window.showNotification = showNotification;