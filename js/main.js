// Main JavaScript for TapDosh

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeToggle) {
        // Check for saved theme preference or use default
        const savedTheme = localStorage.getItem('tapdoshTheme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            if (themeIcon) {
                if (isDarkMode) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
            
            // Save preference to localStorage
            localStorage.setItem('tapdoshTheme', isDarkMode ? 'dark' : 'light');
        });
    }
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Update cart count on all pages
    updateCartCount();
    
    // Load restaurants data
    loadRestaurants();
    
    // Initialize WhatsApp float behavior
    if (typeof initWhatsAppFloat === 'function') {
        initWhatsAppFloat();
    }
});

// Restaurant Data
const restaurants = [
    {
        id: 'olas-nutrition',
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
    {
        id: 'k-bakes',
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
    {
        id: 'beiroot-ng',
        name: 'BEIROOT.NG',
        tagline: 'Premium Sandwiches & Wraps',
        location: 'Near Alhikmah University',
        deliveryTime: '35-50 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🥪 Premium', '⚡ Fast', '🎓 Student Favorite'],
        menu: [
            {
                id: 100,
                name: 'BEIROOT LOADED FRIES (Spicy Egg) - Mini Box',
                description: 'Irish potato loaded fries with spicy egg',
                price: 3200,
                category: 'loaded-fries'
            },
            {
                id: 101,
                name: 'Chicken/BEEF LOADED FRIES - Large',
                description: 'Large chicken or beef loaded fries',
                price: 5900,
                category: 'loaded-fries'
            },
            {
                id: 102,
                name: 'Chicken/BEEF LOADED FRIES - Regular',
                description: 'Regular chicken or beef loaded fries',
                price: 4900,
                category: 'loaded-fries'
            },
            {
                id: 103,
                name: 'Chicken/BEEF LOADED FRIES - Mini',
                description: 'Mini chicken or beef loaded fries',
                price: 3900,
                category: 'loaded-fries'
            },
            {
                id: 104,
                name: 'FULLY LOADED FRIES (Crispy Chicken + Shredded Beef) - Large',
                description: 'Large fully loaded fries with crispy chicken and shredded beef',
                price: 6900,
                category: 'loaded-fries'
            },
            {
                id: 105,
                name: 'FULLY LOADED FRIES (Crispy Chicken + Shredded Beef) - Regular',
                description: 'Regular fully loaded fries with crispy chicken and shredded beef',
                price: 5900,
                category: 'loaded-fries'
            },
            {
                id: 106,
                name: 'FULLY LOADED FRIES (Crispy Chicken + Shredded Beef) - Mini',
                description: 'Mini fully loaded fries with crispy chicken and shredded beef',
                price: 4900,
                category: 'loaded-fries'
            },
            {
                id: 107,
                name: 'SWEET CHICKEN or BEEF LOADED FRIES - Large',
                description: 'Large sweet potato loaded fries with chicken or beef',
                price: 5000,
                category: 'sweet-potatoes'
            },
            {
                id: 108,
                name: 'SWEET CHICKEN or BEEF LOADED FRIES - Regular',
                description: 'Regular sweet potato loaded fries with chicken or beef',
                price: 4200,
                category: 'sweet-potatoes'
            },
            {
                id: 109,
                name: 'SWEET CHICKEN or BEEF LOADED FRIES - Mini',
                description: 'Mini sweet potato loaded fries with chicken or beef',
                price: 3500,
                category: 'sweet-potatoes'
            },
            {
                id: 110,
                name: 'SWEET FULLY LOADED (Crispy Chicken + Shredded Beef) - Large',
                description: 'Large sweet fully loaded fries with crispy chicken and shredded beef',
                price: 6000,
                category: 'sweet-potatoes'
            },
            {
                id: 111,
                name: 'SWEET FULLY LOADED (Crispy Chicken + Shredded Beef) - Regular',
                description: 'Regular sweet fully loaded fries with crispy chicken and shredded beef',
                price: 5200,
                category: 'sweet-potatoes'
            },
            {
                id: 112,
                name: 'SWEET FULLY LOADED (Crispy Chicken + Shredded Beef) - Mini',
                description: 'Mini sweet fully loaded fries with crispy chicken and shredded beef',
                price: 4500,
                category: 'sweet-potatoes'
            },
            {
                id: 113,
                name: 'SHAWARMA/CHICKEN WRAP - Regular',
                description: 'Regular chicken shawarma or wrap',
                price: 3500,
                category: 'wraps'
            },
            {
                id: 114,
                name: 'SHAWARMA/CHICKEN WRAP - Large',
                description: 'Large chicken shawarma or wrap',
                price: 5200,
                category: 'wraps'
            },
            {
                id: 115,
                name: 'Single Chicken Burger',
                description: 'Single chicken burger',
                price: 3800,
                category: 'burgers'
            },
            {
                id: 116,
                name: 'Single Chicken Cheese Burger',
                description: 'Single chicken burger with cheese',
                price: 4500,
                category: 'burgers'
            },
            {
                id: 117,
                name: 'Bigback Burger',
                description: 'Bigback burger',
                price: 5600,
                category: 'burgers'
            },
            {
                id: 118,
                name: 'Bigback with Cheese Burger',
                description: 'Bigback burger with cheese',
                price: 6200,
                category: 'burgers'
            },
            {
                id: 119,
                name: 'Beiroot Bomb Sandwich (Chicken + Beef)',
                description: 'Sub sandwich with chicken and beef',
                price: 4000,
                category: 'sandwiches'
            },
            {
                id: 120,
                name: 'Large Chicken/Beef Sandwich',
                description: 'Large chicken or beef sandwich',
                price: 3500,
                category: 'sandwiches'
            },
            {
                id: 121,
                name: 'Medium Chicken/Beef Sandwich',
                description: 'Medium chicken or beef sandwich',
                price: 3000,
                category: 'sandwiches'
            },
            {
                id: 122,
                name: 'Beiroot Sandwich (Spicy Egg)',
                description: 'Sandwich with spicy egg',
                price: 2400,
                category: 'sandwiches'
            },
            {
                id: 123,
                name: 'Crispy Chicken Tenders',
                description: 'Crispy chicken tenders',
                price: 3800,
                category: 'sides'
            },
            {
                id: 124,
                name: 'Fries',
                description: 'French fries',
                price: 2800,
                category: 'sides'
            }
        ]
    },
    {
        id: 'sherrif-mai-shayi',
        name: 'Sherrif Mai Shayi',
        tagline: 'Tea, Bread & Indomie Specialist',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '20-35 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🌙 Late Night', '🎓 Student Favorite', '☕ Tea'],
        menu: [
            {
                id: 51,
                name: 'Small Indomie',
                description: 'Small portion of indomie noodles',
                price: 400,
                category: 'indomie'
            },
            {
                id: 52,
                name: 'Big Indomie',
                description: 'Large portion of indomie noodles',
                price: 600,
                category: 'indomie'
            },
            {
                id: 53,
                name: 'Egg',
                description: 'Fried or boiled egg',
                price: 300,
                category: 'extras'
            },
            {
                id: 54,
                name: 'Medium Size Bread & Egg',
                description: 'Medium bread with egg',
                price: 1000,
                category: 'bread-egg'
            },
            {
                id: 55,
                name: 'Big Size Bread & Egg',
                description: 'Large bread with egg',
                price: 1200,
                category: 'bread-egg'
            },
            {
                id: 56,
                name: 'Small Size Bread & Egg',
                description: 'Small bread with egg',
                price: 700,
                category: 'bread-egg'
            }
        ]
    },
    {
        id: 'parfait-stop',
        name: 'ParfaitStop',
        tagline: 'A moment of best treat',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '25-40 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🍧 Dessert', '🎓 Student Favorite', '🥛 Yogurt'],
        menu: [
            {
                id: 200,
                name: 'Parfait - Pop',
                description: 'Small parfait dessert',
                price: 2900,
                category: 'parfait'
            },
            {
                id: 201,
                name: 'Parfait - Mini',
                description: 'Mini parfait dessert',
                price: 4100,
                category: 'parfait'
            },
            {
                id: 202,
                name: 'Parfait - Midi',
                description: 'Medium parfait dessert',
                price: 5100,
                category: 'parfait'
            },
            {
                id: 203,
                name: 'Parfait - Maxi',
                description: 'Large parfait dessert',
                price: 11200,
                category: 'parfait'
            },
            {
                id: 204,
                name: 'Milky Yogurt - 500ml',
                description: '500ml milky yogurt',
                price: 3000,
                category: 'yogurt'
            },
            {
                id: 205,
                name: 'Milky Yogurt - 1 Litre',
                description: '1 litre milky yogurt',
                price: 6000,
                category: 'yogurt'
            },
            {
                id: 206,
                name: 'Milky Yogurt - 4 Litres',
                description: '4 litres milky yogurt',
                price: 23500,
                category: 'yogurt'
            },
            {
                id: 207,
                name: 'Greek Yogurt - 500ml',
                description: '500ml greek yogurt',
                price: 5000,
                category: 'yogurt'
            },
            {
                id: 208,
                name: 'Greek Yogurt - 1 Litre',
                description: '1 litre greek yogurt',
                price: 9800,
                category: 'yogurt'
            }
        ]
    },
    {
        id: 'item7-restaurant',
        name: 'Item7 Restaurant',
        tagline: 'Quality Meals & Shawarma',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '30-45 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🍗 Chicken', '🥩 Beef', '🎓 Student Favorite'],
        menu: [
            {
                id: 300,
                name: 'A Plate with Chicken',
                description: 'Complete meal plate with chicken',
                price: 3000,
                category: 'plates'
            },
            {
                id: 301,
                name: 'A Plate with Beef',
                description: 'Complete meal plate with beef',
                price: 2000,
                category: 'plates'
            },
            {
                id: 302,
                name: 'A Plate with Fish',
                description: 'Complete meal plate with fish',
                price: 2800,
                category: 'plates'
            },
            {
                id: 303,
                name: 'A Plate with Croaker Fish',
                description: 'Complete meal plate with croaker fish',
                price: 3800,
                category: 'plates'
            },
            {
                id: 304,
                name: 'Extra Chicken',
                description: 'Additional chicken serving',
                price: 1500,
                category: 'extras'
            },
            {
                id: 305,
                name: 'Extra Rice',
                description: 'Additional rice serving',
                price: 700,
                category: 'extras'
            },
            {
                id: 306,
                name: 'Extra Plantain',
                description: 'Additional plantain serving',
                price: 300,
                category: 'extras'
            },
            {
                id: 307,
                name: 'Extra Fish',
                description: 'Additional fish serving',
                price: 1000,
                category: 'extras'
            },
            {
                id: 308,
                name: 'Croaker Fish',
                description: 'Croaker fish serving',
                price: 2000,
                category: 'extras'
            },
            {
                id: 309,
                name: 'Extra Beef',
                description: 'Additional beef serving',
                price: 200,
                category: 'extras'
            },
            {
                id: 310,
                name: 'Beef Shawarma',
                description: 'Beef shawarma wrap',
                price: 2800,
                category: 'desserts'
            },
            {
                id: 311,
                name: 'Chicken Shawarma',
                description: 'Chicken shawarma wrap',
                price: 3000,
                category: 'desserts'
            },
            {
                id: 312,
                name: 'Coleslaw',
                description: 'Fresh coleslaw salad',
                price: 500,
                category: 'desserts'
            }
        ]
    },
    {
        id: 'sesede-food',
        name: 'Sesede Food Restaurant',
        tagline: 'Traditional Nigerian Swallows',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '25-40 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🥘 Traditional', '🎓 Student Favorite', '🍲 Soup'],
        menu: [
            {
                id: 400,
                name: 'Eba (Per Wrap)',
                description: 'Cassava flour swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 401,
                name: 'Semo (Per Wrap)',
                description: 'Semolina swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 402,
                name: 'Amala (Per Wrap)',
                description: 'Yam flour swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 403,
                name: 'Iyan (Per Wrap)',
                description: 'Pounded yam swallow',
                price: 300,
                category: 'swallows'
            },
            {
                id: 404,
                name: 'Wara (Per Piece)',
                description: 'Local cheese',
                price: 500,
                category: 'proteins'
            },
            {
                id: 405,
                name: 'Beef (Per Piece)',
                description: 'Beef protein',
                price: 200,
                category: 'proteins'
            },
            {
                id: 406,
                name: 'Ponmo (Per Piece)',
                description: 'Cow skin protein',
                price: 200,
                category: 'proteins'
            },
            {
                id: 407,
                name: 'Egusi Soup',
                description: 'Melon seed soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 408,
                name: 'Ewedu Soup',
                description: 'Jute leaf soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 409,
                name: 'Gbegiri Soup',
                description: 'Bean soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 410,
                name: 'Abula (Ewedu & Gbegiri)',
                description: 'Combination of ewedu and gbegiri soup',
                price: 0.00,
                category: 'soups'
            }
        ]
    },
    {
        id: 'mac-dee',
        name: 'MAC-DEE',
        tagline: 'Multi-Cuisine Restaurant',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '40-60 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🍔 Burgers', '🎓 Student Favorite', '🌙 Late Night'],
        menu: [
            {
                id: 500,
                name: 'Party Jollof/Fried Rice with Chicken',
                description: 'Party rice with chicken',
                price: 3000,
                category: 'rice'
            },
            {
                id: 501,
                name: 'Party Jollof/Fried Rice with Beef',
                description: 'Party rice with beef',
                price: 2800,
                category: 'rice'
            },
            {
                id: 502,
                name: 'Party Jollof/Fried Rice with Turkey',
                description: 'Party rice with turkey',
                price: 6000,
                category: 'rice'
            },
            {
                id: 503,
                name: 'Party Jollof/Fried Rice with Fish',
                description: 'Party rice with fish',
                price: 4000,
                category: 'rice'
            },
            {
                id: 504,
                name: 'Full Plate Rice/Beans (Chicken, Plantain, Egg Sauce)',
                description: 'Full plate of rice and beans with chicken',
                price: 5000,
                category: 'rice-beans'
            },
            {
                id: 505,
                name: 'Full Plate Rice/Beans (Beef, Plantain, Egg Sauce)',
                description: 'Full plate of rice and beans with beef',
                price: 4300,
                category: 'rice-beans'
            },
            {
                id: 506,
                name: 'Full Plate Rice/Beans (Fish, Egg Plantain Sauce)',
                description: 'Full plate of rice and beans with fish',
                price: 4500,
                category: 'rice-beans'
            },
            {
                id: 507,
                name: 'Essential Pasta (Chicken)',
                description: 'Basic pasta with chicken',
                price: 3000,
                category: 'pasta'
            },
            {
                id: 508,
                name: 'Royal Pasta (Chicken, Egg & Plantain)',
                description: 'Pasta with chicken, egg and plantain',
                price: 4000,
                category: 'pasta'
            },
            {
                id: 509,
                name: 'Supreme Pasta (Turkey, Plantain)',
                description: 'Pasta with turkey and plantain',
                price: 6000,
                category: 'pasta'
            },
            {
                id: 510,
                name: 'Deluxe Pasta (Fish, Plantain)',
                description: 'Pasta with fish and plantain',
                price: 4200,
                category: 'pasta'
            },
            {
                id: 511,
                name: 'Essential Noodles (Chicken)',
                description: 'Basic noodles with chicken',
                price: 2500,
                category: 'noodles'
            },
            {
                id: 512,
                name: 'Royal Noodles (Chicken, Egg & Plantain)',
                description: 'Noodles with chicken, egg and plantain',
                price: 3800,
                category: 'noodles'
            },
            {
                id: 513,
                name: 'Supreme Noodles (Turkey & Plantain)',
                description: 'Noodles with turkey and plantain',
                price: 5000,
                category: 'noodles'
            },
            {
                id: 514,
                name: 'Deluxe Noodles (Fish, Plantain)',
                description: 'Noodles with fish and plantain',
                price: 3000,
                category: 'noodles'
            },
            {
                id: 515,
                name: 'Extra Rice',
                description: 'Additional rice serving',
                price: 800,
                category: 'extras'
            },
            {
                id: 516,
                name: 'Extra Pasta',
                description: 'Additional pasta serving',
                price: 700,
                category: 'extras'
            },
            {
                id: 517,
                name: 'Extra Noodles',
                description: 'Additional noodles serving',
                price: 700,
                category: 'extras'
            },
            {
                id: 518,
                name: 'Extra Chicken',
                description: 'Additional chicken serving',
                price: 1500,
                category: 'extras'
            },
            {
                id: 519,
                name: 'Extra Turkey',
                description: 'Additional turkey serving',
                price: 3800,
                category: 'extras'
            },
            {
                id: 520,
                name: 'Extra Fish',
                description: 'Additional fish serving',
                price: 1700,
                category: 'extras'
            },
            {
                id: 521,
                name: 'Extra Plantain',
                description: 'Additional plantain serving',
                price: 500,
                category: 'extras'
            },
            {
                id: 522,
                name: 'Extra Egg',
                description: 'Additional egg serving',
                price: 400,
                category: 'extras'
            },
            {
                id: 523,
                name: 'Extra Coleslaw',
                description: 'Additional coleslaw serving',
                price: 500,
                category: 'extras'
            },
            {
                id: 524,
                name: 'Extra Sausage',
                description: 'Additional sausage serving',
                price: 400,
                category: 'extras'
            },
            {
                id: 525,
                name: 'Extra Pepper Sauce',
                description: 'Additional pepper sauce serving',
                price: 1000,
                category: 'extras'
            },
            {
                id: 526,
                name: 'Dee Club Sandwich (SS)',
                description: 'Small size club sandwich',
                price: 2000,
                category: 'sandwiches'
            },
            {
                id: 527,
                name: 'Dee Club Sandwich Chicken Mixed (SS)',
                description: 'Small size club sandwich with chicken mix',
                price: 3000,
                category: 'sandwiches'
            },
            {
                id: 528,
                name: 'Dee Club Sandwich Beef Mixed (SS)',
                description: 'Small size club sandwich with beef mix',
                price: 3000,
                category: 'sandwiches'
            },
            {
                id: 529,
                name: 'Dee Club Sandwich (LS)',
                description: 'Large size club sandwich',
                price: 3000,
                category: 'sandwiches'
            },
            {
                id: 530,
                name: 'Dee Club Sandwich Chicken Mixed (LS)',
                description: 'Large size club sandwich with chicken mix',
                price: 4000,
                category: 'sandwiches'
            },
            {
                id: 531,
                name: 'Dee Club Sandwich Beef Mixed (LS)',
                description: 'Large size club sandwich with beef mix',
                price: 4000,
                category: 'sandwiches'
            },
            {
                id: 532,
                name: 'Dee Club Sandwich Chicken Beef Mixed (SS)',
                description: 'Small size club sandwich with chicken and beef mix',
                price: 4000,
                category: 'sandwiches'
            },
            {
                id: 533,
                name: 'Dee Club Sandwich Chicken Beef (LG)',
                description: 'Large size club sandwich with chicken and beef',
                price: 5000,
                category: 'sandwiches'
            },
            {
                id: 534,
                name: 'Chicken MAC-DEE (SS)',
                description: 'Small size chicken mac dee',
                price: 2000,
                category: 'mac-dee'
            },
            {
                id: 535,
                name: 'Beef MAC-DEE (SS)',
                description: 'Small size beef mac dee',
                price: 2000,
                category: 'mac-dee'
            },
            {
                id: 536,
                name: 'Chicken Beef MAC-DEE (SS)',
                description: 'Small size chicken beef mac dee',
                price: 3000,
                category: 'mac-dee'
            },
            {
                id: 537,
                name: 'Chicken MAC-DEE (LS)',
                description: 'Large size chicken mac dee',
                price: 3000,
                category: 'mac-dee'
            },
            {
                id: 538,
                name: 'Beef MAC-DEE (LS)',
                description: 'Large size beef mac dee',
                price: 3000,
                category: 'mac-dee'
            },
            {
                id: 539,
                name: 'Chicken Beef MAC-DEE (LS)',
                description: 'Large size chicken beef mac dee',
                price: 4000,
                category: 'mac-dee'
            },
            {
                id: 540,
                name: 'Extra Chicken (Sandwich)',
                description: 'Additional chicken for sandwich',
                price: 1000,
                category: 'extras'
            },
            {
                id: 541,
                name: 'Extra Beef (Sandwich)',
                description: 'Additional beef for sandwich',
                price: 1000,
                category: 'extras'
            },
            {
                id: 542,
                name: 'Extra Sausage (Sandwich)',
                description: 'Additional sausage for sandwich',
                price: 400,
                category: 'extras'
            },
            {
                id: 543,
                name: 'Extra Dip',
                description: 'Additional dip',
                price: 800,
                category: 'extras'
            },
            {
                id: 544,
                name: 'Extra Cheese',
                description: 'Additional cheese',
                price: 1000,
                category: 'extras'
            },
            {
                id: 545,
                name: 'Extra Scrambled Egg',
                description: 'Additional scrambled egg',
                price: 500,
                category: 'extras'
            },
            {
                id: 546,
                name: 'Chicken Wrap/Shawarma',
                description: 'Chicken wrap or shawarma',
                price: 3500,
                category: 'wraps'
            },
            {
                id: 547,
                name: 'Beef Wrap',
                description: 'Beef wrap',
                price: 3000,
                category: 'wraps'
            },
            {
                id: 548,
                name: 'Double Decker Wrap',
                description: 'Double decker wrap',
                price: 5500,
                category: 'wraps'
            },
            {
                id: 549,
                name: 'Dee Loaded Fries (Irish Potato)',
                description: 'Loaded fries with irish potato',
                price: 4700,
                category: 'loaded-fries'
            },
            {
                id: 550,
                name: 'Dee Chicken Beef Loaded Fries (Irish Potato)',
                description: 'Loaded fries with chicken and beef (irish potato)',
                price: 6700,
                category: 'loaded-fries'
            },
            {
                id: 551,
                name: 'Extra Cheese Topping',
                description: 'Additional cheese topping',
                price: 2500,
                category: 'extras'
            },
            {
                id: 552,
                name: 'Dee Loaded Fries (Sweet Potato)',
                description: 'Loaded fries with sweet potato',
                price: 4500,
                category: 'loaded-fries'
            },
            {
                id: 553,
                name: 'Dee Chicken Beef Loaded Fries (Sweet Potato)',
                description: 'Loaded fries with chicken and beef (sweet potato)',
                price: 6500,
                category: 'loaded-fries'
            },
            {
                id: 554,
                name: 'Single Chicken Burger (No Cheese)',
                description: 'Single chicken burger without cheese',
                price: 4000,
                category: 'burgers'
            },
            {
                id: 555,
                name: 'Single Chicken Cheese Burger',
                description: 'Single chicken burger with cheese',
                price: 4500,
                category: 'burgers'
            },
            {
                id: 556,
                name: 'Double Decker Burger (No Cheese)',
                description: 'Double decker burger without cheese',
                price: 5000,
                category: 'burgers'
            },
            {
                id: 557,
                name: 'Double Decker Burger (Cheese)',
                description: 'Double decker burger with cheese',
                price: 5700,
                category: 'burgers'
            },
            {
                id: 558,
                name: 'Extra Dips (Burger)',
                description: 'Additional dips for burger',
                price: 500,
                category: 'extras'
            },
            {
                id: 559,
                name: 'Extra Tomato',
                description: 'Additional tomato',
                price: 100,
                category: 'extras'
            },
            {
                id: 560,
                name: 'Extra Tomato, Cucumber',
                description: 'Additional tomato and cucumber',
                price: 100,
                category: 'extras'
            },
            {
                id: 561,
                name: 'Extra Cheese (Burger)',
                description: 'Additional cheese for burger',
                price: 1000,
                category: 'extras'
            },
            {
                id: 562,
                name: 'Mini Pizza',
                description: 'Mini size pizza',
                price: 8500,
                category: 'pizza'
            },
            {
                id: 563,
                name: 'Large Pizza',
                description: 'Large size pizza',
                price: 12500,
                category: 'pizza'
            },
            {
                id: 564,
                name: 'Bole with Sauce',
                description: 'Roasted plantain with sauce',
                price: 2000,
                category: 'bole'
            },
            {
                id: 565,
                name: 'Bole Chicken Sauce',
                description: 'Roasted plantain with chicken sauce',
                price: 2700,
                category: 'bole'
            },
            {
                id: 566,
                name: 'Bole with Quarter Chicken Sauce',
                description: 'Roasted plantain with quarter chicken sauce',
                price: 3700,
                category: 'bole'
            },
            {
                id: 567,
                name: 'Bole with Half Chicken Sauce',
                description: 'Roasted plantain with half chicken sauce',
                price: 7000,
                category: 'bole'
            },
            {
                id: 568,
                name: 'Bole with Full Chicken Sauce',
                description: 'Roasted plantain with full chicken sauce',
                price: 14000,
                category: 'bole'
            },
            {
                id: 569,
                name: 'Bole with Fish Sauce',
                description: 'Roasted plantain with fish sauce',
                price: 4000,
                category: 'bole'
            },
            {
                id: 570,
                name: 'Extra Bole',
                description: 'Additional roasted plantain',
                price: 800,
                category: 'extras'
            },
            {
                id: 571,
                name: 'Full Chicken (Grilled)',
                description: 'Full grilled chicken',
                price: 12000,
                category: 'grilled'
            },
            {
                id: 572,
                name: 'Half Chicken (Grilled)',
                description: 'Half grilled chicken',
                price: 6000,
                category: 'grilled'
            },
            {
                id: 573,
                name: 'Quarter Chicken (Grilled)',
                description: 'Quarter grilled chicken',
                price: 3000,
                category: 'grilled'
            },
            {
                id: 574,
                name: 'Suya Stick',
                description: 'Grilled suya stick',
                price: 1000,
                category: 'grilled'
            },
            {
                id: 575,
                name: 'Guinea Fowl (Pre-order)',
                description: 'Grilled guinea fowl (requires pre-order)',
                price: 17000,
                category: 'grilled'
            },
            {
                id: 576,
                name: 'BBQ Tier 1',
                description: 'BBQ cat fish tier 1',
                price: 4000,
                category: 'bbq'
            },
            {
                id: 577,
                name: 'BBQ Tier 2',
                description: 'BBQ cat fish tier 2',
                price: 4500,
                category: 'bbq'
            },
            {
                id: 578,
                name: 'Chicken and Fries',
                description: 'Chicken with fries',
                price: 4000,
                category: 'bbq'
            },
            {
                id: 579,
                name: 'Egg and Fries',
                description: 'Egg with fries',
                price: 3000,
                category: 'bbq'
            },
            {
                id: 580,
                name: 'Plantain and Egg',
                description: 'Plantain with egg',
                price: 3000,
                category: 'bbq'
            },
            {
                id: 581,
                name: 'Full Fish PPS',
                description: 'Full fish pepper soup',
                price: 3500,
                category: 'pps'
            },
            {
                id: 582,
                name: 'Full Chicken PPS',
                description: 'Full chicken pepper soup',
                price: 15000,
                category: 'pps'
            },
            {
                id: 583,
                name: 'Half Chicken PPS',
                description: 'Half chicken pepper soup',
                price: 7500,
                category: 'pps'
            },
            {
                id: 584,
                name: 'Quarter Chicken PPS',
                description: 'Quarter chicken pepper soup',
                price: 4000,
                category: 'pps'
            },
            {
                id: 585,
                name: 'Fan Ice Sachet',
                description: 'Fan ice cream sachet',
                price: 600,
                category: 'ice-cream'
            },
            {
                id: 586,
                name: 'Fan Ice 120ml',
                description: '120ml fan ice cream',
                price: 800,
                category: 'ice-cream'
            },
            {
                id: 587,
                name: 'Fan Ice 250ml',
                description: '250ml fan ice cream',
                price: 1500,
                category: 'ice-cream'
            },
            {
                id: 588,
                name: 'Fan Ice 450ml',
                description: '450ml fan ice cream',
                price: 3000,
                category: 'ice-cream'
            },
            {
                id: 589,
                name: 'Fan Ice 900ml',
                description: '900ml fan ice cream',
                price: 5000,
                category: 'ice-cream'
            },
            {
                id: 590,
                name: 'Go Slo 320ml Fan Ice',
                description: '320ml go slo fan ice cream',
                price: 5500,
                category: 'ice-cream'
            },
            {
                id: 591,
                name: 'Go Slo 4mls Fan Ice',
                description: '4mls go slo fan ice cream',
                price: 6500,
                category: 'ice-cream'
            },
            {
                id: 592,
                name: 'Fan Yogo Bottle',
                description: 'Fan yogo drink bottle',
                price: 1000,
                category: 'ice-cream'
            },
            {
                id: 593,
                name: 'Yogurt Parfait Cup',
                description: 'Yogurt parfait in cup',
                price: 4000,
                category: 'parfait'
            },
            {
                id: 594,
                name: 'Yogurt Parfait Bowl',
                description: 'Yogurt parfait in bowl',
                price: 5500,
                category: 'parfait'
            }
        ]
    },
    {
        id: 'alhaja-habibat',
        name: 'Alhaja Habibat Restaurant',
        tagline: 'Traditional Nigerian Swallows',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '25-40 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🥘 Traditional', '🎓 Student Favorite', '🍲 Soup'],
        menu: [
            {
                id: 600,
                name: 'Eba (Per Wrap)',
                description: 'Cassava flour swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 601,
                name: 'Semo (Per Wrap)',
                description: 'Semolina swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 602,
                name: 'Amala (Per Wrap)',
                description: 'Yam flour swallow',
                price: 200,
                category: 'swallows'
            },
            {
                id: 603,
                name: 'Iyan (Per Wrap)',
                description: 'Pounded yam swallow',
                price: 300,
                category: 'swallows'
            },
            {
                id: 604,
                name: 'Wara (Per Piece)',
                description: 'Local cheese',
                price: 300,
                category: 'proteins'
            },
            {
                id: 605,
                name: 'Beef (Per Piece)',
                description: 'Beef protein',
                price: 200,
                category: 'proteins'
            },
            {
                id: 606,
                name: 'Ponmo (Per Piece)',
                description: 'Cow skin protein',
                price: 200,
                category: 'proteins'
            },
            {
                id: 607,
                name: 'Egusi Soup',
                description: 'Melon seed soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 608,
                name: 'Ewedu Soup',
                description: 'Jute leaf soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 609,
                name: 'Gbegiri Soup',
                description: 'Bean soup',
                price: 0.00,
                category: 'soups'
            },
            {
                id: 610,
                name: 'Abula (Ewedu & Gbegiri)',
                description: 'Combination of ewedu and gbegiri soup',
                price: 0.00,
                category: 'soups'
            }
        ]
    },
    {
        id: 'abu-adamu-fruits',
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
    {
        id: 'cake-delight',
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
    {
        id: 'crunch-express',
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
            },
            {
                id: 913,
                name: 'Plantain',
                description: 'Fried plantain',
                price: 500,
                category: 'extras'
            },
            {
                id: 914,
                name: 'Sausage',
                description: 'Grilled sausage',
                price: 500,
                category: 'extras'
            },
            {
                id: 915,
                name: 'Beef',
                description: 'Seasoned beef',
                price: 500,
                category: 'extras'
            },
            {
                id: 916,
                name: 'Coleslaw',
                description: 'Fresh coleslaw salad',
                price: 500,
                category: 'extras'
            },
            {
                id: 917,
                name: 'Egg',
                description: 'Fried or boiled egg',
                price: 500,
                category: 'extras'
            },
            {
                id: 918,
                name: 'Pasta Salad',
                description: 'Cold pasta salad',
                price: 800,
                category: 'extras'
            },
            {
                id: 919,
                name: 'Extra Fries',
                description: 'Additional potato fries',
                price: 500,
                category: 'extras'
            },
            {
                id: 920,
                name: 'Extra Cheese',
                description: 'Additional cheese',
                price: 1000,
                category: 'extras'
            },
            {
                id: 921,
                name: 'Gizdodo',
                description: 'Gizzard and plantain dish',
                price: 2000,
                category: 'extras'
            },
            {
                id: 922,
                name: 'Regular BBQ Chicken',
                description: 'Regular BBQ chicken',
                price: 1500,
                category: 'extras'
            },
            {
                id: 923,
                name: 'Quarter BBQ Chicken',
                description: 'Quarter BBQ chicken',
                price: 3000,
                category: 'extras'
            },
            {
                id: 924,
                name: 'Milkshakes',
                description: 'Chocolate, vanilla, or strawberry milkshake',
                price: 3000,
                category: 'beverages'
            },
            {
                id: 925,
                name: 'Banalmond Blend Smoothie',
                description: 'Banana almond smoothie',
                price: 3000,
                category: 'beverages'
            },
            {
                id: 926,
                name: 'Nutty Crush Smoothie',
                description: 'Nutty fruit smoothie',
                price: 3000,
                category: 'beverages'
            },
            {
                id: 927,
                name: 'Bottled Water',
                description: '500ml bottled water',
                price: 300,
                category: 'beverages'
            },
            {
                id: 928,
                name: 'Soft Drinks',
                description: 'Coke, Fanta, Sprite etc',
                price: 500,
                category: 'beverages'
            },
            {
                id: 929,
                name: 'Beggi Beggi Combo',
                description: 'Sandwich & smoothie',
                price: 5500,
                category: 'combo-deals'
            },
            {
                id: 930,
                name: 'Chop Life Combo',
                description: 'Sandwich & milkshake',
                price: 5500,
                category: 'combo-deals'
            },
            {
                id: 931,
                name: 'Sweet Tooth Combo',
                description: 'Shawarma & smoothie',
                price: 6000,
                category: 'combo-deals'
            },
            {
                id: 932,
                name: 'Only Me Combo',
                description: 'Shawarma & milkshake',
                price: 6000,
                category: 'combo-deals'
            },
            {
                id: 933,
                name: 'Belleful Combo',
                description: 'Pasta & milkshake',
                price: 6500,
                category: 'combo-deals'
            },
            {
                id: 934,
                name: 'Jaiye Pro Combo',
                description: 'Pasta, sandwich & milkshake',
                price: 9500,
                category: 'combo-deals'
            },
            {
                id: 935,
                name: 'Helichopter Combo',
                description: 'Pasta, sandwich & milkshake',
                price: 9500,
                category: 'combo-deals'
            },
            {
                id: 936,
                name: 'Jaiye Pro Max Combo',
                description: 'Pasta, shawarma, sandwich, milkshake & smoothie',
                price: 16000,
                category: 'combo-deals'
            }
        ]
    },
    {
        id: 'farmers-kitchen',
        name: 'The Farmer\'s Kitchen',
        tagline: 'Traditional Nigerian Dishes',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '25-40 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🥘 Traditional', '🎓 Student Favorite', '🍚 Rice'],
        menu: [
            {
                id: 1000,
                name: 'Yam & Egg Sauce',
                description: 'Boiled yam with egg sauce',
                price: 2000,
                category: 'breakfast'
            },
            {
                id: 1001,
                name: 'Noodles & Egg',
                description: 'Noodles with egg',
                price: 1500,
                category: 'breakfast'
            },
            {
                id: 1002,
                name: 'Spaghetti',
                description: 'Spaghetti with sauce',
                price: 1000,
                category: 'breakfast'
            },
            {
                id: 1003,
                name: 'Pap / Custard',
                description: 'Pap or custard porridge',
                price: 500,
                category: 'breakfast'
            },
            {
                id: 1004,
                name: 'Akara (per portion)',
                description: 'Bean cake',
                price: 300,
                category: 'breakfast'
            },
            {
                id: 1005,
                name: 'Bread & Egg',
                description: 'Bread with egg',
                price: 1000,
                category: 'breakfast'
            },
            {
                id: 1006,
                name: 'Jollof Rice',
                description: 'Spicy tomato rice',
                price: 400,
                category: 'rice-meals'
            },
            {
                id: 1007,
                name: 'Fried Rice',
                description: 'Vegetable fried rice',
                price: 400,
                category: 'rice-meals'
            },
            {
                id: 1008,
                name: 'White Rice',
                description: 'Plain white rice',
                price: 400,
                category: 'rice-meals'
            },
            {
                id: 1009,
                name: 'Rice & Beans',
                description: 'Rice mixed with beans',
                price: 400,
                category: 'rice-meals'
            },
            {
                id: 1010,
                name: 'Beans',
                description: 'Plain cooked beans',
                price: 700,
                category: 'beans-specials'
            },
            {
                id: 1011,
                name: 'Adalu (Beans & Maize)',
                description: 'Beans mixed with maize',
                price: 800,
                category: 'beans-specials'
            },
            {
                id: 1012,
                name: 'Egbo (White Corn)',
                description: 'White corn porridge',
                price: 600,
                category: 'beans-specials'
            },
            {
                id: 1013,
                name: 'Ekuru & Eko',
                description: 'Bean cake with corn pudding',
                price: 800,
                category: 'beans-specials'
            },
            {
                id: 1014,
                name: 'Eba',
                description: 'Cassava flour swallow',
                price: 200,
                category: 'swallow'
            },
            {
                id: 1015,
                name: 'Semo',
                description: 'Semolina swallow',
                price: 300,
                category: 'swallow'
            },
            {
                id: 1016,
                name: 'Tuwo',
                description: 'Rice flour swallow',
                price: 300,
                category: 'swallow'
            },
            {
                id: 1017,
                name: 'Ewedu Soup',
                description: 'Jute leaf soup',
                price: 0,
                category: 'soups'
            },
            {
                id: 1018,
                name: 'Okro Soup',
                description: 'Okra soup',
                price: 0,
                category: 'soups'
            },
            {
                id: 1019,
                name: 'Egusi Soup',
                description: 'Melon seed soup',
                price: 300,
                category: 'soups'
            },
            {
                id: 1020,
                name: 'Efo Riro',
                description: 'Vegetable soup',
                price: 300,
                category: 'soups'
            },
            {
                id: 1021,
                name: 'Gbegiri Soup',
                description: 'Bean soup',
                price: 300,
                category: 'soups'
            },
            {
                id: 1022,
                name: 'Beef',
                description: 'Beef protein',
                price: 500,
                category: 'proteins'
            },
            {
                id: 1023,
                name: 'Chicken',
                description: 'Chicken protein',
                price: 2000,
                category: 'proteins'
            },
            {
                id: 1024,
                name: 'Turkey',
                description: 'Turkey protein',
                price: 4000,
                category: 'proteins'
            },
            {
                id: 1025,
                name: 'Ponmo',
                description: 'Cow skin protein',
                price: 500,
                category: 'proteins'
            },
            {
                id: 1026,
                name: 'Panla Fish',
                description: 'Dried fish',
                price: 1000,
                category: 'proteins'
            },
            {
                id: 1027,
                name: 'Titus Fish',
                description: 'Titus fish',
                price: 2000,
                category: 'proteins'
            },
            {
                id: 1028,
                name: 'Croaker Fish',
                description: 'Croaker fish',
                price: 2000,
                category: 'proteins'
            },
            {
                id: 1029,
                name: 'Hake Fish',
                description: 'Hake fish',
                price: 2000,
                category: 'proteins'
            },
            {
                id: 1030,
                name: 'Wara (Fresh Cheese)',
                description: 'Local cheese',
                price: 500,
                category: 'proteins'
            },
            {
                id: 1031,
                name: 'Boiled Egg',
                description: 'Boiled egg',
                price: 300,
                category: 'proteins'
            },
            {
                id: 1032,
                name: 'Fried Plantain',
                description: 'Fried plantain slices',
                price: 100,
                category: 'sides'
            },
            {
                id: 1033,
                name: 'Diced Plantain',
                description: 'Diced fried plantain',
                price: 200,
                category: 'sides'
            },
            {
                id: 1034,
                name: 'Fried Yam',
                description: 'Fried yam slices',
                price: 500,
                category: 'sides'
            },
            {
                id: 1035,
                name: 'Fried Potatoes',
                description: 'Fried potato slices',
                price: 500,
                category: 'sides'
            },
            {
                id: 1036,
                name: 'Roasted Yam',
                description: 'Roasted yam',
                price: 500,
                category: 'sides'
            },
            {
                id: 1037,
                name: 'Bọ̀ọ̀lì & Sauce',
                description: 'Roasted plantain with sauce',
                price: 700,
                category: 'sides'
            },
            {
                id: 1038,
                name: 'Water',
                description: 'Bottled water',
                price: 200,
                category: 'drinks'
            },
            {
                id: 1039,
                name: 'Fura',
                description: 'Traditional millet drink',
                price: 3000,
                category: 'drinks'
            },
            {
                id: 1040,
                name: 'Zobo Drink',
                description: 'Hibiscus drink',
                price: 1500,
                category: 'drinks'
            },
            {
                id: 1041,
                name: 'Tiger Nut Drink (Kunu Aya)',
                description: 'Tiger nut milk',
                price: 3000,
                category: 'drinks'
            },
            {
                id: 1042,
                name: 'Ginger Drink',
                description: 'Ginger beverage',
                price: 2000,
                category: 'drinks'
            },
            {
                id: 1043,
                name: 'Chapman',
                description: 'Mixed fruit drink',
                price: 2000,
                category: 'drinks'
            }
        ]
    },
    {
        id: 'safianu-brahim-mai-shayi',
        name: 'Safianu Brahim Mai Shayi',
        tagline: 'Tea & Indomie Specialist',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '20-35 minutes',
        hours: '10:00 AM - 10:00 PM',
        badges: ['🏆 Certified', '🌙 Late Night', '🎓 Student Favorite', '☕ Tea'],
        menu: [
            {
                id: 1100,
                name: 'Big Noodles',
                description: 'Large portion of indomie noodles',
                price: 600,
                category: 'noodles'
            },
            {
                id: 1101,
                name: 'Small Indomie',
                description: 'Small portion of indomie noodles',
                price: 400,
                category: 'noodles'
            },
            {
                id: 1102,
                name: 'Egg',
                description: 'Fried or boiled egg',
                price: 300,
                category: 'extras'
            },
            {
                id: 1103,
                name: 'Medium Size Bread & Egg',
                description: 'Medium bread with egg',
                price: 1000,
                category: 'bread-egg'
            },
            {
                id: 1104,
                name: 'Big Size Bread & Egg',
                description: 'Large bread with egg',
                price: 1200,
                category: 'bread-egg'
            },
            {
                id: 1105,
                name: 'Small Size Bread & Egg',
                description: 'Small bread with egg',
                price: 700,
                category: 'bread-egg'
            }
        ]
    },
    {
        id: 'mummy-saoban',
        name: 'Mummy Saoban Restaurant',
        tagline: 'Home-style Nigerian Meals',
        location: 'Near Alhikmah University, Ilorin',
        deliveryTime: '25-40 minutes',
        hours: '8:00 AM - 7:00 PM',
        badges: ['🏆 Certified', '🏠 Homestyle', '🎓 Student Favorite', '🍚 Rice'],
        menu: [
            {
                id: 1200,
                name: 'Rice',
                description: 'Per portion',
                price: 500,
                category: 'rice'
            },
            {
                id: 1201,
                name: 'Beans',
                description: 'Per portion',
                price: 300,
                category: 'beans'
            },
            {
                id: 1202,
                name: 'Spaghetti',
                description: 'Per portion',
                price: 100,
                category: 'pasta'
            },
            {
                id: 1203,
                name: 'Wara',
                description: 'Local cheese',
                price: 200,
                category: 'proteins'
            },
            {
                id: 1204,
                name: 'Ponmo',
                description: 'Cow skin',
                price: 100,
                category: 'proteins'
            },
            {
                id: 1205,
                name: 'Beef',
                description: 'Beef protein',
                price: 200,
                category: 'proteins'
            },
            {
                id: 1206,
                name: 'Plantain (3 pieces)',
                description: 'Fried plantain',
                price: 100,
                category: 'sides'
            },
            {
                id: 1207,
                name: 'Egg',
                description: 'Fried or boiled egg',
                price: 300,
                category: 'proteins'
            },
            {
                id: 1208,
                name: 'Yam Porridge',
                description: 'Yam cooked in sauce',
                price: 500,
                category: 'yam'
            }
        ]
    },
    {
        id: 'fatimah-a-wara-gurasa',
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
    {
        id: 'red-caffino',
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
            },
            {
                id: 1412,
                name: 'Dirty Shirley',
                description: 'Cocktail drink',
                price: 8000,
                category: 'cocktails'
            },
            {
                id: 1413,
                name: 'Moscow',
                description: 'Moscow mule cocktail',
                price: 8000,
                category: 'cocktails'
            },
            {
                id: 1414,
                name: 'Margarita',
                description: 'Margarita cocktail',
                price: 8000,
                category: 'cocktails'
            },
            {
                id: 1415,
                name: 'Jollof Rice',
                description: 'Nigerian jollof rice',
                price: 3000,
                category: 'nigerian-cuisine'
            },
            {
                id: 1416,
                name: 'Nigerian Fried Rice',
                description: 'Nigerian style fried rice',
                price: 3000,
                category: 'nigerian-cuisine'
            },
            {
                id: 1417,
                name: 'Buka Rice',
                description: 'Local buka rice',
                price: 4000,
                category: 'nigerian-cuisine'
            },
            {
                id: 1418,
                name: 'Ofada Rice with Ayamase Sauce & Plantain',
                description: 'Ofada rice with sauce and plantain',
                price: 5000,
                category: 'nigerian-cuisine'
            },
            {
                id: 1419,
                name: 'Village Spaghetti',
                description: 'Local style spaghetti',
                price: 5000,
                category: 'nigerian-cuisine'
            },
            {
                id: 1420,
                name: 'Butterfly Prawns (per piece)',
                description: 'Butterfly cut prawns',
                price: 4000,
                category: 'proteins'
            },
            {
                id: 1421,
                name: 'Turkey',
                description: 'Turkey protein',
                price: 6000,
                category: 'proteins'
            },
            {
                id: 1422,
                name: 'Seafood Bowl',
                description: 'Snails, calamari & prawns',
                price: 15000,
                category: 'proteins'
            },
            {
                id: 1423,
                name: 'Honey Soy Chicken Wings (3 pieces)',
                description: 'Chicken wings in honey soy sauce',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1424,
                name: 'Crunchy Chill Snail (per piece)',
                description: 'Spicy crunchy snail',
                price: 4500,
                category: 'proteins'
            },
            {
                id: 1425,
                name: 'Hot n Spicy Chicken Wing (3 pieces)',
                description: 'Spicy chicken wings',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1426,
                name: 'Turkey Gizzard Stewed (3 pieces)',
                description: 'Stewed turkey gizzard',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1427,
                name: 'Peppered Pan-grilled Chicken',
                description: 'Grilled chicken with pepper',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1428,
                name: 'Whole Mackerel Fish',
                description: 'Whole mackerel fish',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1429,
                name: 'Tilapia in Tomato Sauce',
                description: 'Tilapia fish in tomato sauce',
                price: 5000,
                category: 'proteins'
            },
            {
                id: 1430,
                name: 'Arabian Tea',
                description: 'Traditional Arabian tea',
                price: 3000,
                category: 'tea'
            },
            {
                id: 1431,
                name: 'Watermelon Juice',
                description: 'Fresh watermelon juice',
                price: 3500,
                category: 'fresh-juice'
            },
            {
                id: 1432,
                name: 'Pineapple Juice',
                description: 'Fresh pineapple juice',
                price: 4000,
                category: 'fresh-juice'
            },
            {
                id: 1433,
                name: 'Pineapple & Ginger Juice',
                description: 'Pineapple with ginger juice',
                price: 4000,
                category: 'fresh-juice'
            },
            {
                id: 1434,
                name: 'Oreo Milkshake',
                description: 'Oreo cookie milkshake',
                price: 5000,
                category: 'milkshakes'
            },
            {
                id: 1435,
                name: 'Strawberry Milkshake',
                description: 'Strawberry milkshake',
                price: 5000,
                category: 'milkshakes'
            },
            {
                id: 1436,
                name: 'Vanilla Milkshake',
                description: 'Vanilla milkshake',
                price: 5000,
                category: 'milkshakes'
            },
            {
                id: 1437,
                name: 'Chicken Burger',
                description: 'Chicken burger',
                price: 4000,
                category: 'burgers-fries'
            },
            {
                id: 1438,
                name: 'Irish Potato Fries',
                description: 'Irish potato fries',
                price: 4000,
                category: 'burgers-fries'
            },
            {
                id: 1439,
                name: 'Redcaffino Potato Wedges',
                description: 'Special potato wedges',
                price: 4000,
                category: 'burgers-fries'
            },
            {
                id: 1440,
                name: 'Plantain Fries',
                description: 'Fried plantain',
                price: 2000,
                category: 'burgers-fries'
            },
            {
                id: 1441,
                name: 'Shawarma with Double Sausage',
                description: 'Shawarma with double sausage',
                price: 4000,
                category: 'burgers-fries'
            },
            {
                id: 1442,
                name: 'Loaded Fries',
                description: 'Loaded potato fries',
                price: 7000,
                category: 'burgers-fries'
            },
            {
                id: 1443,
                name: 'Goat Meat Pepper Soup',
                description: 'Pepper soup with goat meat',
                price: 5000,
                category: 'hot-soups'
            },
            {
                id: 1444,
                name: 'Catfish Pepper Soup (cut)',
                description: 'Pepper soup with catfish',
                price: 6000,
                category: 'hot-soups'
            },
            {
                id: 1445,
                name: 'Redcaffino Platter',
                description: 'Jollof rice, fried rice, potato wedges, plantain fries, stewed snail, stewed prawn, chicken skewers, shawarma, whole mackerel, 2 soft drinks',
                price: 40000,
                category: 'platters'
            },
            {
                id: 1446,
                name: 'Chinese Rice Singapore Noodles with Chicken/Beef Sauce',
                description: 'Singapore noodles with sauce',
                price: 10000,
                category: 'continental'
            },
            {
                id: 1447,
                name: 'Jambalaya Rice',
                description: 'Spicy rice dish',
                price: 5000,
                category: 'continental'
            },
            {
                id: 1448,
                name: 'Asian Style Fried Rice',
                description: 'Asian style fried rice',
                price: 5000,
                category: 'continental'
            },
            {
                id: 1449,
                name: 'Spicy Seafood Rice',
                description: 'Rice with spicy seafood',
                price: 6500,
                category: 'continental'
            },
            {
                id: 1450,
                name: 'Alfredo Lacreme Pasta',
                description: 'Creamy Alfredo pasta',
                price: 5000,
                category: 'continental'
            },
            {
                id: 1451,
                name: 'Italian Spaghetti',
                description: 'Italian style spaghetti',
                price: 5000,
                category: 'continental'
            },
            {
                id: 1452,
                name: 'Redcaffino Seafood Pasta',
                description: 'Seafood pasta special',
                price: 6500,
                category: 'continental'
            }
        ]
    }
];

