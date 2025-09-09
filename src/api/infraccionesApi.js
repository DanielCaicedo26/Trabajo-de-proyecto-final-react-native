// src/api/infraccionesApi.js
// Lógica para consumir la API de infracciones

const API_URL = 'http://192.168.1.7:5162/api/UserInfraction/by-document';

export async function consultarInfracciones(documentTypeId, documentNumber) {
  try {
    const url = `${API_URL}?documentTypeId=${encodeURIComponent(documentTypeId)}&documentNumber=${encodeURIComponent(documentNumber)}`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error al consultar las infracciones');
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    throw error;
  }
}
