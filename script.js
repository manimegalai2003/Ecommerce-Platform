
        // Product data
        const products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 79.99,
                category: "electronics",
                description: "High-quality wireless headphones with noise cancellation",
                image: "🎧"
            },
            {
                id: 2,
                name: "Smart Watch",
                price: 199.99,
                category: "electronics",
                description: "Feature-rich smartwatch with fitness tracking",
                image: "⌚"
            },
            {
                id: 3,
                name: "Cotton T-Shirt",
                price: 24.99,
                category: "clothing",
                description: "Comfortable 100% cotton t-shirt",
                image: "👕"
            },
            {
                id: 4,
                name: "Coffee Maker",
                price: 89.99,
                category: "home",
                description: "Automatic coffee maker with timer",
                image: "☕"
            },
            {
                id: 5,
                name: "JavaScript Guide",
                price: 34.99,
                category: "books",
                description: "Complete guide to modern JavaScript",
                image: "📚"
            },
            {
                id: 6,
                name: "Bluetooth Speaker",
                price: 49.99,
                category: "electronics",
                description: "Portable speaker with excellent sound quality",
                image: "🔊"
            }
        ];

        // Cart and theme management
        let cart = [];
        let currentTheme = 1;
        const totalThemes = 5;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            setupSearch();
        });

        // Theme changing functionality (Interactive Button)
        function changeTheme() {
            currentTheme = currentTheme >= totalThemes ? 1 : currentTheme + 1;
            document.body.className = `theme-${currentTheme}`;
            showNotification(`Theme changed to Theme ${currentTheme}!`);
        }

        // Display products
        function displayProducts(productsToShow) {
            const container = document.getElementById('productsContainer');
            container.innerHTML = '';

            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">${product.image}</div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">₹${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                `;
                container.appendChild(productCard);
            });
        }

        // Filter products
        function filterProducts(category) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter and display products
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            displayProducts(filteredProducts);
        }

        // Search functionality
        function setupSearch() {
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
                displayProducts(filteredProducts);
            });
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }

            updateCartDisplay();
            showNotification(`${product.name} added to cart!`);
        }

        // Update cart display
        function updateCartDisplay() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            // Update cart modal content
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        $${item.price} each
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            cartTotal.textContent = total.toFixed(2);
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(cartItem => cartItem.id !== productId);
                }
                updateCartDisplay();
            }
        }

        // Toggle cart modal
        function toggleCart() {
            const modal = document.getElementById('cartModal');
            modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Checkout function
        function checkout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            
            showNotification('Thank you for your purchase! Order confirmed.');
            cart = [];
            updateCartDisplay();
            toggleCart();
        }

        // Initialize with theme 1
        document.body.className = 'theme-1';

