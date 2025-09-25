import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MultasResultadoScreenStyles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getInfracciones } from '../api/infraccionesCache';


const MultasResultadoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const multas = route.params?.multas || getInfracciones() || [];
  const [query, setQuery] = useState('');
  const [filteredMultas, setFilteredMultas] = useState(multas || []);
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
            <FlatList
              data={filteredMultas}
              keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('DetalleInfraccion', { infraccion: item })}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name="document-text-outline" size={32} color="#01763C" />
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.tipo}>{item.typeInfractionName || 'Tipo'}</Text>
                    <Text style={styles.descripcion}>{item.observations || 'Descripción'}</Text>
                  </View>
                  <Text style={styles.valor}>{''}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No se encontraron multas.</Text>}
            />
          </View>
        </ImageBackground>
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
