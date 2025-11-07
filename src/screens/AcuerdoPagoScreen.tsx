import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  FlatList, 
  ImageBackground, 
  TextInput,
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';
import styles from '../styles/AcuerdoPagoScreenStyles';
import usePaymentAgreements from '../hooks/usePaymentAgreements';

interface PaymentAgreement {
  id: number;
  personName: string;
  documentNumber: string;
  phoneNumber: string;
  address: string;
  neighborhood: string;
  typeFine: string;
  infringement: string;
  agreementStart: string;
  agreementEnd: string;
  paymentMethod: string;
  installments: number;
  baseAmount: number;
  monthlyFee: number;
  outstandingAmount: number;
  isCoactive: boolean;
  isPaid: boolean;
}

interface AcuerdoPagoScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

interface RenderAgreementItemProps {
  item: PaymentAgreement;
  index: number;
}

const AcuerdoPagoScreen: React.FC<AcuerdoPagoScreenProps> = ({ navigation }) => {
  const {
    loading,
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

  const renderAgreementItem = ({ item, index }: RenderAgreementItemProps) => {
    const isExpanded = expandedItems[item.id] || false;
    const agreementNumber = index + 1;

    return (
      <View style={styles.accordionContainer}>
        {/* Header del acordeón */}
        <TouchableOpacity
          style={[styles.accordionHeader, isExpanded && styles.accordionHeaderExpanded]}
          onPress={() => {
            toggleExpanded(item.id);
            resetTimer();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[
              styles.accordionIcon, 
              { backgroundColor: item.isPaid ? '#4CAF50' : '#01763C' } as ViewStyle
            ]}>
              <Ionicons
                name={item.isPaid ? "checkmark-circle" : "time-outline"}
                size={26}
                color="#fff"
              />
            </View>
            <View style={styles.accordionHeaderText}>
              <Text style={styles.accordionTitle}>Acuerdo #{agreementNumber}</Text>
              <Text style={styles.accordionSubtitle}>
                {item.typeFine} • {formatCurrency(item.outstandingAmount)}
              </Text>
              <Text style={[
                styles.accordionStatus,
                { color: item.isPaid ? '#4CAF50' : '#FF9800' } as TextStyle
              ]}>
                {item.isPaid ? '✓ Pagado' : '⏱ Pendiente'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={26}
            color="#01763C"
          />
        </TouchableOpacity>

        {/* Contenido expandible */}
        {isExpanded && (
          <View style={styles.accordionContent}>
            {/* Información Personal */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={22} color="#01763C" />
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
                  <Text style={styles.infoValueDescription}>
                    {item.address}, {item.neighborhood}
                  </Text>
                </View>
              </View>
            </View>

            {/* Detalles de la Infracción */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="warning-outline" size={22} color="#FF6B35" />
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
                <Ionicons name="calendar-outline" size={22} color="#2196F3" />
                <Text style={styles.sectionTitle}>Detalles del Acuerdo</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Vigencia:</Text>
                  <Text style={styles.infoValueDescription}>
                    Del {formatDate(item.agreementStart)} al {formatDate(item.agreementEnd)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Método de Pago:</Text>
                  <Text style={styles.infoValue}>{item.paymentMethod}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cuotas:</Text>
                  <Text style={styles.infoValue}>{item.installments} cuotas</Text>
                </View>
              </View>
            </View>

            {/* Información Financiera */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="cash-outline" size={22} color="#4CAF50" />
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
                  <Text style={[
                    styles.infoValueAmount,
                    { color: item.outstandingAmount > 0 ? '#F44336' : '#4CAF50' } as TextStyle
                  ]}>
                    {formatCurrency(item.outstandingAmount)}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Proceso Coactivo:</Text>
                  <Text style={[
                    styles.infoValue, 
                    { color: item.isCoactive ? '#F44336' : '#4CAF50', fontWeight: '700' } as TextStyle
                  ]}>
                    {item.isCoactive ? '⚠ Activo' : '✓ No Activo'}
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
    <TouchableOpacity activeOpacity={1} onPress={resetTimer} style={{ flex: 1 }}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <BackButton 
                style={styles.backButton} 
                onPress={() => navigation.goBack()} 
              />
              <Text style={styles.title}>Acuerdos de Pago</Text>
              <View style={styles.spacer} />
            </View>

            {/* Barra de búsqueda */}
            <View style={styles.searchContainer}>
              <Ionicons 
                name="search-outline" 
                size={20} 
                color="#01763C" 
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Buscar por nombre, documento o tipo..."
                placeholderTextColor="#999"
                style={styles.searchInput}
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  resetTimer();
                }}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setQuery('');
                    resetTimer();
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>

            {/* Contenido principal */}
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
                  onScrollBeginDrag={resetTimer}
                />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="document-text-outline" size={80} color="#CCCCCC" />
                <Text style={styles.emptyText}>
                  No se encontraron acuerdos de pago
                </Text>
                <Text style={styles.emptySubtext}>
                  {query.length > 0 
                    ? 'Intenta con otro criterio de búsqueda' 
                    : 'Los acuerdos de pago aparecerán aquí cuando tengas infracciones con acuerdos activos.'}
                </Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    fetchPaymentAgreements();
                    resetTimer();
                  }}
                >
                  <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.retryButtonText}>Recargar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={styles.tabItem} 
              onPress={() => {
                navigation.navigate('MultasResultado');
                resetTimer();
              }}
            >
              <Ionicons name="list-outline" size={26} color="#666" />
              <Text style={styles.tabLabel}>Infracciones</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.tabItem} 
              onPress={() => {
                navigation.navigate('CodigoConvivencia');
                resetTimer();
              }}
            >
              <Ionicons name="book-outline" size={26} color="#666" />
              <Text style={styles.tabLabel}>Código</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="card" size={26} color="#01763C" />
              <Text style={[styles.tabLabel, styles.activeTab]}>Acuerdos</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AcuerdoPagoScreen;

