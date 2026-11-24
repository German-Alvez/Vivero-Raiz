// DIRECCION DE LA API DONDE ESTAN GUARDADAS LAS PLANTAS

const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";

// NOMBRE QUE USAMOS PARA GUARDAR LOS CAMBIOS EN EL NAVEGADOR

const CLAVE_LOCAL = "plantasViveroRaiz";


// LEER LOS CAMBIOS GUARDADOS EN LOCALSTORAGE

function leerCambiosLocales() {

    // BUSCAR SI YA HAY DATOS GUARDADOS CON ESTA CLAVE

    const datos = localStorage.getItem(CLAVE_LOCAL);

    // SI HAY DATOS, LOS CONVERTIMOS A OBJETO; SI NO, CREAMOS LAS LISTAS VACIAS

    return datos ? JSON.parse(datos) : {
        agregadas: [],
        editadas: [],
        eliminadas: []
    };
}


// GUARDAR LOS CAMBIOS EN LOCALSTORAGE

function guardarCambiosLocales(cambios) {

    // CONVERTIR LOS DATOS A TEXTO PARA PODER GUARDARLOS

    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(cambios));

}


// COMBINAR PLANTAS DE LA API CON LAS LOCALES

function aplicarCambiosLocales(plantasAPI) {

    // TRAER LOS CAMBIOS QUE SE GUARDARON EN EL NAVEGADOR

    const cambios = leerCambiosLocales();

    // QUITAR DE LA LISTA LAS PLANTAS QUE FUERON ELIMINADAS

    let resultado = plantasAPI.filter(function(planta) {

        return !cambios.eliminadas.includes(String(planta.id));

    });

    // REEMPLAZAR LOS DATOS DE LAS PLANTAS QUE FUERON EDITADAS

    resultado = resultado.map(function(planta) {

        const modificada = cambios.editadas.find(function(item) {

            return String(item.id) === String(planta.id);

        });

        // SI ENCUENTRA UNA VERSION MODIFICADA, USA ESA; SI NO, DEJA LA ORIGINAL

        return modificada || planta;

    });

    // AGREGAR A LA LISTA LAS PLANTAS NUEVAS QUE SE GUARDARON LOCALMENTE

    return resultado.concat(cambios.agregadas);

}


// CONSULTAR TODAS LAS PLANTAS (GET)

async function obtenerPlantas() {

    // HACER LA CONSULTA A LA API

    const response = await fetch(URL_API);

    // COMPROBAR SI LA RESPUESTA FUE CORRECTA

    if (!response.ok) {
        throw new Error(`Error al consultar: HTTP ${response.status}`);
    }

    // CONVERTIR LA RESPUESTA A FORMATO JSON

    const plantasAPI = await response.json();

    // DEVOLVER LAS PLANTAS JUNTO CON LOS CAMBIOS LOCALES

    return aplicarCambiosLocales(plantasAPI);

}


// AGREGAR UNA PLANTA (LOCALSTORAGE)

async function agregarPlanta(planta) {

    // LEER LOS CAMBIOS QUE YA TENEMOS GUARDADOS

    const cambios = leerCambiosLocales();

    // CREAR UN ID PROPIO PARA IDENTIFICAR LA NUEVA PLANTA

    const nuevaPlanta = {
        ...planta,
        id: "local-" + Date.now()
    };

    // AGREGAR LA PLANTA A LA LISTA DE NUEVAS PLANTAS

    cambios.agregadas.push(nuevaPlanta);

    // GUARDAR LA LISTA ACTUALIZADA

    guardarCambiosLocales(cambios);

    return nuevaPlanta;

}


// EDITAR UNA PLANTA (LOCALSTORAGE)

async function editarPlanta(id, planta) {

    // LEER LOS CAMBIOS GUARDADOS

    const cambios = leerCambiosLocales();

    // ARMAR LA PLANTA CON LOS DATOS NUEVOS Y CONSERVAR SU ID

    const modificada = {
        ...planta,
        id: id
    };

    // BUSCAR SI LA PLANTA ESTA ENTRE LAS QUE AGREGAMOS LOCALMENTE

    const indice = cambios.agregadas.findIndex(function(item) {

        return String(item.id) === String(id);

    });

    // SI ES UNA PLANTA AGREGADA LOCALMENTE

    if (indice !== -1) {

        // REEMPLAZAR SUS DATOS POR LOS NUEVOS

        cambios.agregadas[indice] = modificada;

    } else {

        // SI VIENE DE LA API, BUSCAR SI YA HABIA SIDO EDITADA ANTES

        const indiceEditada = cambios.editadas.findIndex(function(item) {

            return String(item.id) === String(id);

        });

        if (indiceEditada !== -1) {

            // SI YA EXISTIA UNA MODIFICACION, ACTUALIZARLA

            cambios.editadas[indiceEditada] = modificada;

        } else {

            // SI ES LA PRIMERA VEZ QUE SE EDITA, AGREGARLA A LA LISTA

            cambios.editadas.push(modificada);

        }

    }

    // GUARDAR LOS CAMBIOS

    guardarCambiosLocales(cambios);

    return modificada;

}


// ELIMINAR UNA PLANTA (LOCALSTORAGE)

async function eliminarPlanta(id) {

    // LEER LOS CAMBIOS GUARDADOS

    const cambios = leerCambiosLocales();

    // BUSCAR SI LA PLANTA FUE AGREGADA LOCALMENTE

    const indice = cambios.agregadas.findIndex(function(item) {

        return String(item.id) === String(id);

    });

    // SI ES UNA PLANTA AGREGADA LOCALMENTE

    if (indice !== -1) {

        // QUITARLA DIRECTAMENTE DE LA LISTA

        cambios.agregadas.splice(indice, 1);

    } else {

        // SI VIENE DE LA API, GUARDAR SU ID EN LA LISTA DE ELIMINADAS

        cambios.eliminadas.push(String(id));

        // QUITAR TAMBIEN CUALQUIER MODIFICACION QUE TUVIERA

        cambios.editadas = cambios.editadas.filter(function(item) {

            return String(item.id) !== String(id);

        });

    }

    // GUARDAR LOS CAMBIOS ACTUALIZADOS

    guardarCambiosLocales(cambios);

    return true;

}