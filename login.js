// BUSCAR EL FORMULARIO DEL LOGIN

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {

    // OBTENER LOS CAMPOS DEL FORMULARIO

    const correoLogin = document.getElementById("correo-login");
    const contrasenaLogin = document.getElementById("contrasena-login");

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

            errorLogin.textContent = "Ingresá tu correo electrónico.";
            errorLogin.hidden = false;
            correoLogin.focus();

            return;
        }


        // COMPROBAR QUE EL CORREO TENGA UN FORMATO VALIDO

        if (!correo.includes("@") || !correo.includes(".")) {

            errorLogin.textContent = "Ingresá un correo válido.";
            errorLogin.hidden = false;
            correoLogin.focus();

            return;
        }


        // COMPROBAR QUE LA CONTRASEÑA NO ESTE VACIA

        if (contrasena === "") {

            errorLogin.textContent = "Ingresá tu contraseña.";
            errorLogin.hidden = false;
            contrasenaLogin.focus();

            return;
        }


        // GUARDAR LA SESION DEL USUARIO

        guardarSesion(correo);


        // MOSTRAR MENSAJE DE CONFIRMACION

        exitoLogin.textContent = "¡Ingresaste correctamente!";
        exitoLogin.hidden = false;


        // REDIRIGIR A LA INTRANET

        window.location.href = "intranet.html";

    });

}