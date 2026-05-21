let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = index;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

setInterval(() => {
  let next = (current + 1) % slides.length;
  goTo(next);
}, 1500);
