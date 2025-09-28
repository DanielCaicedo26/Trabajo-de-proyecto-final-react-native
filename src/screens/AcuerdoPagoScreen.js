import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AcuerdoPagoScreenStyles';
import { API_HOST } from '../api/config';
import { getUser, getDocumentInfo } from '../api/userCache';
import { useFocusEffect } from '@react-navigation/native';

const AcuerdoPagoScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [agreementsData, setAgreementsData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const timerRef = useRef(null);

  const fetchPaymentAgreements = async () => {
    setLoading(true);
    try {
      // Obtener información del usuario logueado
      const user = getUser();
      const docInfo = getDocumentInfo();

      // Obtener el número de documento del usuario logueado
      const userDocumentNumber = docInfo?.numeroDocumento || docInfo?.documentNumber || user?.documentNumber;

      if (!userDocumentNumber) {
        Alert.alert('Error', 'No se encontró información del usuario. Por favor, realice una consulta de multas primero.');
        setLoading(false);
        return;
      }

      // Usar la nueva URL de la API
      const res = await fetch(`${API_HOST}/api/PaymentAgreement`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // Si es un array, usarlo directamente, si no, convertir a array
      const allAgreements = Array.isArray(json) ? json : [json];

      // Filtrar solo los acuerdos del usuario logueado
      const userAgreements = allAgreements.filter(agreement => {
        return String(agreement.documentNumber || '').trim() === String(userDocumentNumber).trim();
      });

      setAgreementsData(userAgreements);

      if (userAgreements.length === 0) {
        console.log('No se encontraron acuerdos para el usuario:', userDocumentNumber);
      }
    } catch (err) {
      Alert.alert('Error', `No se pudieron cargar los acuerdos de pago: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (agreementId) => {
    setExpandedItems(prev => ({
      ...prev,
      [agreementId]: !prev[agreementId]
    }));
  };

  useEffect(() => {
    fetchPaymentAgreements();
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetTimer();
    }, [])
  );

  const showInactivityAlert = () => {
    Alert.alert(
      'Inactividad',
      '¿Deseas continuar en la sesión o cerrar sesión por inactividad?',
      [
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] });
          },
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
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(showInactivityAlert, 300000); // 5 minutos
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderAgreementItem = ({ item, index }) => {
    const isExpanded = expandedItems[item.id] || false;
    const agreementNumber = index + 1;

    return (
      <View style={styles.accordionContainer}>
        {/* Header del acordeón */}
        <TouchableOpacity
          style={[styles.accordionHeader, isExpanded && styles.accordionHeaderExpanded]}
          onPress={() => toggleExpanded(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[styles.accordionIcon, { backgroundColor: item.isPaid ? '#4CAF50' : '#01763C' }]}>
              <Ionicons
                name={item.isPaid ? "checkmark-circle" : "time"}
                size={24}
                color="#fff"
              />
            </View>
            <View style={styles.accordionHeaderText}>
              <Text style={styles.accordionTitle}>Acuerdo #{agreementNumber}</Text>
              <Text style={styles.accordionSubtitle}>
                {item.typeFine} • {formatCurrency(item.outstandingAmount)}
              </Text>
              <Text style={styles.accordionStatus}>
                {item.isPaid ? 'Pagado' : 'Pendiente'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#6B9080"
          />
        </TouchableOpacity>

        {/* Contenido expandible */}
        {isExpanded && (
          <View style={styles.accordionContent}>
            {/* Información Personal */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={20} color="#01763C" />
                <Text style={styles.sectionTitle}>Información Personal</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Nombre:</Text>
                  <Text style={styles.infoValue}>{item.personName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Documento:</Text>
                  <Text style={styles.infoValue}>{item.documentNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Teléfono:</Text>
                  <Text style={styles.infoValue}>{item.phoneNumber}</Text>
                </View>
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Dirección:</Text>
                  <Text style={styles.infoValueDescription}>{item.address}, {item.neighborhood}</Text>
                </View>
              </View>
            </View>

            {/* Detalles de la Infracción */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="warning-outline" size={20} color="#FF6B35" />
                <Text style={styles.sectionTitle}>Detalles de la Infracción</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tipo:</Text>
                  <Text style={styles.infoValue}>{item.typeFine}</Text>
                </View>
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Descripción:</Text>
                  <Text style={styles.infoValueDescription}>{item.infringement}</Text>
                </View>
              </View>
            </View>

            {/* Información del Acuerdo */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={20} color="#2196F3" />
                <Text style={styles.sectionTitle}>Detalles del Acuerdo</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vigencia:</Text>
                  <Text style={styles.infoValue}>{formatDate(item.agreementStart)} - {formatDate(item.agreementEnd)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Método de Pago:</Text>
                  <Text style={styles.infoValue}>{item.paymentMethod}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cuotas:</Text>
                  <Text style={styles.infoValue}>{item.installments}</Text>
                </View>
              </View>
            </View>

            {/* Información Financiera */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="cash-outline" size={20} color="#4CAF50" />
                <Text style={styles.sectionTitle}>Información Financiera</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Monto Base:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.baseAmount)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cuota Mensual:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.monthlyFee)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Saldo Pendiente:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.outstandingAmount)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Proceso Coactivo:</Text>
                  <Text style={[styles.infoValue, { color: item.isCoactive ? '#F44336' : '#4CAF50' }]}>
                    {item.isCoactive ? 'Activo' : 'No Activo'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#01763C" />
              </TouchableOpacity>
              <Text style={styles.title}>Acuerdo de Pago</Text>
              <View style={styles.spacer} />
            </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#01763C" />
              <Text style={styles.loadingText}>Cargando acuerdos de pago...</Text>
            </View>
          ) : agreementsData.length > 0 ? (
            <View style={styles.listContainer}>
              <View style={styles.summaryHeader}>
                <Text style={styles.summaryTitle}>Mis Acuerdos de Pago</Text>
                <Text style={styles.summarySubtitle}>
                  {agreementsData.length} acuerdo{agreementsData.length !== 1 ? 's' : ''} encontrado{agreementsData.length !== 1 ? 's' : ''}
                </Text>
              </View>

              <FlatList
                data={agreementsData}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={renderAgreementItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No tienes acuerdos de pago registrados</Text>
              <Text style={styles.emptySubtext}>
                Los acuerdos de pago aparecerán aquí cuando tengas infracciones con acuerdos activos.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchPaymentAgreements}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          )}
          </View>
        </ImageBackground>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MultasResultado')}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infracción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CodigoConvivencia')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Código de Convivencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="card-outline" size={24} color="#01763C" />
            <Text style={[styles.tabLabel, styles.activeTab]}>Acuerdo de Pago</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AcuerdoPagoScreen;
