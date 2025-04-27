document.addEventListener('DOMContentLoaded', function() {
  // Get wishlist from localStorage
  const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  const wishlistItems = document.getElementById('wishlist-items');
  const wishlistEmpty = document.getElementById('wishlist-empty');
  const wishlistCount = document.getElementById('wishlist-count');
  const moveAllToCart = document.getElementById('move-all-to-bag');
  
  console.log('Wishlist data:', wishlist);
  console.log('Products array:', products);
  
  // Update wishlist count
  wishlistCount.textContent = wishlist.length;
  
  // Show empty message if wishlist is empty
  if (wishlist.length === 0) {
    wishlistEmpty.style.display = 'block';
    moveAllToCart.style.display = 'none';
    return;
  }
  
  // Generate HTML for each wishlist item
  wishlist.forEach(index => {
    console.log('Processing index:', index, 'Product:', products[index]);
    
    // Make sure the product exists
    if (!products[index]) {
      console.error('Product not found for index:', index);
      return;
    }
    
    const product = products[index];
    
    // Calculate discount if available
    let originalPrice = '';
    let currentPrice = product.price;
    
    if (product.discount) {
      originalPrice = product.price;
      currentPrice = (parseFloat(product.price.replace('$', '')) * (1 - product.discount / 100)).toFixed(2);
      currentPrice = '$' + currentPrice;
    }
    
    const itemHTML = `
      <div class="wishlist-item" data-index="${index}">
        <div class="wishlist-item-image">
          <img src="${product.product_img}" alt="${product.product_name}" />
          <div class="wishlist-item-actions">
            <div class="action-btn remove-btn" onclick="removeFromWishlist(${index})">
              <i class="bi bi-x"></i>
            </div>
            <div class="action-btn quick-view-btn" onclick="quickView(${index})">
              <i class="bi bi-eye"></i>
            </div>
          </div>
        </div>
        <div class="wishlist-item-details">
          <div class="wishlist-item-category">${product.category}</div>
          <h3 class="wishlist-item-name">${product.product_name}</h3>
          <div class="wishlist-item-price">
            <span class="current-price">${currentPrice}</span>
            ${originalPrice ? `<span class="original-price">${originalPrice}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${index})">
            <i class="bi bi-cart"></i> Add To Cart
          </button>
        </div>
      </div>
    `;
    
    wishlistItems.insertAdjacentHTML('beforeend', itemHTML);
  });
  
  // Move all items to cart
  moveAllToCart.addEventListener('click', function() {
    wishlist.forEach(index => {
      addToCart(index);
    });
    
    // Clear wishlist
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    // Show notification
    showNotification('All items moved to cart!', 'success');
    
    // Reload the page
    setTimeout(() => {
      location.reload();
    }, 1500);
  });
  
  // Function to remove item from wishlist
  window.removeFromWishlist = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item !== index);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Dispatch event to update wishlist count in navbar
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    // Show notification
    showNotification('Product removed from wishlist!', 'info');
    
    // Remove item from DOM without page reload
    const itemElement = document.querySelector(`.wishlist-item[data-index="${index}"]`);
    if (itemElement) {
      itemElement.remove();
    }
    
    // Update wishlist count on page
    const wishlistCount = document.getElementById('wishlist-count');
    wishlistCount.textContent = wishlist.length;
    
    // Show empty message if wishlist is now empty
    if (wishlist.length === 0) {
      document.getElementById('wishlist-empty').style.display = 'block';
      document.getElementById('move-all-to-bag').style.display = 'none';
    }
  };
  
  // Function to show quick view modal
  window.quickView = function(index) {
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
            <p>${product.description}</p>
            <button onclick="addToCart(${index}); closeQuickView();">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };
  
  // Function to close quick view modal
  window.closeQuickView = function() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
      modal.remove();
    }
  };
  
  // Function to add product to cart
  window.addToCart = function(index) {
    // Get cart from localStorage
    let cart = localStorage.getItem('myitems') ? JSON.parse(localStorage.getItem('myitems')) : [];
    
    // Check if product is already in cart
    const isInCart = cart.some(item => item.id === index);
    
    if (!isInCart) {
      // Add product to cart
      cart.push({
        id: index,
        quantity: 1
      });
      
      // Save cart to localStorage
      localStorage.setItem('myitems', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show notification
      showNotification('Product added to cart!', 'success');
    } else {
      // Show notification
      showNotification('Product is already in cart!', 'info');
    }
  };
  
  // Function to show notification
  window.showNotification = function(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      </div>
      <div class="notification-message">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };
});