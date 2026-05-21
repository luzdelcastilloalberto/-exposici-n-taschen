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

function toggleMenu() {
  // Solo si la pantalla es menor a 700px
  if (window.innerWidth <= 700) {
    // Buscamos el elemento con id="menu" para añadir o eliminar la clase "abierto"
    let menu = document.getElementById("menu");
    // Alternamos la clase "abierto" en el menú
    menu.classList.toggle("abierto");
  }
}

/**
 * Elimina la clase "abierto" del menú solo cuando la pantalla es de menos de 500px
 * de ancho
 */
function closeMenu() {
  // Solo si la pantalla es menor a 700px
  if (window.innerWidth <= 700) {
    // Buscamos el elemento con id="menu" para eliminar la clase "abierto"
    let menu = document.getElementById("menu");
    // Eliminamos la clase "abierto" en el menú
    menu.classList.remove("abierto");
  }
}
