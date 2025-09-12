
// Cache simple para almacenar datos de usuario y documento
let userData = null;
let documentInfo = null;

/**
 * Guarda el usuario en el cache local.
 * @param {Object} user - Datos del usuario
 */
export function setUser(user) {
  userData = user;
}

/**
 * Obtiene el usuario almacenado en el cache.
 * @returns {Object|null} - Usuario o null si no hay datos
 */
export function getUser() {
  return userData;
}

/**
 * Guarda la información del documento en el cache local.
 * @param {Object} docInfo - Información del documento
 */
export function setDocumentInfo(docInfo) {
  documentInfo = docInfo;
}

/**
 * Obtiene la información del documento almacenada en el cache.
 * @returns {Object|null} - Información del documento o null si no hay datos
 */
export function getDocumentInfo() {
  return documentInfo;
}
