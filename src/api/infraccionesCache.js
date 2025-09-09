// src/api/infraccionesCache.js
let infraccionesData = null;

export function setInfracciones(infracciones) {
  infraccionesData = infracciones;
}

export function getInfracciones() {
  return infraccionesData;
}
