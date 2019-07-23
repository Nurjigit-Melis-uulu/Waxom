// header carousel elements
let slides = document.querySelectorAll('.slides div[class^="slide-"]');
let pointers = document.querySelectorAll(".pointers button");
let sideButtons = document.querySelectorAll(".side_btn");
let activeSlide = 0;

// blog carousel elements
let carouselButtons = document.querySelectorAll(".carousel_controls_2 button");
let carouselSlides = document.querySelector(".carousel_slides");
let carousel = document.querySelector(".carousel");
let slideState = document.querySelector("#slide-state");
let slideActiveNumber = 1;
let carouselCount = 1;
let carouselPos = 0;

// statistic elements
let statisticBox = document.querySelector(".statistic");
let statValues = document.querySelectorAll(".stat_number");
let startCount = false;
let numberCount = 0;
let elementCount = 0;

for (let i = 0; i < pointers.length; i++) {
  pointers[i].addEventListener("click", function() {
    activeSlide = i;
    pointers.forEach(element => {
      element.className = "";
    });
    this.className = "active";
    activationButtons();
  });
}

for (let i = 0; i < sideButtons.length; i++) {
  sideButtons[i].addEventListener("click", function() {
    if (this.getAttribute("data-direction") === "right" && activeSlide < 4) {
      activeSlide++;
    }

    if (this.getAttribute("data-direction") === "left" && activeSlide > 0) {
      activeSlide--;
    }

    console.log(activeSlide);
    activationButtons();
  });
}

function activationButtons(params) {
  for (let i = 0; i < pointers.length; i++) {
    pointers.forEach(element => {
      element.className = "";
    });
    pointers[activeSlide].className = "active";

    for (let i = 0; i < sideButtons.length; i++) {
      if (activeSlide === 4) {
        sideButtons[1].disabled = true;
      } else if (activeSlide === 0) {
        sideButtons[0].disabled = true;
      } else {
        sideButtons[0].disabled = false;
        sideButtons[1].disabled = false;
      }
    }
    activationSlide();
  }
}

activationSlide();

function activationSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[activeSlide].style.display = "flex";
  }
}

document.addEventListener("scroll", function() {
  if (
    statisticBox.getBoundingClientRect().top <=
    document.documentElement.clientHeight / 2
  ) {
    startCount = true;
  } else {
    console.log("bad");
  }

  if (startCount) {
    for (let index = 0; index < statValues.length; index++) {
      countStatistic(
        statValues[elementCount],
        statValues[elementCount].getAttribute("data-value"),
        statValues.length
      );
    }
  }
});

function countStatistic(element, value, length) {
  if (numberCount < value) {
    numberCount++;
    element.innerHTML = numberCount;

    if (startCount) {
      elementCount < length - 1
        ? elementCount++
        : ((elementCount = 0), (startCount = false));
    }

    let timeOutLine = setTimeout(() => {
      clearTimeout(timeOutLine);
      countStatistic(element, value, length);
    }, 100);
  }
}

carouselButtons.forEach(button => {
  button.addEventListener("click", function() {
    let carouselWidth = getComputedStyle(carousel).getPropertyValue(
      "--carousel-width"
    );

    if (carouselWidth === " 1200px") {
      carouselWidth = 1200;
      carouselCount = 2;
    } else if (carouselWidth === " 640px") {
      carouselWidth = 640;
      carouselCount = 3;
    } else {
      carouselWidth = 320;
      carouselCount = 6;
    }

    if (
      this.getAttribute("data-direction") === "right" &&
      slideActiveNumber > 0 &&
      slideActiveNumber < carouselCount + 1
    ) {
      slideActiveNumber++;
      carouselPos += carouselWidth;
      carouselSlides.style.transform = `translateX(-${carouselPos}px)`;
    } else if (
      this.getAttribute("data-direction") === "left" &&
      slideActiveNumber <= carouselCount &&
      slideActiveNumber > 0
    ) {
      slideActiveNumber--;
      carouselPos -= carouselWidth;
      carouselSlides.style.transform = `translateX(-${carouselPos}px)`;
    }

    if (slideActiveNumber < 1) {
      slideActiveNumber = carouselCount;
      carouselPos = carouselWidth * (carouselCount - 1);
      carouselSlides.style.transform = `translateX(-${carouselPos}px)`;
    }

    if (slideActiveNumber > carouselCount) {
      slideActiveNumber = 1;
      carouselPos = 0;
      carouselSlides.style.transform = `translateX(${carouselPos}px)`;
    }

    slideState.innerHTML = slideActiveNumber;

    console.log(slideActiveNumber, carouselWidth, carouselCount, carouselPos);
  });
});
