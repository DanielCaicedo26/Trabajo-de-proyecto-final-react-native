import { useMemo } from 'react';
import useInactivity from './useInactivity';

// Hook para encapsular lógica mínima de DetalleInfraccion
export default function useDetalleInfraccion(navigation, infraccionFromRoute) {
  // Reuse the common inactivity hook (default timeout 10s like used elsewhere)
  const { resetTimer, stopTimer } = useInactivity(navigation, 'Bienvenida', 10000);

  const infraccion = useMemo(() => {
    if (!infraccionFromRoute) return null;

    // Formateos simples que estaban inline en la pantalla
    const formatCurrency = (value) => {
      if (value == null) return '-';
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };

    const formatDate = (iso) => {
      if (!iso) return '-';
      try {
        const d = new Date(iso);
        return d.toLocaleDateString('es-CO');
      } catch (e) {
        return iso;
      }
    };

    return {
      ...infraccionFromRoute,
      fechaTexto: formatDate(infraccionFromRoute.fecha),
      valorTexto: formatCurrency(infraccionFromRoute.valor),
    };
  }, [infraccionFromRoute]);

  return {
    infraccion,
    resetTimer,
    stopTimer,
  };
}
