// ELEMENTOS DEL FORMULARIO

const formulario = document.getElementById("form-recuperar");
const correo = document.getElementById("correo");
const mensajeError = document.getElementById("mensaje-error");
const mensajeExito = document.getElementById("mensaje-exito");


// VALIDAR EL FORMULARIO AL ENVIAR

formulario.addEventListener("submit", function(evento) {

    // EVITAR QUE LA PAGINA SE RECARGUE AL ENVIAR EL FORMULARIO

    evento.preventDefault();

    // LIMPIAR LOS MENSAJES ANTERIORES

    mensajeError.textContent = "";
    mensajeExito.textContent = "";

    // COMPROBAR QUE EL CAMPO DE CORREO NO ESTE VACIO

    if (correo.value.trim() === "") {
        mensajeError.textContent = "Ingresá tu correo electrónico.";
        return;
    }

    // SI EL CAMPO ESTA COMPLETO, MOSTRAR UN MENSAJE DE CONFIRMACION

    mensajeExito.textContent =
        "¡Listo! Revisá tu correo electrónico. Te enviamos las instrucciones para recuperar tu contraseña.";

    // LIMPIAR EL FORMULARIO DESPUES DE ENVIARLO

    formulario.reset();

});