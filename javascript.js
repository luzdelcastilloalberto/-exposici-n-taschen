const pasos = document.querySelectorAll('.paso');
const fases = document.querySelectorAll('.fase');
const navegacion = document.getElementById('navegacioncompra');
const tituloMes = document.getElementById('mesactual');
const listaFechas = document.getElementById('listafechas');
const listaHoras = document.getElementById('listahoras');
const tipoEntrada = document.getElementById('tipoentrada');
const precioTotal = document.getElementById('preciototal');
const contador = document.getElementById('contador');
const fondo = document.getElementById('fondocompra');
const resumen = document.getElementById('resumencompra');
const aceptar = document.getElementById('aceptarcompra');

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let pasoActual = 1;
let fechaSeleccionada = null;
let horaSeleccionada = null;
let cantidad = 1;

const hoySistema = new Date();
let mesMostrado = hoySistema.getMonth();
let anioMostrado = hoySistema.getFullYear();

function limpiarHora(fecha) {
    const copia = new Date(fecha);
    copia.setHours(0, 0, 0, 0);
    return copia;
}

function pintarCalendario() {
    listaFechas.innerHTML = '';
    tituloMes.textContent = `${meses[mesMostrado]} ${anioMostrado}`;

    const primerDia = new Date(anioMostrado, mesMostrado, 1).getDay();
    const diasDelMes = new Date(anioMostrado, mesMostrado + 1, 0).getDate();
    const inicioSemana = primerDia === 0 ? 6 : primerDia - 1;
    const hoy = limpiarHora(new Date());

    for (let i = 0; i < inicioSemana; i++) {
        const hueco = document.createElement('div');
        hueco.classList.add('vacio');
        listaFechas.appendChild(hueco);
    }

    for (let dia = 1; dia <= diasDelMes; dia++) {
        const casilla = document.createElement('div');
        const fecha = limpiarHora(new Date(anioMostrado, mesMostrado, dia));

        casilla.classList.add('dia');
        casilla.textContent = dia;

        if (fecha <= hoy) {
            casilla.classList.add('bloqueado');
        }

        casilla.addEventListener('click', () => {
            if (fecha <= hoy) return;

            document.querySelectorAll('.dia').forEach(elemento => {
                elemento.classList.remove('elegido');
            });

            casilla.classList.add('elegido');
            fechaSeleccionada = fecha;
            crearHoras();
        });

        listaFechas.appendChild(casilla);
    }
}

function cambiarMes(valor) {
    mesMostrado += valor;

    if (mesMostrado < 0) {
        mesMostrado = 11;
        anioMostrado--;
    }

    if (mesMostrado > 11) {
        mesMostrado = 0;
        anioMostrado++;
    }

    pintarCalendario();
}

document.getElementById('mesanterior').addEventListener('click', () => cambiarMes(-1));
document.getElementById('messiguiente').addEventListener('click', () => cambiarMes(1));

function crearHoras() {
    listaHoras.innerHTML = '';
    if (!fechaSeleccionada) return;

    const dia = fechaSeleccionada.getDay();
    const horaFinal = dia === 0 || dia === 6 ? 19 : 21;

    for (let hora = 9; hora < horaFinal; hora++) {
        crearHora(`${String(hora).padStart(2, '0')}:00 - ${String(hora).padStart(2, '0')}:30`);
        crearHora(`${String(hora).padStart(2, '0')}:30 - ${String(hora + 1).padStart(2, '0')}:00`);
    }
}

function crearHora(texto) {
    const opcion = document.createElement('div');
    opcion.classList.add('hora');
    opcion.textContent = texto;

    opcion.addEventListener('click', () => {
        document.querySelectorAll('.hora').forEach(elemento => {
            elemento.classList.remove('elegido');
        });

        opcion.classList.add('elegido');
        horaSeleccionada = texto;
    });

    listaHoras.appendChild(opcion);
}

