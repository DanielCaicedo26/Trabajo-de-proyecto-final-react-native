import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MultasResultadoScreenStyles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getInfracciones } from '../api/infraccionesCache';
import { getUser, getDocumentInfo } from '../api/userCache';


const MultasResultadoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const multas = route.params?.multas || getInfracciones() || [];
  const cachedUser = getUser();
  const cachedDoc = getDocumentInfo();
  const displayName = route.params?.userName || cachedUser?.userName || `${cachedUser?.firstName || ''} ${cachedUser?.lastName || ''}`.trim();
  
  const docNumber = route.params?.numeroDocumento || route.params?.documentNumber || cachedDoc?.numeroDocumento || cachedDoc?.documentNumber || '';
  const [query, setQuery] = useState('');
  const [filteredMultas, setFilteredMultas] = useState(multas || []);
  const [selectedIds, setSelectedIds] = useState([]);
  const debounceRef = useRef(null);
  // Referencia para el temporizador de inactividad
  const timerRef = useRef(null);

  // Muestra la alerta de inactividad
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

  // Reinicia el temporizador de inactividad
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(showInactivityAlert, 300000); // 5 minutos
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setFilteredMultas(multas || []);
  }, [multas]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
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

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <TextInput
              style={styles.searchBar}
              placeholder="Consulta tus infracciones"
              placeholderTextColor="#6B9080"
              value={query}
              onChangeText={text => {
                setQuery(text);
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => {
                  setFilteredMultas(filterMultas(multas, text));
                }, 150);
              }}
              onFocus={resetTimer}
            />
            <Text style={styles.title}>Infracciones</Text>
            <View style={styles.summaryCard}>
              {(() => {
                const r = resumen(filteredMultas);
                return (
                  <>
                    <Text style={styles.summaryTitle}>Resumen Estado de cuenta</Text>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Infracciones: {r.count}</Text>
                      {/* El total puede no estar disponible en la API; mostramos si existe */}
                      {r.total > 0 ? <Text style={styles.summaryTotal}>{formatCurrency(r.total)}</Text> : null}
                    </View>
                    <View style={styles.summaryMeta}>
                      <Text style={styles.metaText}>{displayName || 'Nombre no disponible'}</Text>
                      <Text style={styles.metaText}>Número de documento: {docNumber || 'N/A'}</Text>
                    </View>
                  </>
                );
              })()}
            </View>

            {/* Toggle de 'Comparendos y Multas' y 'Acuerdos de pago' eliminado por requerimiento */}

            <FlatList
              data={filteredMultas}
              keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
              contentContainerStyle={{ paddingBottom: 260 }}
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
                        <Ionicons name={selected ? 'checkbox' : 'square-outline'} size={22} color={selected ? '#fff' : '#01763C'} style={selected ? styles.checkboxSelected : null} />
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <Ionicons name="document-text-outline" size={28} color="#01763C" />
                      </View>
                      <View style={styles.infoContainer}>
                        <Text style={styles.tipo}>{item.typeInfractionName || 'Tipo'}</Text>
                        <Text style={styles.descripcion} numberOfLines={2} ellipsizeMode='tail'>{item.observations || ''}</Text>
                        <Text style={[styles.metaText, { marginTop: 6 }]} numberOfLines={1} ellipsizeMode='tail'>{(item.firstName || item.lastName) ? `${item.firstName || ''} ${item.lastName || ''}`.trim() : ''}</Text>
                      </View>
                      {/* No mostramos precios: solo datos informativos */}
                    </TouchableOpacity>
                    {selected ? (
                      <View style={styles.detailBox}>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Fecha</Text><Text style={styles.detailValue}>{item.dateInfraction || item.date || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Tipo</Text><Text style={styles.detailValue}>{item.typeInfractionName || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Descripción</Text><Text style={styles.detailValue}>{item.observations || ''}</Text></View>
                      </View>
                    ) : null}
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No se encontraron multas.</Text>}
            />
          </View>
        </ImageBackground>
        {/* Botón VER RESUMEN eliminado por requerimiento */}

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infracción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CodigoConvivencia')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Código de Convivencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MultasResultadoScreen;

// Función auxiliar para filtrar infracciones por texto en varios campos
function filterMultas(multas = [], text = '') {
  const q = String(text || '').trim().toLowerCase();
  if (!q) return multas || [];
  return (multas || []).filter(m => {
    const tipo = String(m?.typeInfractionName || '').toLowerCase();
    const obs = String(m?.observations || '').toLowerCase();
    const uname = String(m?.userName || m?.user?.userName || '').toLowerCase();
    return tipo.includes(q) || obs.includes(q) || uname.includes(q);
  });
}

// Extra: calcular total de seleccionadas
export function calcularTotalSeleccionadas(multas = [], selectedIds = []) {
  return (multas || []).reduce((acc, it) => {
    if (selectedIds.includes(it.id)) {
      const price = Number(it.value ?? it.amount ?? it.total ?? 0);
      acc += isNaN(price) ? 0 : price;
    }
    return acc;
  }, 0);
}
