// CONTACTO

// BUSCAR EL FORMULARIO DE CONTACTO

const formulario = document.getElementById("form-contacto");

// COMPROBAR SI EL FORMULARIO EXISTE EN ESTA PAGINA

if (formulario) {

    // OBTENER LOS CAMPOS DEL FORMULARIO

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const motivo = document.getElementById("motivo");
    const mensaje = document.getElementById("mensaje");

    // ELEMENTOS DONDE SE MUESTRAN LOS MENSAJES

    const mensajeError = document.getElementById("mensaje-error");
    const mensajeExito = document.getElementById("mensaje-exito");

    // MOSTRAR UN MENSAJE DE ERROR

    function mostrarError(texto) {
        mensajeError.textContent = texto;
        mensajeError.hidden = false;
        mensajeExito.hidden = true;
    }

    // VALIDAR LOS DATOS CUANDO SE ENVIA EL FORMULARIO

    formulario.addEventListener("submit", function(event) {

        // EVITAR QUE LA PAGINA SE RECARGUE

        event.preventDefault();

        // OCULTAR LOS MENSAJES ANTERIORES

        mensajeError.hidden = true;
        mensajeExito.hidden = true;

        // GUARDAR LOS VALORES INGRESADOS SIN ESPACIOS AL PRINCIPIO Y AL FINAL

        const valorNombre = nombre.value.trim();
        const valorCorreo = correo.value.trim();
        const valorMotivo = motivo.value;
        const valorMensaje = mensaje.value.trim();

        // COMPROBAR QUE EL NOMBRE NO ESTE VACIO

        if (valorNombre === "") {
            mostrarError("Ingresá tu nombre y apellido.");
            nombre.focus();
            return;
        }

        // COMPROBAR QUE EL CORREO NO ESTE VACIO

        if (valorCorreo === "") {
            mostrarError("Ingresá tu correo electrónico.");
            correo.focus();
            return;
        }

        // VERIFICAR QUE EL CORREO TENGA UN FORMATO VALIDO

        if (!valorCorreo.includes("@") || !valorCorreo.includes(".")) {
            mostrarError("Ingresá un correo electrónico válido.");
            correo.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA SELECCIONADO UN MOTIVO

        if (valorMotivo === "") {
            mostrarError("Seleccioná un motivo de consulta.");
            motivo.focus();
            return;
        }

        // COMPROBAR QUE EL MENSAJE NO ESTE VACIO

        if (valorMensaje === "") {
            mostrarError("Escribí un mensaje antes de enviar.");
            mensaje.focus();
            return;
        }

        // SI TODOS LOS CAMPOS ESTAN COMPLETOS, MOSTRAR CONFIRMACION

        mensajeExito.textContent = "¡Tu consulta fue validada correctamente!";
        mensajeExito.hidden = false;

        // LIMPIAR EL FORMULARIO

        formulario.reset();

    });

}




// LOGIN

// BUSCAR EL FORMULARIO DE INGRESO

const formularioLogin = document.getElementById("form-login");

// COMPROBAR SI ESTAMOS EN LA PAGINA DE LOGIN

if (formularioLogin) {

    // OBTENER LOS CAMPOS DEL LOGIN

    const correoLogin = document.getElementById("correo-login");
    const contrasenaLogin = document.getElementById("contrasena-login");

    // ELEMENTOS PARA MOSTRAR ERRORES O CONFIRMACIONES

    const errorLogin = document.getElementById("error-login");
    const exitoLogin = document.getElementById("exito-login");

    // VALIDAR LOS DATOS AL ENVIAR EL FORMULARIO

    formularioLogin.addEventListener("submit", function(event) {

        // EVITAR QUE LA PAGINA SE RECARGUE

        event.preventDefault();

        // OCULTAR LOS MENSAJES ANTERIORES

        errorLogin.hidden = true;
        exitoLogin.hidden = true;

        // OBTENER LOS VALORES INGRESADOS

        const correo = correoLogin.value.trim();
        const contrasena = contrasenaLogin.value.trim();

        // COMPROBAR QUE EL CORREO NO ESTE VACIO

        if (correo === "") {
            errorLogin.textContent = "Ingresa tu correo electronico.";
            errorLogin.hidden = false;
            correoLogin.focus();
            return;
        }

        // COMPROBAR QUE EL CORREO TENGA UN FORMATO VALIDO

        if (!correo.includes("@") || !correo.includes(".")) {
            errorLogin.textContent = "Ingresa un correo valido.";
            errorLogin.hidden = false;
            correoLogin.focus();
            return;
        }

        // COMPROBAR QUE LA CONTRASEÑA NO ESTE VACIA

        if (contrasena === "") {
            errorLogin.textContent = "Ingresa tu contraseña.";
            errorLogin.hidden = false;
            contrasenaLogin.focus();
            return;
        }

        // SI LOS CAMPOS ESTAN COMPLETOS, MOSTRAR CONFIRMACION

        exitoLogin.textContent = "¡Los datos se completaron correctamente!";
        exitoLogin.hidden = false;

    });

}




// REGISTRO

// BUSCAR EL FORMULARIO DE REGISTRO

const formularioRegistro = document.getElementById("form-registro");

// ESTOS MENSAJES NOS AYUDAN A COMPROBAR QUE EL FORMULARIO SE ENCONTRO

console.log("JavaScript de registro conectado");
console.log("Formulario encontrado:", formularioRegistro);

// COMPROBAR SI ESTAMOS EN LA PAGINA DE REGISTRO

if (formularioRegistro) {

    // OBTENER LOS CAMPOS DEL FORMULARIO

    const nombreRegistro = document.getElementById("nombre-registro");
    const apellidoRegistro = document.getElementById("apellido-registro");
    const fechaRegistro = document.getElementById("fecha-registro");
    const telefonoRegistro = document.getElementById("telefono-registro");
    const correoRegistro = document.getElementById("correo-registro");
    const contrasenaRegistro = document.getElementById("contrasena-registro");
    const repetirContrasena = document.getElementById("repetir-contrasena");
    const rolRegistro = document.getElementById("rol-registro");
    const terminosRegistro = document.getElementById("terminos-registro");

    // ELEMENTOS PARA MOSTRAR ERRORES O CONFIRMACIONES

    const errorRegistro = document.getElementById("error-registro");
    const exitoRegistro = document.getElementById("exito-registro");

    // VALIDAR LOS DATOS CUANDO SE ENVIA EL FORMULARIO

    formularioRegistro.addEventListener("submit", function(event) {

        // EVITAR QUE LA PAGINA SE RECARGUE

        event.preventDefault();

        // OCULTAR LOS MENSAJES ANTERIORES

        errorRegistro.hidden = true;
        exitoRegistro.hidden = true;

        // COMPROBAR QUE EL NOMBRE NO ESTE VACIO

        if (nombreRegistro.value.trim() === "") {
            errorRegistro.textContent = "Ingresá tu nombre.";
            errorRegistro.hidden = false;
            nombreRegistro.focus();
            return;
        }

        // COMPROBAR QUE EL APELLIDO NO ESTE VACIO

        if (apellidoRegistro.value.trim() === "") {
            errorRegistro.textContent = "Ingresá tu apellido.";
            errorRegistro.hidden = false;
            apellidoRegistro.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA INGRESADO LA FECHA DE NACIMIENTO

        if (fechaRegistro.value === "") {
            errorRegistro.textContent = "Ingresá tu fecha de nacimiento.";
            errorRegistro.hidden = false;
            fechaRegistro.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA INGRESADO UN TELEFONO

        if (telefonoRegistro.value.trim() === "") {
            errorRegistro.textContent = "Ingresá tu teléfono.";
            errorRegistro.hidden = false;
            telefonoRegistro.focus();
            return;
        }

        // COMPROBAR QUE EL CORREO NO ESTE VACIO

        if (correoRegistro.value.trim() === "") {
            errorRegistro.textContent = "Ingresá tu correo electrónico.";
            errorRegistro.hidden = false;
            correoRegistro.focus();
            return;
        }

        // VERIFICAR QUE EL CORREO TENGA UN FORMATO VALIDO

        if (!correoRegistro.value.includes("@") || !correoRegistro.value.includes(".")) {
            errorRegistro.textContent = "Ingresá un correo electrónico válido.";
            errorRegistro.hidden = false;
            correoRegistro.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA INGRESADO UNA CONTRASEÑA

        if (contrasenaRegistro.value === "") {
            errorRegistro.textContent = "Ingresá una contraseña.";
            errorRegistro.hidden = false;
            contrasenaRegistro.focus();
            return;
        }

        // VERIFICAR QUE LA CONTRASEÑA TENGA AL MENOS 8 CARACTERES

        if (contrasenaRegistro.value.length < 8) {
            errorRegistro.textContent = "La contraseña debe tener al menos 8 caracteres.";
            errorRegistro.hidden = false;
            contrasenaRegistro.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA REPETIDO LA CONTRASEÑA

        if (repetirContrasena.value === "") {
            errorRegistro.textContent = "Repetí tu contraseña.";
            errorRegistro.hidden = false;
            repetirContrasena.focus();
            return;
        }

        // COMPARAR LAS DOS CONTRASEÑAS PARA VER SI COINCIDEN

        if (contrasenaRegistro.value !== repetirContrasena.value) {
            errorRegistro.textContent = "Las contraseñas no coinciden.";
            errorRegistro.hidden = false;
            repetirContrasena.focus();
            return;
        }

        // COMPROBAR QUE SE HAYA SELECCIONADO UN ROL

        if (rolRegistro.value === "") {
            errorRegistro.textContent = "Seleccioná un rol del vivero.";
            errorRegistro.hidden = false;
            rolRegistro.focus();
            return;
        }

        // VERIFICAR QUE SE HAYAN ACEPTADO LOS TERMINOS Y CONDICIONES

        if (!terminosRegistro.checked) {
            errorRegistro.textContent = "Tenés que aceptar los términos y condiciones.";
            errorRegistro.hidden = false;
            terminosRegistro.focus();
            return;
        }

        // SI TODAS LAS VALIDACIONES SON CORRECTAS, MOSTRAR CONFIRMACION

        exitoRegistro.textContent = "¡Registro validado correctamente!";
        exitoRegistro.hidden = false;

        // LIMPIAR LOS CAMPOS DEL FORMULARIO

        formularioRegistro.reset();

    });

}