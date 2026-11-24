// VARIABLE DONDE VAMOS A GUARDAR LAS PLANTAS

let plantas = [];


// ELEMENTOS DEL HTML

const buscador = document.getElementById("buscar-planta");
const categoria = document.getElementById("filtro-categoria");
const ordenar = document.getElementById("ordenar-plantas");

const botonLimpiar = document.getElementById("btn-limpiar");

const contenedor = document.getElementById("contenedor-cards");
const contador = document.getElementById("contador-resultados");
const sinResultados = document.getElementById("sin-resultados");
const mensajeEstado = document.getElementById("mensaje-estado");


// FUNCION 1: CREAR UNA TARJETA INDIVIDUAL

function crearTarjeta(planta) {

    // CREAR UN DIV PARA CADA PLANTA

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("card");

    // ADAPTAR LAS IMAGENES A LOS ARCHIVOS DISPONIBLES

    let imagen = planta.foto;

    if (planta.nombre === "Costilla de Adán") {
        imagen = "img/sansevieria.jpg";
    }

    if (planta.nombre === "Lavanda" || planta.nombre === "Echeveria") {
        imagen = "img/suculenta.jpg";
    }

    if (
        planta.nombre === "Potus" ||
        planta.nombre === "Jazmín" ||
        planta.nombre === "Helecho"
    ) {
        imagen = "img/palmera.jpg";
    }

    // AGREGAR LA INFORMACION DE LA PLANTA A LA TARJETA

    tarjeta.innerHTML = `
        <img src="${imagen}" alt="${planta.nombre}">

        <p class="titulo">${planta.categoria}</p>

        <h3>${planta.nombre}</h3>

        <p>${planta.nombreCientifico}</p>

        <p><b>$ ${Number(planta.precio).toLocaleString("es-AR")}</b></p>

        <a href="planta.html?id=${planta.id}">
            Ver Ficha →
        </a>
    `;

    return tarjeta;
}


// FUNCION 2: MOSTRAR LAS PLANTAS

function mostrarPlantas(lista) {

    // LIMPIAR EL CONTENEDOR ANTES DE MOSTRAR LAS TARJETAS

    contenedor.innerHTML = "";

    // RECORRER LA LISTA Y CREAR UNA TARJETA PARA CADA PLANTA

    lista.forEach(function(planta) {

        const tarjeta = crearTarjeta(planta);

        contenedor.appendChild(tarjeta);

    });

    // ACTUALIZAR LA CANTIDAD DE PLANTAS ENCONTRADAS

    contador.textContent =
        lista.length + " plantas encontradas";

    // MOSTRAR EL MENSAJE SI NO HAY RESULTADOS

    sinResultados.hidden = lista.length !== 0;
}


// FUNCION 3: BUSCAR, FILTRAR Y ORDENAR

function aplicarFiltros() {

    // OBTENER LOS VALORES INGRESADOS Y SELECCIONADOS

    const texto = buscador.value.toLowerCase().trim();

    const categoriaElegida = categoria.value;

    const ordenElegido = ordenar.value;


    // FILTRAR LAS PLANTAS SEGUN EL NOMBRE Y LA CATEGORIA

    let resultado = plantas.filter(function(planta) {

        // COMPARAR EL TEXTO CON EL NOMBRE Y EL NOMBRE CIENTIFICO

        const coincideNombre =
            planta.nombre.toLowerCase().includes(texto) ||
            planta.nombreCientifico.toLowerCase().includes(texto);

        // COMPROBAR SI COINCIDE CON LA CATEGORIA SELECCIONADA

        const coincideCategoria =
            categoriaElegida === "todas" ||
            planta.categoria === categoriaElegida;

        return coincideNombre && coincideCategoria;

    });


    // ORDENAR LAS PLANTAS SEGUN LA OPCION ELEGIDA

    resultado.sort(function(a, b) {

        // ORDENAR POR NOMBRE DE A A Z

        if (ordenElegido === "nombre-asc") {
            return a.nombre.localeCompare(b.nombre);
        }

        // ORDENAR POR NOMBRE DE Z A A

        if (ordenElegido === "nombre-desc") {
            return b.nombre.localeCompare(a.nombre);
        }

        // ORDENAR POR PRECIO DE MENOR A MAYOR

        if (ordenElegido === "precio-asc") {
            return a.precio - b.precio;
        }

        // ORDENAR POR PRECIO DE MAYOR A MENOR

        if (ordenElegido === "precio-desc") {
            return b.precio - a.precio;
        }

        // SI NO SE ELIGE NINGUN ORDEN, MANTENER EL ORDEN ORIGINAL

        return Number(a.id) - Number(b.id);

    });


    // MOSTRAR LAS PLANTAS QUE QUEDARON DESPUES DE APLICAR LOS FILTROS

    mostrarPlantas(resultado);

}


// EVENTOS DE BUSQUEDA Y FILTROS

// ACTUALIZAR LOS RESULTADOS CUANDO SE ESCRIBE EN EL BUSCADOR

buscador.addEventListener("input", aplicarFiltros);

// ACTUALIZAR CUANDO SE CAMBIA LA CATEGORIA

categoria.addEventListener("change", aplicarFiltros);

// ACTUALIZAR CUANDO SE CAMBIA EL ORDEN

ordenar.addEventListener("change", aplicarFiltros);


// LIMPIAR FILTROS

botonLimpiar.addEventListener("click", function() {

    // VOLVER LOS CAMPOS A SUS VALORES INICIALES

    buscador.value = "";

    categoria.value = "todas";

    ordenar.value = "original";

    // VOLVER A MOSTRAR TODAS LAS PLANTAS

    aplicarFiltros();

});


// FUNCION 4: OBTENER LAS PLANTAS DESDE LA API

async function cargarPlantas() {

    // MOSTRAR UN MENSAJE MIENTRAS SE CARGAN LOS DATOS

    mensajeEstado.textContent = "Cargando plantas...";

    try {

        // CONSULTAR LA API

        plantas = await obtenerPlantas();

        // COMPROBAR QUE LA RESPUESTA SEA UN ARRAY

        if (!Array.isArray(plantas)) {
            throw new Error("La respuesta de la API no es válida");
        }

        mensajeEstado.textContent = "";

        // MOSTRAR LAS PLANTAS

        aplicarFiltros();

    } catch (error) {

        // SI FALLA LA CONSULTA, MOSTRAR EL ERROR EN CONSOLA

        console.error("Error al consultar la API:", error);

        // UTILIZAR LOS DATOS DE RESPALDO
        // TAMBIEN APLICAR LOS CAMBIOS DEL LOCALSTORAGE

        try {

            plantas = aplicarCambiosLocales(
                JSON.parse(obtenerPlantasRespaldo())
            );

            // AVISAR QUE SE ESTAN MOSTRANDO LOS DATOS DE RESPALDO

            mensajeEstado.textContent =
                "No se pudo conectar con el servidor. Estamos mostrando los datos de respaldo.";

            aplicarFiltros();

        } catch (errorRespaldo) {

            // SI TAMPOCO SE PUEDEN CARGAR LOS DATOS DE RESPALDO, MOSTRAR EL ERROR

            console.error("Error al cargar los datos de respaldo:", errorRespaldo);

            plantas = [];

            mensajeEstado.textContent =
                "No se pudieron cargar las plantas.";

            contador.textContent = "No hay plantas disponibles";

            sinResultados.hidden = false;

        }

    }

}


// CARGAR EL CATALOGO AL INGRESAR

cargarPlantas();