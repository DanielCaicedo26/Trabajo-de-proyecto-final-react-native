import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AcuerdoPagoScreenStyles';
import { useFocusEffect } from '@react-navigation/native';
import usePaymentAgreements from '../hooks/usePaymentAgreements';

const AcuerdoPagoScreen = ({ navigation }) => {
  const {
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
  } = usePaymentAgreements(navigation);

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

            {/* Barra de búsqueda */}
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Buscar por nombre, documento, tipo o descripción"
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  resetTimer();
                }}
                  returnKeyType="search"
                  clearButtonMode="while-editing"
                />
                {query.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                      setQuery('');
                      // reset filtered data to all agreements
                      fetchPaymentAgreements();
                      resetTimer();
                    }}
                  >
                    <Text style={styles.clearButtonText}>Limpiar</Text>
                  </TouchableOpacity>
                )}
              </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#01763C" />
                <Text style={styles.loadingText}>Cargando acuerdos de pago...</Text>
              </View>
            ) : filteredData.length > 0 ? (
              <View style={styles.listContainer}>
                <View style={styles.summaryHeader}>
                  <Text style={styles.summaryTitle}>Mis Acuerdos de Pago</Text>
                  <Text style={styles.summarySubtitle}>
                    {filteredData.length} acuerdo{filteredData.length !== 1 ? 's' : ''} encontrado{filteredData.length !== 1 ? 's' : ''}
                  </Text>
                </View>

                <FlatList
                  data={filteredData}
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
