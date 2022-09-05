function slider({sliderSelector, slideSelector, btnPrevSlideSelector, btnNextSlideSelector, sliderWrapperSelector, slidesFieldSelector}) {
  const slides = document.querySelectorAll(slideSelector),
    slider = document.querySelector(sliderSelector),
    btnPrevSlide = document.querySelector(btnPrevSlideSelector),
    btnNextSlide = document.querySelector(btnNextSlideSelector),
    sliderWrapper = document.querySelector(sliderWrapperSelector),
    slidesField = document.querySelector(slidesFieldSelector),
    sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width;
  let currSlideIndex = 1;
  let offset = 0;

  
  document.querySelector("#total").textContent = `0${slides.length}`.slice(-2);
  document.querySelector("#current").textContent = `0${currSlideIndex}`.slice(
    -2
    );
    
    slidesField.style.cssText = `width: ${100 * slides.length + "%"}; 
    display: flex; 
    transition: 0.5s all`;
    
    sliderWrapper.style.overflow = "hidden";
    
    slides.forEach((slide) => {
      slide.style.width = sliderWrapperWidth;
    });
    
    function sliderUpdate() {
      slidesField.style.transform = `translateX(-${offset}px)`;
      document.querySelector("#current").textContent = `0${currSlideIndex}`.slice(
        -2
        );
        
        dotsArr.forEach((dot) => {
          if (dot.dataset.slideTo == currSlideIndex) {
            dot.classList.add("dot-active");
          } else {
            dot.classList.toggle("dot-active", false);
          }
        });
      }
      
      btnNextSlide.addEventListener("click", () => {
        if (offset == Number.parseInt(sliderWrapperWidth) * (slides.length - 1)) {
          offset = 0;
          currSlideIndex = 1;
        } else {
          offset += Number.parseInt(sliderWrapperWidth);
          currSlideIndex++;
        }
        sliderUpdate();
      });
      
      btnPrevSlide.addEventListener("click", () => {
        if (offset == 0) {
          offset = Number.parseInt(sliderWrapperWidth) * (slides.length - 1);
          currSlideIndex = slides.length;
        } else {
          offset -= Number.parseInt(sliderWrapperWidth);
          currSlideIndex--;
        }
        sliderUpdate();
      });
      
      //Slider navigation
      const dotsWrapper = document.createElement("ol");
      dotsWrapper.classList.add("carousel-indicators");
      const dotsArr = [];
    
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-to", i + 1);
        if (dot.dataset.slideTo == currSlideIndex) dot.classList.add("dot-active");
        dotsWrapper.append(dot);
        dotsArr.push(dot);
      }
    
      slider.append(dotsWrapper);
    
      dotsWrapper.addEventListener("click", (e) => {
        currSlideIndex = e.target.dataset.slideTo;
    
        offset = Number.parseInt(sliderWrapperWidth) * (currSlideIndex - 1);
        sliderUpdate();
      });
      //Slider navigation
}

export default slider;
