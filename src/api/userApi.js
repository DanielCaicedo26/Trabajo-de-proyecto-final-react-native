// src/api/userApi.js
// Lógica para consumir la API de usuarios
import { API_HOST } from './config';

const API_URL = `${API_HOST}/api/Users`;


// Traer todos los usuarios y buscar por tipo y número de documento
export async function buscarUsuarioPorDocumento(documentTypeId, documentNumber) {
  try {
  const url = `${API_URL}?getAllType=GetAll`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      let message = `Error al consultar los usuarios (HTTP ${response.status})`;
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
    const users = await response.json();
    console.log('Usuarios recibidos:', users);
    console.log('Buscando:', { documentTypeId, documentNumber });
    const encontrado = users.find(u => {
      console.log('Comparando con usuario:', u);
      return String(u.documentTypeId) === String(documentTypeId) && String(u.documentNumber) === String(documentNumber);
    }) || null;
    console.log('Usuario encontrado:', encontrado);
    return encontrado;
  } catch (error) {
    if (error && error.message === 'Network request failed') {
      throw new Error('No se pudo conectar con el servidor de usuarios. Verifica que el backend esté activo y accesible desde el dispositivo.');
    }
    throw error;
  }
}
