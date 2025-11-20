// Store cart items
let cartItems = [];

// ===== LOGIN REQUIRED MODAL =====

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Hide login modal
function hideLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Check if user is logged in before adding to cart
function checkAuthBeforeAddToCart(name, price) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        addToCart(name, price);
    } else {
        showLoginModal();
    }
}

// Initialize modal functionality
function initLoginModal() {
    const closeBtn = document.querySelector('.close-modal');
    const continueBtn = document.querySelector('.continue-shopping');
    const modal = document.getElementById('login-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLoginModal);
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', hideLoginModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideLoginModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLoginModal();
        }
    });
}

// ===== CART FUNCTIONALITY =====

// Get UI elements
const cartIcon = document.querySelector('.cart-icon');
const cartPopup = document.getElementById('cart-popup');
const cartOrders = document.getElementById('cart-orders');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const totalQuantity = document.querySelector('.totalquantity');

// Render cart items in popup
function renderCart() {
    cartOrders.innerHTML = '';
    if (cartItems.length === 0) {
        cartOrders.innerHTML = '<li>No orders yet.</li>';
        document.getElementById('cart-total').textContent = '';
    } else {
        let total = 0;
        cartItems.forEach((item, idx) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.marginBottom = '10px';
            li.style.padding = '8px';
            li.style.backgroundColor = '#f9f9f9';
            li.style.borderRadius = '5px';

            const infoSpan = document.createElement('span');
            infoSpan.textContent = item.name + ' - ' + item.price;
            infoSpan.style.flex = '1';

            const minusBtn = document.createElement('button');
            minusBtn.textContent = '–';
            minusBtn.style.marginLeft = '15px';
            minusBtn.style.background = '#ff4c4c';
            minusBtn.style.color = '#fff';
            minusBtn.style.border = 'none';
            minusBtn.style.borderRadius = '4px';
            minusBtn.style.padding = '4px 8px';
            minusBtn.style.cursor = 'pointer';
            minusBtn.style.fontWeight = 'bold';
            minusBtn.onclick = (event) => {
                event.stopPropagation();  
                removeFromCart(idx);
            };

            li.appendChild(infoSpan);
            li.appendChild(minusBtn);
            cartOrders.appendChild(li);

            // Extract numeric part from price string
            const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            if (!isNaN(priceNumber)) total += priceNumber;
        });

        document.getElementById('cart-total').textContent = 'Total Amount: ' + total + ' ETB';
        document.getElementById('cart-total').style.marginTop = '15px';
        document.getElementById('cart-total').style.padding = '10px';
        document.getElementById('cart-total').style.backgroundColor = '#e9ecef';
        document.getElementById('cart-total').style.borderRadius = '5px';
        document.getElementById('cart-total').style.fontWeight = 'bold';
    }
    totalQuantity.textContent = cartItems.length;
}

// Add to cart
function addToCart(name, price) {
    cartItems.push({name, price});
    renderCart();
    
    // Show cart popup when item is added
    if (cartPopup) {
        cartPopup.style.display = 'block';
    }
}

// Remove from cart
function removeFromCart(idx) {
    cartItems.splice(idx, 1);
    renderCart();
}

// Initialize cart functionality
function initCart() {
    // Update all "Add To Cart" buttons
    const addToCartButtons = document.querySelectorAll('.catagories-card .btn-outline');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.catagories-card');
            const name = card.querySelector('h3').textContent.trim();
            const priceStrong = card.querySelector('p strong.etb').textContent.trim();
            const priceText = card.querySelector('p').childNodes[2] ? card.querySelector('p').childNodes[2].textContent.trim() : "";
            const price = priceStrong + " " + (priceText || "ETB");
            
            checkAuthBeforeAddToCart(name, price);
        });
    });

    // Cart popup events
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            if (cartPopup) {
                cartPopup.style.display = 'block';
                renderCart();
            }
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            if (cartPopup) {
                cartPopup.style.display = 'none';
            }
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', function(event) {
        if (cartPopup && cartIcon && !cartPopup.contains(event.target) && !cartIcon.contains(event.target)) {
            cartPopup.style.display = 'none';
        }
    });

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length === 0) {
                alert("Cart is empty!");
            } else {
                let orderMsg = "Order List:\n" + 
                    cartItems.map(item => `${item.name} - ${item.price}`).join('\n');
                let encodedMsg = encodeURIComponent(orderMsg);
                let tgLink = `https://t.me/alax6?text=${encodedMsg}`;
                window.location.href = tgLink;
                cartItems = [];
                renderCart();
                if (cartPopup) cartPopup.style.display = 'none';
            }
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====

function initSearch() {
    const searchInput = document.querySelector('.search-container input[type="text"]');
    const searchContainer = document.getElementById('search-container');

    if (!searchInput || !searchContainer) return;

    let suggestionsList = document.createElement('ul');
    suggestionsList.className = 'suggestions-list';
    searchContainer.appendChild(suggestionsList);

    const serviceHeadings = Array.from(document.querySelectorAll('.catagories-card h3'));
    const services = serviceHeadings.map(h3 => h3.textContent.trim());

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsList.innerHTML = '';

        if (!query) {
            suggestionsList.style.display = 'none';
            return;
        }

        const filtered = services.filter(service => service.toLowerCase().includes(query));

        if (filtered.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }

        filtered.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                searchInput.value = item;
                const targetId = item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                suggestionsList.style.display = 'none';
            });
            suggestionsList.appendChild(li);
        });

        suggestionsList.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });
}

// ===== USER AUTHENTICATION SYSTEM =====

function checkAuthStatus() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const profileSection = document.getElementById('profile-section');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (profileSection) {
            profileSection.style.display = 'flex';
            profileSection.style.alignItems = 'center';
            profileSection.style.gap = '10px';
        }
        if (userName) userName.textContent = currentUser.fullName;
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (signupLink) signupLink.style.display = 'inline';
        if (profileSection) profileSection.style.display = 'none';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            checkAuthStatus();
            alert('Logged out successfully!');
        });
    }
}

// ===== SECURITY =====

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function(event) {
    if (
        event.ctrlKey && (event.key === 'u' || event.key === 'U') ||
        event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i') ||
        event.key === 'F12'
    ) {
        event.preventDefault();
    }
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    
    // Initialize all systems
    initLoginModal();
    initCart();
    initSearch();
    checkAuthStatus();
    setupLogout();
    
    // Hide cart popup initially
    if (cartPopup) {
        cartPopup.style.display = 'none';
    }
    
    // Initial render
    renderCart();
    
    console.log('Application initialized successfully');
});

// End of code