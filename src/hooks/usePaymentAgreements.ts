import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUser, getDocumentInfo } from '../api/userCache';
import { fetchPaymentAgreementsByDocument } from '../api/paymentAgreementApi';

interface PaymentAgreement {
  id: string | number;
  personName?: string;
  documentNumber?: string;
  document?: string;
  typeFine?: string;
  infringement?: string;
  isPaid?: boolean;
  outstandingAmount?: number;
  [key: string]: any;
}

interface ExpandedItems {
  [key: string]: boolean;
  [key: number]: boolean;
}

interface UsePaymentAgreementsReturn {
  loading: boolean;
  agreementsData: PaymentAgreement[];
  filteredData: PaymentAgreement[];
  query: string;
  setQuery: (query: string) => void;
  expandedItems: ExpandedItems;
  toggleExpanded: (agreementId: string | number) => void;
  fetchPaymentAgreements: () => Promise<void>;
  resetTimer: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string | null | undefined) => string;
}

export default function usePaymentAgreements(navigation: any): UsePaymentAgreementsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [agreementsData, setAgreementsData] = useState<PaymentAgreement[]>([]);
  const [filteredData, setFilteredData] = useState<PaymentAgreement[]>([]);
  const [query, setQuery] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Función para obtener acuerdos de pago
  const fetchPaymentAgreements = useCallback(async () => {
    setLoading(true);
    try {
      const user = getUser();
      const docInfo = getDocumentInfo();
      const userDocumentNumber = 
        docInfo?.numeroDocumento || 
        docInfo?.documentNumber || 
        user?.documentNumber;

      if (!userDocumentNumber) {
        Alert.alert(
          'Información requerida', 
          'No se encontró información del usuario. Por favor, realice una consulta de multas primero.'
        );
        setLoading(false);
        return;
      }

      const userAgreements = await fetchPaymentAgreementsByDocument(userDocumentNumber);
      setAgreementsData(userAgreements);
      setFilteredData(userAgreements);
    } catch (err: any) {
      console.error('Error fetching payment agreements:', err);
      Alert.alert(
        'Error', 
        `No se pudieron cargar los acuerdos de pago: ${err.message}`
      );
      setAgreementsData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para expandir/contraer acordeones
  const toggleExpanded = useCallback((agreementId: string | number) => {
    setExpandedItems(prev => ({ 
      ...prev, 
      [agreementId]: !prev[agreementId] 
    }));
  }, []);

  // Función para formatear moneda
  const formatCurrency = useCallback((amount: number): string => {
    if (typeof amount !== 'number' || isNaN(amount)) return '$ 0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  // Función para formatear fechas
  const formatDate = useCallback((dateString: string | null | undefined): string => {
    if (!dateString) return 'No especificada';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }, []);

  // Función para mostrar alerta de inactividad
  const showInactivityAlert = useCallback(() => {
    Alert.alert(
      'Sesión inactiva',
      '¿Deseas continuar en la sesión o cerrar por inactividad?',
      [
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            if (navigation?.reset) {
              navigation.reset({ 
                index: 0, 
                routes: [{ name: 'Bienvenida' }] 
              });
            } else {
              navigation?.navigate('Bienvenida');
            }
          },
        },
        {
          text: 'Continuar',
          style: 'cancel',
          onPress: () => {
            resetTimer();
          },
        },
      ],
      { cancelable: false }
    );
  }, [navigation]);

  // Función para resetear el timer de inactividad
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(showInactivityAlert, 300000); // 5 minutos
  }, [showInactivityAlert]);

  // Efecto inicial: cargar datos
  useEffect(() => {
    fetchPaymentAgreements();
    resetTimer();
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Efecto de búsqueda con debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const q = String(query || '').trim().toLowerCase();
      
      if (!q) {
        setFilteredData(agreementsData);
        return;
      }

      const filtered = agreementsData.filter((item: PaymentAgreement) => {
        const personName = String(item.personName || '').toLowerCase();
        const documentNumber = String(item.documentNumber || item.document || '').toLowerCase();
        const typeFine = String(item.typeFine || '').toLowerCase();
        const infringement = String(item.infringement || '').toLowerCase();
        const agreementId = String(item.id || '').toLowerCase();

        return (
          personName.includes(q) ||
          documentNumber.includes(q) ||
          typeFine.includes(q) ||
          infringement.includes(q) ||
          agreementId.includes(q)
        );
      });

      setFilteredData(filtered);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, agreementsData]);

  // Efecto para mantener timer activo cuando la pantalla gana foco
  useEffect(() => {
    const unsubscribe = navigation?.addListener?.('focus', () => {
      resetTimer();
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigation, resetTimer]);

  return {
    loading,
    agreementsData,
    filteredData,
    query,
    setQuery,
    expandedItems,
    toggleExpanded,
    fetchPaymentAgreements,
    resetTimer,
    formatCurrency,
    formatDate,
  };
}
