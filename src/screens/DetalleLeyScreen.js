import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/DetalleLeyScreenStyles';
import { Ionicons } from '@expo/vector-icons';

const DetalleLeyScreen = ({ navigation, route }) => {
  const { ley } = route.params;
  const timerRef = useRef(null);

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
    timerRef.current = setTimeout(showInactivityAlert, 300000);
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
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#222" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={32} color="#01763C" />
              </View>
              <Text style={styles.titulo}>{ley.titulo}</Text>
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentCard}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.descripcion}>{ley.descripcion}</Text>

                <Text style={styles.sectionTitle}>Texto Completo de la Ley</Text>
                <Text style={styles.textoCompleto}>{ley.textoCompleto}</Text>

                {ley.multa && (
                  <>
                    <Text style={styles.sectionTitle}>Multa</Text>
                    <Text style={styles.multa}>{ley.multa}</Text>
                  </>
                )}

                {ley.articulos && (
                  <>
                    <Text style={styles.sectionTitle}>Artículos Relacionados</Text>
                    <Text style={styles.articulos}>{ley.articulos}</Text>
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetalleLeyScreen;