import { useState } from 'react';
import useInactivity from './useInactivity';

const defaultMultas = [
  { id: 1, nombre: 'Multa Tipo 1', smdlv: 2 },
  { id: 2, nombre: 'Multa Tipo 2', smdlv: 4 },
  { id: 3, nombre: 'Multa Tipo 3', smdlv: 3 },
  { id: 4, nombre: 'Multa Tipo 4', smdlv: 16 },
];

export default function useConsultaSmlv(navigation) {
  const [multas] = useState(defaultMultas);
  const { resetTimer } = useInactivity(navigation, 'Bienvenida');
  return { multas, resetTimer };
}
