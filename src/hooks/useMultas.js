import { useState, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { consultarInfracciones } from '../api/infraccionesApi';
import { buscarUsuarioPorDocumento } from '../api/userApi';
import { setDocumentInfo, setUser } from '../api/userCache';
import { setInfracciones } from '../api/infraccionesCache';

export default function useMultas(navigation) {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timerRef = useRef(null);

  const tipoDocumentoIdMap = {
    cc: 1,
    ce: 2,
    ti: 3
  };

  const showInactivityAlert = useCallback(() => {
    Alert.alert(
      'Inactividad',
      '¿Deseas continuar en la sesión o cerrar sesión por inactividad?',
      [
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] }),
        },
        {
          text: 'Seguir en la sesión',
          style: 'cancel',
          onPress: () => resetTimer(),
        },
      ]
    );
  }, [navigation]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(showInactivityAlert, 300000); // 5 minutos
  }, [showInactivityAlert]);

  const handleConsultarMultas = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const documentTypeId = tipoDocumentoIdMap[tipoDocumento];
      if (!documentTypeId || !numeroDocumento) {
        setError('Selecciona tipo y número de documento.');
        setLoading(false);
        return;
      }
      setDocumentInfo({ documentTypeId, numeroDocumento });
      const usuario = await buscarUsuarioPorDocumento(documentTypeId, numeroDocumento);
      if (!usuario) {
        setError('No existe un usuario con ese documento.');
        setLoading(false);
        return;
      }
      const multas = await consultarInfracciones(documentTypeId, numeroDocumento);
      const multasUsuario = (Array.isArray(multas) ? multas : []).filter(m => {
        if (usuario?.id != null && m?.userId != null) {
          return String(m.userId) === String(usuario.id);
        }
        if (usuario?.userName && m?.userName) {
          return String(m.userName).trim().toLowerCase() === String(usuario.userName).trim().toLowerCase();
        }
        return false;
      });
      if (!multasUsuario || multasUsuario.length === 0) {
        setUser(usuario);
        setError('No se encontraron multas para este documento.');
        setLoading(false);
        return;
      }
      const firstInfraction = multasUsuario[0];
      let firstName = firstInfraction?.firstName;
      let lastName = firstInfraction?.lastName;
      if ((!firstName || !lastName) && firstInfraction?.userName) {
        const parts = String(firstInfraction.userName).trim().split(/\s+/);
        firstName = firstName || (parts[0] || '');
        lastName = lastName || (parts.slice(1).join(' ') || '');
      }
      const enrichedUser = {
        ...usuario,
        userName: firstInfraction?.userName || usuario?.userName,
        firstName: firstName || usuario?.firstName || '',
        lastName: lastName || usuario?.lastName || '',
      };
      setUser(enrichedUser);
      setInfracciones(multasUsuario);
      navigation.navigate('MultasResultado', { multas: multasUsuario });
    } catch (err) {
      setError('Error: ' + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  }, [tipoDocumento, numeroDocumento, navigation]);

  return {
    tipoDocumento,
    setTipoDocumento,
    numeroDocumento,
    setNumeroDocumento,
    acceptedTerms,
    setAcceptedTerms,
    showTermsModal,
    setShowTermsModal,
    loading,
    error,
    setError,
    handleConsultarMultas,
    resetTimer,
    timerRef,
    tipoDocumentoIdMap,
  };
}
