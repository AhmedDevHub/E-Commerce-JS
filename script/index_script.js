let home_items = document.getElementById("home-items");

for (var x = 7; x < products.length; ++x) {
  // Calculate a random discount between 5% and 30% for some products
  const hasDiscount = Math.random() > 0.6;
  const discountPercentage = hasDiscount ? Math.floor(Math.random() * 25) + 5 : 0;
  
  // Calculate discounted price if applicable
  const originalPrice = parseFloat(products[x].price.replace('$', ''));
  const discountedPrice = hasDiscount ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2) : null;
  
  var item = `<div class="pro ${products[x].category}">
    ${hasDiscount ? `<div class="discount-badge">-${discountPercentage}%</div>` : ''}
    <div class="actions">
      <div class="action-btn wishlist-btn" onclick="addToWishlist(${x})">
        <i class="bi bi-heart"></i>
      </div>
      <div class="action-btn quick-view-btn" onclick="quickView(${x})">
        <i class="bi bi-eye"></i>
      </div>
    </div>
    <img onclick="location.href='sproduct.html?index=${x}'" src="${products[x].product_img}" alt="${products[x].product_name}" />
    <div class="des">
      <span>${products[x].category}</span>
      <h5 class="product-name">${products[x].product_name}</h5>
      <div class="star">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
      </div>
      <h4>
        ${hasDiscount ? 
          `<span style="text-decoration: line-through; color: #777; margin-right: 8px; font-size: 14px;">${products[x].price}</span>$${discountedPrice}` : 
          products[x].price}
      </h4>
    </div>
    <div class="add-to-cart" onclick="addToCart(${x})">
      <i class="bi bi-cart-plus"></i> Add to Cart
    </div>
  </div>`;

  home_items.insertAdjacentHTML("afterbegin", item);
}

// Function to add product to wishlist
function addToWishlist(index) {
  // Check if wishlist exists in localStorage
  let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

  // Check if product is already in wishlist
  const isInWishlist = wishlist.some(item => item === index);

  if (!isInWishlist) {
    wishlist.push(index);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Show success message
    showNotification('Product added to wishlist!', 'success');
  } else {
    // Remove from wishlist if already added
    wishlist = wishlist.filter(item => item !== index);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Show removal message
    showNotification('Product removed from wishlist!', 'info');
  }
  
  // Update wishlist count directly
  updateWishlistCountDirectly();
  
  // Dispatch event to update wishlist count in navbar
  window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: isInWishlist }));
}

// Function to update wishlist count directly without page refresh
function updateWishlistCountDirectly() {
  const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  const wishlistCountElements = document.querySelectorAll('.wishlist-count');
  const mobileWishlistCount = document.querySelector('.mobile-wishlist-count');
  
  // Update all wishlist count elements
  wishlistCountElements.forEach(element => {
    element.textContent = wishlist.length;
  });
  
  // Update mobile wishlist count
  if (mobileWishlistCount) {
    mobileWishlistCount.textContent = wishlist.length;
  }
}

// Function to show quick view modal
function quickView(index) {
  const product = products[index];
  
  // Create modal HTML
  const modalHTML = `
    <div class="quick-view-modal">
      <div class="quick-view-content">
        <div class="quick-view-close" onclick="closeQuickView()">×</div>
        <div class="quick-view-image">
          <img src="${product.product_img}" alt="${product.product_name}">
        </div>
        <div class="quick-view-details">
          <h3>${product.product_name}</h3>
          <div class="star">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star"></i>
          </div>
          <h4>${product.price}</h4>
          <p>${product.description || 'No description available'}</p>
          <button class="quick-view-btn" onclick="addToCart(${index}); closeQuickView();">Add to Cart</button>
          <button class="quick-view-details-btn" onclick="location.href='sproduct.html?index=${index}'">View Details</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Function to close quick view modal
function closeQuickView() {
  const modal = document.querySelector('.quick-view-modal');
  if (modal) {
    modal.remove();
  }
}

// Function to add product to cart
function addToCart(index) {
  // Check if cart exists in localStorage
  let cart = localStorage.getItem('myitems') ? JSON.parse(localStorage.getItem('myitems')) : [];
  
  // Add product to cart
  cart.push(products[index]);
  localStorage.setItem('myitems', JSON.stringify(cart));
  
  // Update cart count in navbar
  updateCartCount();
  
  // Show success message
  showNotification('Product added to cart!', 'success');
}

// Function to update cart count in navbar
function updateCartCount() {
  const cart = localStorage.getItem('myitems') ? JSON.parse(localStorage.getItem('myitems')) : [];
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Function to show notification
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
