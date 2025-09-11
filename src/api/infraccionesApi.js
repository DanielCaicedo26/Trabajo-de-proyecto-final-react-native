// src/api/infraccionesApi.js
// Lógica para consumir la API de infracciones
import { API_HOST } from './config';

// El backend expone los filtros como query string sobre /api/UserInfraction
const API_URL = `${API_HOST}/api/UserInfraction`;

export async function consultarInfracciones(documentTypeId, documentNumber) {
  try {
    const url = `${API_URL}?documentTypeId=${encodeURIComponent(documentTypeId)}&documentNumber=${encodeURIComponent(documentNumber)}`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      let message = `Error al consultar las infracciones (HTTP ${response.status})`;
      try {
        const err = await response.json();
        if (err && (err.message || err.error)) {
          message += `: ${err.message || err.error}`;
        }
      } catch (_) {
        // Ignorar error al parsear
      }
      throw new Error(message);
    }
  const result = await response.json();
  // El backend puede responder un array directo o un objeto con { data }
  return Array.isArray(result) ? result : (result?.data ?? []);
  } catch (error) {
    // Agregar contexto si es un fallo de red
    if (error && error.message === 'Network request failed') {
      throw new Error('No se pudo conectar con el servidor de infracciones. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