// Load and display restaurants on home page
function loadRestaurants() {
    const restaurantsContainer = document.getElementById('restaurantsContainer');
    if (!restaurantsContainer) return;
    
    // Update the count in hero section
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements[0]) {
        statElements[0].textContent = restaurants.length;
    }
    
    restaurantsContainer.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card">
            <div class="restaurant-image">
                ${getRestaurantIcon(restaurant.name)}
            </div>
            <div class="restaurant-badges">
                ${restaurant.badges.map(badge => `<span class="badge certified">${badge}</span>`).join('')}
            </div>
            <div class="restaurant-content">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <p class="restaurant-tagline">${restaurant.tagline}</p>
                </div>
                
                <div class="restaurant-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="info-text">
                            ${restaurant.location}
                            <small>${restaurant.deliveryTime}</small>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div class="info-text">
                            ${restaurant.hours}
                            <small>Today's hours</small>
                        </div>
                    </div>
                </div>
                
                <div class="restaurant-actions">
                    <a href="restaurant.html?id=${restaurant.id}" class="btn btn-primary">
                        <i class="fas fa-utensils"></i> View Menu
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Get icon for restaurant
function getRestaurantIcon(name) {
    if (name.includes('Olas')) return '🍚';
    if (name.includes('K Bakes')) return '🍞';
    if (name.includes('BEIROOT')) return '🥪';
    if (name.includes('Sherrif') || name.includes('Safianu')) return '☕';
    if (name.includes('Parfait')) return '🍧';
    if (name.includes('Item7')) return '🍽️';
    if (name.includes('Sesede')) return '🥘';
    if (name.includes('MAC-DEE')) return '🍔';
    if (name.includes('Alhaja')) return '👑';
    if (name.includes('Abu Adamu')) return '🍊';
    if (name.includes('Cake Delight')) return '🍰';
    if (name.includes('Crunch Express')) return '🌯';
    if (name.includes('Farmer')) return '🌾';
    if (name.includes('Mummy Saoban')) return '🏠';
    if (name.includes('Fatimah')) return '🥛';
    if (name.includes('Red Caffino')) return '🥂';
    return '🍽️';
}

// Cart functions will be defined in cart.js
// They're available globally through window object