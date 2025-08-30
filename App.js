import React from 'react';

import { 
  StatusBar, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import styles from './src/styles/AppStyles';


export default function App() {
  const handleLoginPress = () => {
    // Aquí implementarías la navegación a la pantalla de login
    console.log('Navegar a login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        source={{ uri: 'https://palermohuila.wordpress.com/wp-content/uploads/2012/08/n.jpg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay para mejorar legibilidad del texto */}
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          {/* Texto de bienvenida */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>
              Bienvenido a{'\n'}nuestro aplicativo
            </Text>
          </View>
          
          {/* Botón de iniciar sesión */}
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
  );
}

