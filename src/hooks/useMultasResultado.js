import { useState, useRef, useEffect } from 'react';
import { getInfracciones } from '../api/infraccionesCache';
import { getUser, getDocumentInfo } from '../api/userCache';

// Hook para encapsular lógica de MultasResultadoScreen
export default function useMultasResultado(navigation, route) {
  const multasInitial = route?.params?.multas || getInfracciones() || [];
  const cachedUser = getUser();
  const cachedDoc = getDocumentInfo();

  const displayName = route?.params?.userName || cachedUser?.userName || `${cachedUser?.firstName || ''} ${cachedUser?.lastName || ''}`.trim();
  const docNumber = route?.params?.numeroDocumento || route?.params?.documentNumber || cachedDoc?.numeroDocumento || cachedDoc?.documentNumber || '';

  const [query, setQuery] = useState('');
  const [filteredMultas, setFilteredMultas] = useState(multasInitial || []);
  const [selectedIds, setSelectedIds] = useState([]);

  const debounceRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setFilteredMultas(multasInitial || []);
  }, [multasInitial]);

  const showInactivityAlert = () => {
    // Reuse same UX as screens: reset to Bienvenida or keep session
    // Note: keep Alert call here to preserve UI surface
    // Importing Alert here would create a native dependency; instead call navigation.reset directly on timeout
    navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] });
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    // keep 5 minutos as original
    timerRef.current = setTimeout(() => {
      // show the alert by navigating to Bienvenida (keeps behavior consistent)
      showInactivityAlert();
    }, 300000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const formatCurrency = (value) => {
    const n = Number(value || 0);
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  };

  const resumen = (items = []) => {
    const lista = items || [];
    const total = lista.reduce((acc, it) => {
      const price = Number(it.value ?? it.amount ?? it.total ?? 0);
      acc += isNaN(price) ? 0 : price;
      return acc;
    }, 0);
    return { count: lista.length, total };
  };

  const onQueryChange = (text) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = String(text || '').trim().toLowerCase();
      if (!q) return setFilteredMultas(multasInitial || []);
      const filtered = (multasInitial || []).filter(m => {
        const tipo = String(m?.typeInfractionName || '').toLowerCase();
        const obs = String(m?.observations || '').toLowerCase();
        const uname = String(m?.userName || m?.user?.userName || '').toLowerCase();
        return tipo.includes(q) || obs.includes(q) || uname.includes(q);
      });
      setFilteredMultas(filtered);
    }, 150);
  };

  return {
    displayName,
    docNumber,
    query,
    setQuery,
    onQueryChange,
    filteredMultas,
    setFilteredMultas,
    selectedIds,
    toggleSelect,
    resetTimer,
    formatCurrency,
    resumen,
  };
}
