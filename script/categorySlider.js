document.addEventListener('DOMContentLoaded', function() {
    const categorySlider = document.getElementById('category-slider');
    const prevBtn = document.getElementById('category-prev');
    const nextBtn = document.getElementById('category-next');
    const categoryItems = document.querySelectorAll('.category-item');
  
    // Duplicate items for infinite scroll effect
    categoryItems.forEach(item => {
      const clone = item.cloneNode(true);
      categorySlider.appendChild(clone);
    });
  
    let allItems = document.querySelectorAll('.category-item');
    let currentPosition = 0;
    let itemWidth = categoryItems[0].offsetWidth + 16;
    const originalItems = categoryItems.length;
  
    const getVisibleItems = () => {
      if (window.innerWidth >= 1200) return 6;
      if (window.innerWidth >= 992) return 5;
      if (window.innerWidth >= 768) return 4;
      if (window.innerWidth >= 576) return 3;
      return 2;
    };
  
    const updateSliderPosition = () => {
      categorySlider.style.transition = 'transform 0.5s ease';
      categorySlider.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
    };
  
    const resetPosition = () => {
      categorySlider.style.transition = 'none';
      categorySlider.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
    };
  
    const moveNext = () => {
      currentPosition++;
      updateSliderPosition();
    };
  
    const movePrev = () => {
      currentPosition--;
      updateSliderPosition();
    };
  
    nextBtn.addEventListener('click', () => {
      moveNext();
      restartAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
      movePrev();
      restartAutoSlide();
    });
  
    // Handle infinite loop reset after transition
    categorySlider.addEventListener('transitionend', () => {
      const totalItems = allItems.length;
      if (currentPosition >= totalItems - getVisibleItems()) {
        categorySlider.style.transition = 'none';
        currentPosition = currentPosition - originalItems;
        resetPosition();
      }
      if (currentPosition < 0) {
        categorySlider.style.transition = 'none';
        currentPosition = currentPosition + originalItems;
        resetPosition();
      }
    });
  
    // Handle responsive resize
    window.addEventListener('resize', () => {
      itemWidth = categoryItems[0].offsetWidth + 16;
      allItems = document.querySelectorAll('.category-item');
      const visibleItems = getVisibleItems();
      if (currentPosition > allItems.length - visibleItems) {
        currentPosition = allItems.length - visibleItems;
        resetPosition();
      }
    });
  
    // Make each category clickable
    allItems.forEach(item => {
      item.addEventListener('click', () => {
        const categoryName = item.querySelector('.category-name').textContent.trim();
        window.location.href = `product.html?category=${encodeURIComponent(categoryName.toLowerCase())}`;
      });
    });
  
    // Add swipe support for mobile
    let startX = 0;
    categorySlider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
  
    categorySlider.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        moveNext();
        restartAutoSlide();
      } else if (endX - startX > 50) {
        movePrev();
        restartAutoSlide();
      }
    });
  
    // Auto slide every 3 seconds
    let autoSlideInterval = setInterval(moveNext, 3000);
  
    function restartAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(moveNext, 3000);
    }
  });