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
    activationSlide();
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
