
// Módulo para consumir la API de usuarios
import { API_HOST } from './config';

// URL base para las consultas de usuarios
const API_URL = `${API_HOST}/api/Users`;

/**
 * Busca un usuario por tipo y número de documento.
 * @param {string} documentTypeId - ID del tipo de documento
 * @param {string} documentNumber - Número de documento
 * @returns {Promise<Object|null>} - Usuario encontrado o null si no existe
 */
export async function buscarUsuarioPorDocumento(documentTypeId, documentNumber) {
  try {
    // Consultar todos los usuarios
    const url = `${API_URL}?getAllType=GetAll`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      }
    });
    // Validar respuesta HTTP
    if (!response.ok) {
      let message = `Error al consultar los usuarios (HTTP ${response.status})`;
      try {
        const err = await response.json();
        if (err && (err.message || err.error)) {
          message += `: ${err.message || err.error}`;
        }
      } catch (_) {
        // Ignorar error al parsear JSON de error
      }
      throw new Error(message);
    }
    // Procesar la respuesta y buscar el usuario por documento
    const users = await response.json();
    const encontrado = users.find(u => {
      return String(u.documentTypeId) === String(documentTypeId) && String(u.documentNumber) === String(documentNumber);
    }) || null;
    return encontrado;
  } catch (error) {
    // Manejo de error de red
    if (error && error.message === 'Network request failed') {
      throw new Error('No se pudo conectar con el servidor de usuarios. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
