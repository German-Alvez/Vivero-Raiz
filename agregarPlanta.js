// FORMULARIO DE PLANTAS

const formulario = document.getElementById("formulario-planta");
const mensaje = document.getElementById("mensaje-formulario");
const titulo = document.getElementById("titulo-formulario");
const botonGuardar = document.getElementById("btn-guardar");


// OBTENER EL ID DE LA URL PARA SABER SI ES UNA EDICION

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");


// GUARDAR LOS DATOS DE LA PLANTA QUE VAMOS A EDITAR

let plantaActual = null;


// MOSTRAR MENSAJES EN EL FORMULARIO

function mostrarMensaje(texto, tipo) {

    // CAMBIAR EL TEXTO Y EL ESTILO SEGUN EL TIPO DE MENSAJE

    mensaje.textContent = texto;
    mensaje.className = tipo;

}


// CARGAR LOS DATOS DE UNA PLANTA PARA PODER EDITARLA

async function cargarPlanta() {

    // SI NO HAY ID, ES PORQUE VAMOS A AGREGAR UNA PLANTA NUEVA

    if (!id) {
        return;
    }

    try {

        // CAMBIAR LOS TEXTOS DEL FORMULARIO PARA INDICAR QUE ESTAMOS EDITANDO

        titulo.textContent = "Editar planta";
        botonGuardar.textContent = "Guardar cambios";

        // TRAER LAS PLANTAS Y BUSCAR LA QUE COINCIDA CON EL ID

        const plantas = await obtenerPlantas();

        plantaActual = plantas.find(function(planta) {

            return String(planta.id) === String(id);

        });

        // SI NO SE ENCUENTRA, MOSTRAR UN ERROR

        if (!plantaActual) {
            throw new Error("No encontramos esa planta.");
        }

        // COMPLETAR EL FORMULARIO CON LOS DATOS QUE YA TIENE LA PLANTA

        document.getElementById("nombre").value = plantaActual.nombre || "";
        document.getElementById("categoria").value = plantaActual.categoria || "";
        document.getElementById("descripcion").value = plantaActual.descripcion || "";
        document.getElementById("precio").value = plantaActual.precio ?? "";
        document.getElementById("stock").value = plantaActual.stock ?? "";
        document.getElementById("imagen").value = plantaActual.foto || "";
        document.getElementById("luz").value = plantaActual.luz || "";
        document.getElementById("riego").value = plantaActual.riego || "";
        document.getElementById("cuidados").value = plantaActual.notas || "";

    } catch (error) {

        // SI OCURRE UN PROBLEMA AL CARGAR LOS DATOS, MOSTRAR EL MENSAJE

        console.error("Error al cargar la planta:", error);

        mostrarMensaje(
            "Error al cargar la planta: " + error.message,
            "error"
        );

    }

}


// GUARDAR LOS DATOS DEL FORMULARIO

formulario.addEventListener("submit", async function(event) {

    // EVITAR QUE EL FORMULARIO SE ENVIE Y RECARGUE LA PAGINA

    event.preventDefault();

    // DESACTIVAR EL BOTON PARA EVITAR QUE SE ENVIE MAS DE UNA VEZ

    botonGuardar.disabled = true;

    try {

        // ARMAR EL OBJETO CON LOS DATOS INGRESADOS EN EL FORMULARIO

        const planta = {

            // CONSERVAR LOS DATOS QUE YA TENIA SI ESTAMOS EDITANDO

            ...plantaActual,

            nombre: document.getElementById("nombre").value.trim(),

            categoria: document.getElementById("categoria").value,

            descripcion: document.getElementById("descripcion").value.trim(),

            // CONVERTIR PRECIO Y STOCK A NUMEROS

            precio: Number(document.getElementById("precio").value),

            stock: Number(document.getElementById("stock").value),

            foto: document.getElementById("imagen").value.trim(),

            luz: document.getElementById("luz").value.trim(),

            riego: document.getElementById("riego").value.trim(),

            notas: document.getElementById("cuidados").value.trim(),

            // SI ES UNA EDICION, MANTENER LA FECHA ORIGINAL; SI ES NUEVA, USAR LA FECHA ACTUAL

            fechaIngreso: plantaActual
                ? plantaActual.fechaIngreso
                : new Date().toISOString().slice(0, 10),

            // CONSERVAR ESTOS DATOS SI YA EXISTIAN

            nombreCientifico: plantaActual
                ? plantaActual.nombreCientifico
                : "",

            aptaMascotas: plantaActual
                ? plantaActual.aptaMascotas
                : false,

            etiquetas: plantaActual
                ? plantaActual.etiquetas
                : []

        };


        // COMPROBAR SI TENEMOS QUE EDITAR UNA PLANTA O AGREGAR UNA NUEVA

        if (id) {

            await editarPlanta(id, planta);

            mostrarMensaje(
                "¡La planta se actualizó correctamente!",
                "exito"
            );

        } else {

            await agregarPlanta(planta);

            mostrarMensaje(
                "¡La planta se agregó correctamente!",
                "exito"
            );

            // LIMPIAR LOS CAMPOS DESPUES DE AGREGAR

            formulario.reset();

        }

    } catch (error) {

        // MOSTRAR UN MENSAJE SI NO SE PUDO GUARDAR

        console.error("Error al guardar:", error);

        mostrarMensaje(
            "No se pudo guardar la planta: " + error.message,
            "error"
        );

    } finally {

        // VOLVER A HABILITAR EL BOTON

        botonGuardar.disabled = false;

    }

});


// EJECUTAR LA FUNCION PARA VER SI HAY QUE CARGAR UNA PLANTA PARA EDITAR

cargarPlanta();