
// Simula la respuesta de una API: devuelve el catálogo como texto JSON.
// Más adelante se reemplaza por un fetch al servidor.


// Es un respaldo, para apis.js

function obtenerPlantasRespaldo()  {
    return `[
        { "id": 1, "nombre": "Sansevieria", "nombreCientifico": "Sansi", "categoria": "interior", "luz": "media sombra", "riego": "medio", "precio": 18500, "stock": 12, "fechaIngreso": "2026-03-10", "aptaMascotas": false, "etiquetas": ["purificadora"], "foto": "img/sansevieria.jpg", "notas": "Limpiar las hojas con un paño húmedo." },

        { "id": 2, "nombre": "Suculenta", "nombreCientifico": "Sucu", "categoria": "exterior", "luz": "sol pleno", "riego": "bajo", "precio": 6200, "stock": 30, "fechaIngreso": "2026-04-02", "aptaMascotas": true, "etiquetas": ["floración", "resistente"], "foto": "img/suculenta.jpg", "notas": "Podar después de la floración." },

        { "id": 3, "nombre": "Suculenta", "nombreCientifico": "Sucu", "categoria": "suculenta", "luz": "sol pleno", "riego": "bajo", "precio": 3900, "stock": 45, "fechaIngreso": "2026-02-18", "aptaMascotas": true, "etiquetas": ["resistente"], "foto": "img/suculenta.jpg", "notas": "Regar sólo con el sustrato seco." },

        { "id": 4, "nombre": "Palmera", "nombreCientifico": "Palmerita", "categoria": "interior", "luz": "sombra", "riego": "medio", "precio": 5400, "stock": 0, "fechaIngreso": "2026-01-25", "aptaMascotas": false, "etiquetas": ["colgante", "purificadora"], "foto": "img/palmera.jpg", "notas": "" },

        { "id": 5, "nombre": "Palmera", "nombreCientifico": "Palmerita", "categoria": "exterior", "luz": "sol pleno", "riego": "alto", "precio": 9800, "stock": 8, "fechaIngreso": "2026-05-14", "aptaMascotas": true, "etiquetas": ["floración"], "foto": "img/palmera.jpg", "notas": "Necesita guía para trepar." },

        { "id": 6, "nombre": "Sansevieria", "nombreCientifico": "Sansi", "categoria": "interior", "luz": "media sombra", "riego": "alto", "precio": 7300, "stock": 15, "fechaIngreso": "2026-06-01", "aptaMascotas": true, "etiquetas": ["colgante", "purificadora"], "foto": "img/sansevieria.jpg", "notas": "Pulverizar en verano." }
    ]`;
}