function actualizarPasos() {
    pasos.forEach(paso => paso.classList.remove('activo'));
    fases.forEach(fase => fase.classList.remove('visible'));

    document.querySelector(`[data-paso="${pasoActual}"]`).classList.add('activo');
    document.getElementById(`fase${pasoActual}`).classList.add('visible');

    actualizarNavegacion();

    if (pasoActual === 4) {
        pintarConfirmacion();
    }
}

function actualizarNavegacion() {
    if (pasoActual === 4) {
        navegacion.classList.add('centrada');
        navegacion.innerHTML = `
            <a href="tickets.html" class="inicio">
                VOLVER AL INICIO
            </a>
        `;
        return;
    }

    navegacion.classList.remove('centrada');
    navegacion.innerHTML = `
        <button id="anterior" class="boton ${pasoActual === 1 ? 'oculto' : ''}">
            Atrás
        </button>

        <button id="siguiente" class="boton">
            ${pasoActual === 3 ? 'Comprar Entradas' : 'Siguiente'}
        </button>
    `;

    document.getElementById('siguiente').addEventListener('click', avanzarPaso);
    document.getElementById('anterior').addEventListener('click', retrocederPaso);
}

function avanzarPaso() {
    if (pasoActual === 1 && !fechaSeleccionada) {
        alert('Selecciona una fecha futura');
        return;
    }

    if (pasoActual === 2 && !horaSeleccionada) {
        alert('Selecciona un horario');
        return;
    }

    if (pasoActual === 3) {
        abrirResumen();
        return;
    }

    if (pasoActual < 3) {
        pasoActual++;
        actualizarPasos();
    }
}

function retrocederPaso() {
    if (pasoActual > 1) {
        pasoActual--;
        actualizarPasos();
    }
}

function abrirResumen() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (nombre === '') {
        alert('Introduce tu nombre');
        return;
    }

    if (!correo.includes('@')) {
        alert('Introduce un correo válido');
        return;
    }

    resumen.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Fecha:</strong> ${fechaSeleccionada.toLocaleDateString()}</p>
        <p><strong>Horario:</strong> ${horaSeleccionada}</p>
        <p><strong>Entrada:</strong> ${textoEntrada()}</p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
        <p><strong>Total:</strong> ${precioTotal.textContent}</p>
    `;

    fondo.style.display = 'flex';
}

function textoEntrada() {
    return tipoEntrada.options[tipoEntrada.selectedIndex].text;
}

function actualizarPrecio() {
    precioTotal.textContent = `${Number(tipoEntrada.value) * cantidad}€`;
}

tipoEntrada.addEventListener('change', actualizarPrecio);

document.getElementById('sumar').addEventListener('click', () => {
    cantidad++;
    contador.textContent = cantidad;
    actualizarPrecio();
});

document.getElementById('restar').addEventListener('click', () => {
    if (cantidad <= 1) return;

    cantidad--;
    contador.textContent = cantidad;
    actualizarPrecio();
});

aceptar.addEventListener('click', () => {
    fondo.style.display = 'none';
    pasoActual = 4;
    actualizarPasos();
});

function pintarConfirmacion() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();

    document.getElementById('titulofinal').textContent = textoEntrada();
    document.getElementById('datosfinal').innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Fecha:</strong> ${fechaSeleccionada.toLocaleDateString()}</p>
        <p><strong>Horario:</strong> ${horaSeleccionada}</p>
        <p><strong>Total entradas:</strong> ${cantidad}</p>
        <p><strong>Precio total:</strong> ${precioTotal.textContent}</p>
        <p><strong>Estado:</strong> Confirmado</p>
    `;
}

const barra = document.querySelector('.pasos');

function actualizarBarra() {
    if (!barra) return;

    if (window.scrollY > 40) {
        barra.classList.add('desplazado');
    } else {
        barra.classList.remove('desplazado');
    }
}

window.addEventListener('scroll', actualizarBarra);

pintarCalendario();
actualizarPrecio();
actualizarPasos();
actualizarBarra();
