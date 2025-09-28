import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ConsultaSmlvScreenStyles';
import useConsultaSmlv from '../hooks/useConsultaSmlv';

const ConsultaSmlvScreen = ({ navigation }) => {
  const { multas, resetTimer } = useConsultaSmlv(navigation);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
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
    </TouchableWithoutFeedback>
  );
};

export default ConsultaSmlvScreen;