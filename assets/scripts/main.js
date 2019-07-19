let slides = document.querySelectorAll('.slides div[class^="slide-"]');
let activeSlide = 0;

for (let i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
  slides[activeSlide].style.display = "flex";
}
