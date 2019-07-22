// carousel elements
let slides = document.querySelectorAll('.slides div[class^="slide-"]');
let pointers = document.querySelectorAll(".pointers button");
let sideButtons = document.querySelectorAll(".side_btn");
let activeSlide = 0;

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

// statistic elements
let statisticBox = document.querySelector(".statistic");
let statValues = document.querySelectorAll(".stat_number");
let startCount = false;
let numberCount = 0;
let elementCount = 0;

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
