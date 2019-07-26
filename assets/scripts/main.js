// header carousel elements
let slides = document.querySelectorAll(".slides .slide");
let pointers = document.querySelectorAll(".pointers button");
let sideButtons = document.querySelectorAll(".side_btn");
let activeSlide = 0;

// Elements of work page
let categories = document.querySelectorAll(".project_controls button");
let works = document.querySelectorAll(".work");

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

// Elements of navigation
const anchors = document.querySelectorAll('nav a[href*="#"]');
let menuButton = document.querySelector("#menu-button");
let backDrop = document.querySelector(".back-drop");
let drawer = document.querySelector("#drawer");
let strelka = document.querySelector(".strelka");
let boll = false;

backDrop.addEventListener("click", function() {
  drawer.className = "";
  backDrop.style.display = "none";
  strelka.style.display = "none";
});

menuButton.addEventListener("click", function() {
  boll = !boll;

  if (boll) {
    strelka.style.display = "block";
    drawer.className = "active";
    backDrop.style.display = "block";
  } else {
    drawer.className = "";
    strelka.style.display = "none";
  }
});

for (let i = 0; i < pointers.length; i++) {
  pointers[i].addEventListener("click", function() {
    activeSlide = i;

    pointers.forEach(element => {
      element.className = "";
    });

    this.className = "active";

    for (let index = 0; index < slides.length; index++) {
      slides[index].className = "slide";
      slides[activeSlide].className = "slide active";
    }
  });
}

sideButtons.forEach(button => {
  button.addEventListener("click", function() {
    if (this.getAttribute("data-direction") === "right" && activeSlide < 4) {
      activeSlide++;
    } else if (
      this.getAttribute("data-direction") === "right" &&
      activeSlide === 4
    ) {
      activeSlide = 0;
    }

    if (this.getAttribute("data-direction") === "left" && activeSlide > 0) {
      activeSlide--;
    } else if (
      this.getAttribute("data-direction") === "left" &&
      activeSlide === 0
    ) {
      activeSlide = 4;
    }

    for (let index = 0; index < slides.length; index++) {
      slides[index].className = "slide";
      slides[activeSlide].className = "slide active";
    }

    for (let i = 0; i < pointers.length; i++) {
      pointers[i].className = "";
    }

    for (let i = 0; i < pointers.length; i++) {
      pointers[activeSlide].className = "active";
    }
  });
});

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
  let countSpeed = 100;

  value > 2000 ? (countSpeed = 1) : (countSpeed = 100);

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
    }, countSpeed);
  }
}

carouselButtons.forEach(button => {
  button.addEventListener("click", function() {
    let carouselWidth = getComputedStyle(carousel).getPropertyValue(
      "--carousel-width"
    );

    if (carouselWidth === " 1160px") {
      carouselWidth = 1160;
      carouselCount = 2;
    } else if (carouselWidth === " 773px") {
      carouselWidth = 774;
      carouselCount = 3;
    } else {
      carouselWidth = 280;
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

for (let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    drawer.className = "";
    backDrop.style.display = "none";
    strelka.style.display = "none";

    const blockID = anchor.getAttribute("href");

    if (anchor.getAttribute("href") === "#") {
      document.querySelector("body").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      document.querySelector("" + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

categories.forEach(category => {
  category.addEventListener("click", function() {
    categories.forEach(e => (e.className = ""));
    this.className = "active";

    works.forEach(work => {
      if (work.className !== "work hidden") {
        work.className = "work hidden";
      }
      if (work.getAttribute("data-category") === category.value) {
        work.className = "work";
      } else if (category.value === "all") {
        work.className = "work";
      }
    });
  });
});
