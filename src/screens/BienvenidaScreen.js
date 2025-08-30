import React from 'react';
import { 
  StatusBar, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import styles from '../styles/AppStyles';

export default function BienvenidaScreen({ navigation }) {
  const handleLoginPress = () => {
    navigation.navigate('Multas');
  };

  return (
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
  );
}
