document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const dotsContainer = document.getElementById('dots');
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;
    
    // Create dots
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
    
    // Function to go to a specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    
    // Update slider position and active dot
    function updateSlider() {
      const slideWidth = slider.clientWidth;
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update active dot
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Auto slide
    function autoSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    }
    
    // Set interval for auto sliding
    const slideInterval = setInterval(autoSlide, 3000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume auto slide on mouse leave
    slider.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      setInterval(autoSlide, 3000);
    });
    
    // Initial update
    updateSlider();
  });