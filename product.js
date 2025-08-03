const slider = document.getElementById("imageSlider");
let currentIndex = 0;
const totalSlides = slider.children.length;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}
