import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ConsultaSmlvScreenStyles';

const multas = [
  { id: 1, nombre: 'Multa Tipo 1', smdlv: 2 },
  { id: 2, nombre: 'Multa Tipo 2', smdlv: 4 },
  { id: 3, nombre: 'Multa Tipo 3', smdlv: 3 },
  { id: 4, nombre: 'Multa Tipo 4', smdlv: 16 },
];

const ConsultaSmlvScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Consulta Smlv</Text>
          {multas.map((multa) => (
            <TouchableOpacity
              key={multa.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('DetalleSmlv', { smdlv: multa.smdlv });
              }}
            >
              <Ionicons
                name="document-text-outline"
                size={48}
                color="#4A90E2"
                style={{ marginRight: 18 }}
              />
              <Text style={styles.cardText}>{multa.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ConsultaSmlvScreen;