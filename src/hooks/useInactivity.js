import { useRef, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

export default function useInactivity(navigation, routeName = 'Bienvenida', timeoutMs = 300000) {
  const timerRef = useRef(null);

  const showInactivityAlert = useCallback(() => {
    Alert.alert(
      'Inactividad',
      '¿Deseas continuar en la sesión o cerrar la aplicación por inactividad?',
      [
        {
          text: 'Cerrar aplicación',
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: routeName }] }),
        },
        {
          text: 'Seguir en la sesión',
          style: 'cancel',
          onPress: () => {
            resetTimer();
          },
        },
      ]
    );
  }, [navigation, routeName]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(showInactivityAlert, timeoutMs);
  }, [showInactivityAlert, timeoutMs]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    resetTimer();
    return () => stopTimer();
  }, [resetTimer, stopTimer]);

  return { resetTimer, stopTimer, timerRef };
}
