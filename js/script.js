let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function goTo(n) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = n;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

setInterval(() => goTo((current + 1) % slides.length), 5000);

function toggleMenu() {
  if (window.innerWidth <= 700) {
    let menu = document.getElementById("menu");
    menu.classList.toggle("abierto");
  }
}

function closeMenu() {
  if (window.innerWidth <= 700) {
    let menu = document.getElementById("menu");
    menu.classList.remove("abierto");
  }
}
