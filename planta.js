// ELEMENTO DEL HTML

const contenedor = document.getElementById("ficha-planta");

// TOMAR EL ID DE LA PLANTA QUE VIENE DESDE LA URL

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");


// BUSCAR LA IMAGEN SEGUN EL NOMBRE DE LA PLANTA

function obtenerImagen(planta) {

    if (planta.nombre === "Costilla de Adán") {
        return "img/sansevieria.jpg";
    }

    if (
        planta.nombre === "Lavanda" ||
        planta.nombre === "Echeveria"
    ) {
        return "img/suculenta.jpg";
    }

    if (
        planta.nombre === "Potus" ||
        planta.nombre === "Jazmín" ||
        planta.nombre === "Helecho"
    ) {
        return "img/palmera.jpg";
    }

    // SI NO COINCIDE CON NINGUNA, USA LA FOTO QUE TIENE GUARDADA
    return planta.foto;
}


// MOSTRAR LOS DATOS DE LA PLANTA EN LA PAGINA

function mostrarFicha(planta) {

    // SI NO SE ENCUENTRA LA PLANTA, MOSTRAMOS UN MENSAJE

    if (!planta) {

        contenedor.innerHTML = `
            <div class="ficha-informacion">
                <h2>No encontramos esa planta.</h2>
                <a href="catalogo.html">Volver al catálogo</a>
            </div>
        `;

        return;
    }

    // OBTENER LA IMAGEN QUE LE CORRESPONDE

    const imagen = obtenerImagen(planta);

    // CARGAR LA INFORMACION DE LA PLANTA EN EL HTML

    contenedor.innerHTML = `
        <div class="ficha-imagen">
            <img src="${imagen}" alt="${planta.nombre}">
        </div>

        <div class="ficha-informacion">

            <p>${planta.categoria}</p>

            <h1>${planta.nombre}</h1>

            <h3>${planta.nombreCientifico}</h3>

            <p><strong>Precio:</strong> $ ${Number(planta.precio).toLocaleString("es-AR")}</p>

            <p><strong>Stock disponible:</strong> ${planta.stock}</p>

            <p><strong>Iluminación:</strong> ${planta.luz}</p>

            <p><strong>Riego:</strong> ${planta.riego}</p>

            <p><strong>Fecha de ingreso:</strong> ${planta.fechaIngreso}</p>

            <p><strong>Apta para mascotas:</strong> ${planta.aptaMascotas ? "Sí" : "No"}</p>

            <p><strong>Etiquetas:</strong> ${Array.isArray(planta.etiquetas) ? planta.etiquetas.join(", ") : "Sin etiquetas"}</p>

            <p><strong>Notas:</strong> ${planta.notas || "Sin notas adicionales."}</p>

            <a href="catalogo.html">Volver al catálogo</a>

        </div>
    `;
}


// CARGAR LOS DATOS DE LAS PLANTAS

async function cargarFicha() {

    // MOSTRAR UN MENSAJE MIENTRAS SE CARGAN LOS DATOS

    contenedor.innerHTML = "<p>Cargando planta...</p>";

    let plantas = [];

    try {

        // PRIMERO INTENTAMOS TRAER LAS PLANTAS DESDE LA API

        console.log("Consultando API...");

        plantas = await obtenerPlantas();

        console.log("Plantas recibidas:", plantas);

    } catch (error) {

        // SI FALLA LA API, USAMOS LOS DATOS QUE TENEMOS GUARDADOS

        console.warn("Error al consultar la API, usando datos de respaldo:", error);

        try {

            // TAMBIEN APLICAMOS LOS CAMBIOS QUE SE GUARDARON EN EL NAVEGADOR

            plantas = aplicarCambiosLocales(
                JSON.parse(obtenerPlantasRespaldo())
            );

        } catch (errorRespaldo) {

            // SI TAMPOCO SE PUEDEN CARGAR LOS DATOS DE RESPALDO, MOSTRAMOS EL ERROR

            console.error("Error al cargar los datos de respaldo:", errorRespaldo);

            contenedor.innerHTML = `
                <div class="ficha-informacion">
                    <h2>Error al cargar la planta.</h2>
                    <p>${errorRespaldo.message}</p>
                    <a href="catalogo.html">Volver al catálogo</a>
                </div>
            `;

            return;
        }
    }


    // BUSCAR DENTRO DEL ARRAY LA PLANTA QUE COINCIDA CON EL ID DE LA URL

    console.log("ID de la URL:", id);

    const planta = plantas.find(function(planta) {

        return String(planta.id) === String(id);

    });

    console.log("Planta encontrada:", planta);

    // MOSTRAR LA FICHA CON LOS DATOS ENCONTRADOS

    mostrarFicha(planta);

}


// EJECUTAR LA FUNCION PARA QUE SE CARGUE LA FICHA

cargarFicha();