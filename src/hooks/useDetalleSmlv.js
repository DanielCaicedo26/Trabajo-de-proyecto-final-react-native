import { useMemo } from 'react';
import useInactivity from './useInactivity';

const SALARIO_MINIMO = 143500;

export default function useDetalleSmlv(navigation, smdlvFromRoute) {
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Bienvenida', 10000);

  const SMLDV = Math.round(SALARIO_MINIMO / 30);

  const smdlv = smdlvFromRoute ?? 2;

  const valores = useMemo(() => {
    const valorSmdlv = SMLDV;
    const valorTotal = valorSmdlv * smdlv;

    return {
      SALARIO_MINIMO,
      SMLDV,
      smdlv,
      valorSmdlv,
      valorTotal,
      formatos: {
        salarioTexto: `$${SALARIO_MINIMO.toLocaleString('es-CO')}`,
        calculoSmdlvTexto: `$${SALARIO_MINIMO.toLocaleString('es-CO')}/30`,
        valorSmdlvTexto: `${valorSmdlv.toLocaleString('es-CO')}`,
        valorTotalTexto: `$${valorTotal.toLocaleString('es-CO')}`,
      },
    };
  }, [smdlv]);

  return { ...valores, resetTimer, stopTimer };
}
