import { useMemo } from 'react';
import useInactivity from './useInactivity';

export default function useDetalleLey(navigation, leyFromRoute) {
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Bienvenida', 10000);

  const ley = useMemo(() => {
    if (!leyFromRoute) return null;

    // Pasar algunos formatos básicos si fueran necesarios
    return {
      ...leyFromRoute,
      descripcion: leyFromRoute.descripcion || '-',
      textoCompleto: leyFromRoute.textoCompleto || '-',
      multa: leyFromRoute.multa || null,
      articulos: leyFromRoute.articulos || null,
    };
  }, [leyFromRoute]);

  return { ley, resetTimer, stopTimer };
}
