let slides = document.querySelectorAll('.slides div[class^="slide-"]');
let pointers = document.querySelectorAll(".pointers button");
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

activationSlide();

function activationSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[activeSlide].style.display = "flex";
  }
}

console.log(activeSlide);
