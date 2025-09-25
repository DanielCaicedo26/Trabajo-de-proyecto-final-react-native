
// Módulo para consumir la API de infracciones
import { API_HOST } from './config';

// URL base para las consultas de infracciones
const API_URL = `${API_HOST}/api/UserInfraction`;

/**
 * Obtiene la lista de infracciones desde el backend.
 * El backend expone `/api/UserInfraction` y admite el query `getAllType=GetAll` para devolver todos los registros.
 * La función no asume que el servidor acepte filtros por documento; la pantalla cliente realiza el filtrado por usuario.
 * @returns {Promise<Array>} - Lista de infracciones encontradas
 */
export async function consultarInfracciones(/* documentTypeId, documentNumber */) {
  try {
    // Pedir todas las infracciones; el filtrado por documento/usuario se hace en el cliente.
    const url = `${API_URL}?getAllType=GetAll`;
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
    return Array.isArray(result) ? result : result?.data ?? [];
  } catch (error) {
    // Manejo de error de red
    if (error && error.message === 'Network request failed') {
      throw new Error('No se pudo conectar con el servidor de infracciones. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
