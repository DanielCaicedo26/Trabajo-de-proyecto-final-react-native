import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/FinesResultScreenStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFinesResult from '../hooks/useFinesResult';
import { MultasResultadoNavigationProp, MultasResultadoRouteProp } from '../types/navigation';

const FinesResultScreen: React.FC = () => {
  const navigation = useNavigation<MultasResultadoNavigationProp>();
  const route = useRoute<MultasResultadoRouteProp>();
  const {
    displayName,
    docNumber,
    query,
    onQueryChange,
    filteredMultas,
    selectedIds,
    toggleSelect,
    resetTimer,
    formatCurrency,
    resumen,
  } = useFinesResult(navigation, route);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search your infractions"
              placeholderTextColor="#6B9080"
              value={query}
              onChangeText={onQueryChange}
              onFocus={resetTimer}
            />
            <Text style={styles.title}>Infractions</Text>
            <View style={styles.summaryCard}>
              {(() => {
                const r = resumen(filteredMultas);
                return (
                  <>
                    <Text style={styles.summaryTitle}>Account Status Summary</Text>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Infractions: {r.count}</Text>
                      {/* The total may not be available in the API; we show it if it exists */}
                      {r.total > 0 ? <Text style={styles.summaryTotal}>{formatCurrency(r.total)}</Text> : null}
                    </View>
                    <View style={styles.summaryMeta}>
                      <Text style={styles.metaText}>{displayName || 'Name not available'}</Text>
                      <Text style={styles.metaText}>Document number: {docNumber || 'N/A'}</Text>
                    </View>
                  </>
                );
              })()}
            </View>

            {/* Toggle for 'Tickets and Fines' and 'Payment Agreements' removed by requirement */}

            <FlatList
              data={filteredMultas}
              keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
              contentContainerStyle={{ paddingBottom: 260 }}
              maxToRenderPerBatch={10}
              windowSize={5}
              initialNumToRender={10}
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={50}
              renderItem={({ item }) => {
                const selected = selectedIds.includes(item.id);
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.card}
                      activeOpacity={0.9}
                      onPress={() => toggleSelect(item.id)}
                    >
                      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.checkboxContainer}>
                        <Ionicons name={selected ? 'checkbox' : 'square-outline'} size={22} color={selected ? '#fff' : '#01763C'} style={selected ? styles.checkboxSelected : undefined} />
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <Ionicons name="document-text-outline" size={28} color="#01763C" />
                      </View>
                      <View style={styles.infoContainer}>
                        <Text style={styles.tipo}>{item.typeInfractionName || 'Type'}</Text>
                        <Text style={styles.descripcion} numberOfLines={2} ellipsizeMode='tail'>{item.observations || ''}</Text>
                        <Text style={[styles.metaText, { marginTop: 6 }]} numberOfLines={1} ellipsizeMode='tail'>{(item.firstName || item.lastName) ? `${item.firstName || ''} ${item.lastName || ''}`.trim() : ''}</Text>
                      </View>
                      {/* We don't show prices: only informational data */}
                    </TouchableOpacity>
                    {selected ? (
                      <View style={styles.detailBox}>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Date</Text><Text style={styles.detailValue}>{item.dateInfraction || item.date || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Type</Text><Text style={styles.detailValue}>{item.typeInfractionName || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Description</Text><Text style={styles.detailValue}>{item.observations || ''}</Text></View>
                        <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
                          <TouchableOpacity style={styles.verMasButton} onPress={() => navigation.navigate('InfractionDetail', { infraccion: item })}>
                            <Text style={styles.verMasText}>See more</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No fines found.</Text>}
            />
          </View>
        </SafeAreaView>
        {/* SEE SUMMARY button removed by requirement */}

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infraction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CoexistenceCode')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Coexistence Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('PaymentAgreement')}>
            <Ionicons name="card-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Payment Agreement</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default FinesResultScreen;

// Extra: calculate total of selected items
export function calcularTotalSeleccionadas(multas: Multa[] = [], selectedIds: number[] = []): number {
  return (multas || []).reduce((acc, it) => {
    if (selectedIds.includes(it.id)) {
      const price = Number(it.value ?? it.amount ?? it.total ?? 0);
      acc += isNaN(price) ? 0 : price;
    }
    return acc;
  }, 0);
}
