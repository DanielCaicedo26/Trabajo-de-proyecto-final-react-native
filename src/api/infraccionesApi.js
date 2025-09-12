
// Módulo para consumir la API de infracciones
import { API_HOST } from './config';

// URL base para las consultas de infracciones
const API_URL = `${API_HOST}/api/UserInfraction`;

/**
 * Consulta las infracciones de un usuario por tipo y número de documento.
 * @param {string} documentTypeId - ID del tipo de documento
 * @param {string} documentNumber - Número de documento
 * @returns {Promise<Array>} - Lista de infracciones encontradas
 */
export async function consultarInfracciones(documentTypeId, documentNumber) {
  try {
    // Construir la URL con los parámetros necesarios
    const url = `${API_URL}?documentTypeId=${encodeURIComponent(documentTypeId)}&documentNumber=${encodeURIComponent(documentNumber)}`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      }
    });
    // Validar respuesta HTTP
    if (!response.ok) {
      let message = `Error al consultar las infracciones (HTTP ${response.status})`;
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
    // Procesar la respuesta: puede ser un array directo o un objeto con { data }
    const result = await response.json();
    return Array.isArray(result) ? result : (result?.data ?? []);
  } catch (error) {
    // Manejo de error de red
    if (error && error.message === 'Network request failed') {
      throw new Error('No se pudo conectar con el servidor de infracciones. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
