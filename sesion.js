
// CLAVE QUE USAMOS PARA GUARDAR LA SESION

const CLAVE_SESION = "sesionViveroRaiz";


// GUARDAR LA SESION DEL USUARIO

function guardarSesion(correo) {

    const usuario = {
        correo: correo,
        fechaIngreso: new Date().toISOString()
    };

    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));

}


// OBTENER LOS DATOS DE LA SESION

function obtenerSesion() {

    const sesion = localStorage.getItem(CLAVE_SESION);

    return sesion ? JSON.parse(sesion) : null;

}


// MOSTRAR EL NOMBRE DEL USUARIO EN LOS NAVBARS

function mostrarUsuario() {

    const saludos = document.querySelectorAll(".saludo-usuario");
    const botonesCerrar = document.querySelectorAll(".btn-cerrar-sesion");
    const botonesIngresar = document.querySelectorAll(".btn-ingresar");

    const sesion = obtenerSesion();

    saludos.forEach(function(saludo) {

        if (sesion) {

            const nombreUsuario = sesion.correo.split("@")[0];

            saludo.textContent = "¡Hola, " + nombreUsuario + "!";

        } else {

            saludo.textContent = "";

        }

    });


    // MOSTRAR O ESCONDER CERRAR SESION

    botonesCerrar.forEach(function(boton) {
        boton.hidden = !sesion;
    });


    // MOSTRAR O ESCONDER INGRESAR

    botonesIngresar.forEach(function(boton) {
        boton.hidden = Boolean(sesion);
    });

}


// CERRAR SESION

function cerrarSesion() {

    localStorage.removeItem(CLAVE_SESION);

    window.location.href = "login.html";

}


// CONFIGURAR EL NAVBAR

document.addEventListener("DOMContentLoaded", function() {

    mostrarUsuario();

    const botonesCerrar = document.querySelectorAll(".btn-cerrar-sesion");

    botonesCerrar.forEach(function(boton) {

        boton.addEventListener("click", function(event) {

            event.preventDefault();

            cerrarSesion();

        });

    });

});
