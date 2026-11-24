// BUSCAR ELEMENTOS DEL HTML

const tablaPlantas = document.getElementById("tabla-plantas");
const mensaje = document.getElementById("mensaje-intranet");


// MOSTRAR MENSAJES

function mostrarMensaje(texto, tipo) {

    // CAMBIAR EL TEXTO Y EL ESTILO DEL MENSAJE

    mensaje.textContent = texto;
    mensaje.className = tipo;

}


// CREAR FILAS DE LA TABLA

function crearFila(planta) {

    // CREAR UNA FILA PARA CADA PLANTA

    const fila = document.createElement("tr");

    // AGREGAR LOS DATOS DE LA PLANTA Y LOS BOTONES DE ACCION

    fila.innerHTML = `
        <td>${planta.nombre}</td>

        <td>${planta.categoria}</td>

        <td>$ ${Number(planta.precio).toLocaleString("es-AR")}</td>

        <td>${planta.stock}</td>

        <td class="acciones">

            <a href="agregarPlanta.html?id=${planta.id}"
               class="btn-editar">
                Editar
            </a>

            <button
                type="button"
                class="btn-eliminar"
                data-id="${planta.id}">
                Eliminar
            </button>

        </td>
    `;

    return fila;

}


// MOSTRAR TODAS LAS PLANTAS

function mostrarTabla(lista) {

    // LIMPIAR LA TABLA ANTES DE CARGAR LOS DATOS

    tablaPlantas.innerHTML = "";

    // SI NO HAY PLANTAS, MOSTRAR UN MENSAJE EN LA TABLA

    if (lista.length === 0) {

        tablaPlantas.innerHTML = `
            <tr>
                <td colspan="5">No hay plantas cargadas.</td>
            </tr>
        `;

        return;
    }

    // RECORRER LA LISTA Y AGREGAR UNA FILA POR CADA PLANTA

    lista.forEach(function(planta) {

        const fila = crearFila(planta);

        tablaPlantas.appendChild(fila);

    });

}


// CONSULTAR PLANTAS

async function cargarTabla() {

    // MOSTRAR UN MENSAJE MIENTRAS SE CARGAN LOS DATOS

    tablaPlantas.innerHTML = `
        <tr>
            <td colspan="5">Cargando plantas...</td>
        </tr>
    `;

    try {

        // CONSULTAR API Y CAMBIOS LOCALES

        const plantas = await obtenerPlantas();

        // MOSTRAR LOS RESULTADOS EN LA TABLA

        mostrarTabla(plantas);

        mensaje.textContent = "";

    } catch (error) {

        // SI FALLA LA CONSULTA, MOSTRAR EL ERROR EN CONSOLA

        console.error("Error al cargar las plantas:", error);

        // UTILIZAR DATOS DE RESPALDO Y CAMBIOS LOCALES

        try {

            const plantasRespaldo = JSON.parse(obtenerPlantasRespaldo());

            const plantas = aplicarCambiosLocales(plantasRespaldo);

            // MOSTRAR LOS DATOS DE RESPALDO EN LA TABLA

            mostrarTabla(plantas);

            mostrarMensaje(
                "No se pudo conectar con el servidor. Se muestran los datos de respaldo.",
                "error"
            );

        } catch (errorRespaldo) {

            // SI TAMPOCO SE PUEDEN CARGAR LOS DATOS DE RESPALDO, MOSTRAR UN ERROR

            console.error("Error al cargar el respaldo:", errorRespaldo);

            tablaPlantas.innerHTML = `
                <tr>
                    <td colspan="5">No se pudieron cargar las plantas.</td>
                </tr>
            `;

            mostrarMensaje("Error al cargar las plantas.", "error");

        }

    }

}


// ELIMINAR PLANTA

tablaPlantas.addEventListener("click", async function(event) {

    // IDENTIFICAR SI SE HIZO CLICK EN EL BOTON ELIMINAR

    const boton = event.target.closest(".btn-eliminar");

    // SI EL CLICK FUE EN OTRO LUGAR, NO HACER NADA

    if (!boton) {
        return;
    }

    // OBTENER EL ID DE LA PLANTA QUE QUEREMOS ELIMINAR

    const id = boton.dataset.id;

    // PEDIR CONFIRMACION ANTES DE ELIMINAR

    const confirmar = confirm(
        "¿Estás seguro de que querés eliminar esta planta?"
    );

    if (!confirmar) {
        return;
    }

    // DESACTIVAR EL BOTON MIENTRAS SE REALIZA LA ELIMINACION

    boton.disabled = true;

    try {

        // LLAMAR A LA FUNCION QUE ELIMINA LA PLANTA

        await eliminarPlanta(id);

        mostrarMensaje(
            "¡La planta se eliminó correctamente!",
            "exito"
        );

        // VOLVER A CARGAR LA TABLA PARA ACTUALIZAR LOS DATOS

        await cargarTabla();

    } catch (error) {

        // SI OCURRE UN ERROR, MOSTRAR EL MENSAJE

        console.error("Error al eliminar:", error);

        mostrarMensaje(
            "No se pudo eliminar la planta: " + error.message,
            "error"
        );

        // VOLVER A HABILITAR EL BOTON

        boton.disabled = false;

    }

});


// CARGAR TABLA AL INGRESAR

cargarTabla();