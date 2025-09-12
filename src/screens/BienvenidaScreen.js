
import React, { useRef, useEffect } from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import styles from '../styles/AppStyles';

export default function BienvenidaScreen({ navigation }) {
  const timerRef = useRef(null);

  // Función para mostrar la alerta de inactividad
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

  const handleLoginPress = () => {
    navigation.navigate('Multas');
  };

  // Detecta cualquier toque en la pantalla para reiniciar el temporizador
  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <ImageBackground
          source={{ uri: 'https://palermohuila.wordpress.com/wp-content/uploads/2012/08/n.jpg' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                Bienvenido a{"\n"}nuestro aplicativo
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginPress}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
