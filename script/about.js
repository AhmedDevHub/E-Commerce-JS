document.addEventListener("DOMContentLoaded", function () {
  const teamSlider = document.getElementById("team-slider");
  const prevBtn = document.getElementById("team-prev");
  const nextBtn = document.getElementById("team-next");
  const teamMembers = document.querySelectorAll(".team-member");

  // Duplicate items for infinite scroll effect
  teamMembers.forEach((item) => {
    const clone = item.cloneNode(true);
    teamSlider.appendChild(clone);
  });

  let allItems = document.querySelectorAll(".team-member");
  let currentPosition = 0;
  let itemWidth =
    teamMembers[0].offsetWidth +
    parseInt(getComputedStyle(teamMembers[0]).marginLeft) +
    parseInt(getComputedStyle(teamMembers[0]).marginRight);
  const originalItems = teamMembers.length;

  const getVisibleItems = () => {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const updateSliderPosition = () => {
    teamSlider.style.transition = "transform 0.5s ease";
    teamSlider.style.transform = `translateX(${
      -currentPosition * itemWidth
    }px)`;
  };

  const resetPosition = () => {
    teamSlider.style.transition = "none";
    teamSlider.style.transform = `translateX(${
      -currentPosition * itemWidth
    }px)`;
  };

  const moveNext = () => {
    currentPosition++;
    updateSliderPosition();
  };

  const movePrev = () => {
    currentPosition--;
    updateSliderPosition();
  };

  nextBtn.addEventListener("click", () => {
    moveNext();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    movePrev();
    restartAutoSlide();
  });

  // Handle infinite loop reset after transition
  teamSlider.addEventListener("transitionend", () => {
    const totalItems = allItems.length;
    if (currentPosition >= totalItems - getVisibleItems()) {
      teamSlider.style.transition = "none";
      currentPosition = currentPosition - originalItems;
      resetPosition();
    }
    if (currentPosition < 0) {
      teamSlider.style.transition = "none";
      currentPosition = currentPosition + originalItems;
      resetPosition();
    }
  });

  // Handle responsive resize
  window.addEventListener("resize", () => {
    itemWidth =
      teamMembers[0].offsetWidth +
      parseInt(getComputedStyle(teamMembers[0]).marginLeft) +
      parseInt(getComputedStyle(teamMembers[0]).marginRight);
    allItems = document.querySelectorAll(".team-member");
    const visibleItems = getVisibleItems();
    if (currentPosition > allItems.length - visibleItems) {
      currentPosition = allItems.length - visibleItems;
      resetPosition();
    }
  });

  // Add swipe support for mobile
  let startX = 0;
  teamSlider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  teamSlider.addEventListener("touchend", (e) => {
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

  // Add some CSS for the slider
  const style = document.createElement("style");
  style.textContent = `
        #team-slider-container {
            overflow: hidden;
            position: relative;
        }
        #team-slider {
            display: flex;
            transition: transform 0.5s ease;
        }
        .team-member {
            flex: 0 0 auto;
            text-align: center;
        }
        .nav-btn {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 0 5px;
        }
        .nav-btn:hover {
            background-color: #e74c3c;
            color: white;
            border-color: #e74c3c;
        }
    `;
  document.head.appendChild(style);
});
