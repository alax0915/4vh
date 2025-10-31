// Store cart items
let cartItems = [];

// Find all product cards
const productCards = document.querySelectorAll('.catagories-card');

// Add event listeners to "Add To Cart" buttons
productCards.forEach(card => {
  const addBtn = card.querySelector('.btn-outline');
  addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Get product name & price
    const name = card.querySelector('h3').textContent.trim();
    // Extract price text and value
    const priceStrong = card.querySelector('p strong.etb').textContent.trim();
    const priceText = card.querySelector('p').childNodes[2] ? card.querySelector('p').childNodes[2].textContent.trim() : "";
    const price = priceStrong + " " + (priceText || "ETB");
    addToCart(name, price);
  });
});

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
  } else {
    cartItems.forEach((item, idx) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      // Info
      const infoSpan = document.createElement('span');
      infoSpan.textContent = item.name + ' - ' + item.price;

      // Minus button
      const minusBtn = document.createElement('button');
      minusBtn.textContent = '–';
      minusBtn.style.marginLeft = '20px';
      minusBtn.style.background = '#ff4c4c';
      minusBtn.style.color = '#fff';
      minusBtn.style.border = 'none';
      minusBtn.style.borderRadius = '4px';
      minusBtn.style.padding = '4px 8px';
      minusBtn.style.cursor = 'pointer';
      minusBtn.onclick = (event) => {
       event.stopPropagation();  
        removeFromCart(idx);
};

      li.appendChild(infoSpan);
      li.appendChild(minusBtn);
      cartOrders.appendChild(li);
    });
  }
  totalQuantity.textContent = cartItems.length;
}

// Popup open/close logic
cartIcon.addEventListener('click', function() {
  cartPopup.style.display = 'block';
  renderCart();
});
closeCartBtn.addEventListener('click', function() {
  cartPopup.style.display = 'none';
});
document.addEventListener('click', function(event) {
  if (!cartPopup.contains(event.target) && !cartIcon.contains(event.target)) {
    cartPopup.style.display = 'none';
  }
});

// Add to cart
function addToCart(name, price) {
  cartItems.push({name, price});
  renderCart();
}

// Remove from cart
function removeFromCart(idx) {
  cartItems.splice(idx, 1);
  renderCart();
}

// Checkout logic - redirect to Telegram
checkoutBtn.addEventListener('click', function() {
  if (cartItems.length === 0) {
    alert("Cart is empty!");
  } else {
    // Format product names and prices for Telegram message
    let orderMsg = "Order List:\n" + 
      cartItems.map(item => `${item.name} - ${item.price}`).join('\n');
    // Encode for URL
    let encodedMsg = encodeURIComponent(orderMsg);
    // Telegram link (replace 'alax6' with your actual Telegram username)
    let tgLink = `https://t.me/alax6?text=${encodedMsg}`;
    // Redirect to Telegram chat/message
    window.location.href = tgLink;
    // Clear cart (optional, only after order)
    cartItems = [];
    renderCart();
    cartPopup.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input[type="text"], .search-container input[type="search"]');
  const searchContainer = document.getElementById('search-container');

  // Create suggestions dropdown element
  let suggestionsList = document.createElement('ul');
  suggestionsList.className = 'suggestions-list';
  searchContainer.appendChild(suggestionsList);

  // Extract service names from visible service headings
  const serviceHeadings = Array.from(document.querySelectorAll('.catagories-card h3'));
  const services = serviceHeadings.map(h3 => h3.textContent.trim());

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = '';

    if (!query) {
      suggestionsList.style.display = 'none';
      return;
    }

    // Filter matching services
    const filtered = services.filter(service => service.toLowerCase().includes(query));

    if (filtered.length === 0) {
      suggestionsList.style.display = 'none';
      return;
    }

    // Create suggestion list items
    filtered.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.addEventListener('click', () => {
        searchInput.value = item;

        // Scroll to corresponding card by ID
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

  // Hide suggestions on clicks outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      suggestionsList.style.display = 'none';
    }
  });
});


// Hide popup initially
cartPopup.style.display = 'none';

// Update cart on refresh/load
renderCart();
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

      const infoSpan = document.createElement('span');
      infoSpan.textContent = item.name + ' - ' + item.price;

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '–';
      minusBtn.style.marginLeft = '20px';
      minusBtn.style.background = '#ff4c4c';
      minusBtn.style.color = '#fff';
      minusBtn.style.border = 'none';
      minusBtn.style.borderRadius = '4px';
      minusBtn.style.padding = '4px 8px';
      minusBtn.style.cursor = 'pointer';
      minusBtn.onclick = () => {
        removeFromCart(idx);
      };

      li.appendChild(infoSpan);
      li.appendChild(minusBtn);
      cartOrders.appendChild(li);

      // Extract numeric part from price string (e.g. '400 ETB')
      const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      if (!isNaN(priceNumber)) total += priceNumber;
    });

    document.getElementById('cart-total').textContent = 'Total Amount: ' + total + ' ETB';
  }
  totalQuantity.textContent = cartItems.length;
}
// Disable right-click menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable some keyboard shortcuts (Ctrl+U, Ctrl+Shift+I, F12)
document.addEventListener('keydown', function(event) {
  if (
    event.ctrlKey && (event.key === 'u' || event.key === 'U') || // Ctrl + U (view-source)
    event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i') || // Ctrl + Shift + I (dev tools)
    event.key === 'F12' // F12 (dev tools)
  ) {
    event.preventDefault();
  }
});
// End of code
