// src/api/userApi.js
// Lógica para consumir la API de usuarios


const API_URL = 'http://192.168.1.7:5162/api/Users';


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
      throw new Error('Error al consultar los usuarios');
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
    throw error;
  }
}
