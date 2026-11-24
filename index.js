
// Array con las categorías
const categorias = [

    {
        nombre: "Interior",
        imagen: "img/sansevieria.jpg",
        descripcion: "Para ambientes con luz indirecta y poco viento."
    },

    {
        nombre: "Exterior",
        imagen: "img/palmera.jpg",
        descripcion: "Resisten sol pleno, lluvia y temperaturas."
    },

    {
        nombre: "Suculentas",
        imagen: "img/suculenta.jpg",
        descripcion: "Riego cada quince días. Ideales para empezar."
    }

];


// FUNCION 1: crear una tarjeta
function crearTarjetaCategoria(categoria) {

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
        <img src="${categoria.imagen}" alt="${categoria.nombre}">

        <h3>${categoria.nombre}</h3>

        <p>${categoria.descripcion}</p>

        <a href="catalogo.html" class="btn">
            Ver Plantas
        </a>
    `;

    return tarjeta;
}


// FUNCION 2: mostrar todas las categorIas
function mostrarCategorias(lista) {

    const contenedor = document.getElementById("contenedor-cards");

    contenedor.innerHTML = "";

    lista.forEach(function(categoria) {

        const tarjeta = crearTarjetaCategoria(categoria);

        contenedor.appendChild(tarjeta);

    });

}


// Mostrar las categorías al ingresar
mostrarCategorias(categorias);
