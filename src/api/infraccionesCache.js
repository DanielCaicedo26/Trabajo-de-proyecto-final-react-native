
// Cache simple para almacenar las infracciones consultadas
let infraccionesData = null;

/**
 * Guarda las infracciones en el cache local.
 * @param {Array} infracciones - Lista de infracciones
 */
export function setInfracciones(infracciones) {
  infraccionesData = infracciones;
}

/**
 * Obtiene las infracciones almacenadas en el cache.
 * @returns {Array|null} - Lista de infracciones o null si no hay datos
 */
export function getInfracciones() {
  return infraccionesData;
}
