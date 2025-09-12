import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Alert, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/PerfilScreenStyles';
import { getUser } from '../api/userCache';
import { useFocusEffect } from '@react-navigation/native';

const PerfilScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  // Referencia para el temporizador de inactividad
  const timerRef = useRef(null);

  useEffect(() => {
    const currentUser = getUser();
    setUsuario(currentUser);
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const currentUser = getUser();
      setUsuario(currentUser);
      resetTimer();
    }, [])
  );

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

  const userInfo = usuario ? (() => {
    // Derivar nombre/apellido desde userName si faltan
    let { firstName, lastName, userName } = usuario;
    if ((!firstName || !lastName) && userName) {
      const parts = String(userName).trim().split(/\s+/);
      firstName = firstName || (parts[0] || '');
      lastName = lastName || (parts.slice(1).join(' ') || '');
    }
    const nombre = firstName || userName || 'N/A';
    const apellido = lastName || '';
    const nombreCompleto = (firstName || lastName)
      ? `${firstName || ''} ${lastName || ''}`.trim()
      : (userName || 'Usuario');
    return {
      nombre,
      nombreCompleto,
      documento: usuario.documentNumber,
      apellido: apellido || 'N/A',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };
  })() : null;

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            {userInfo ? (
              <>
                <View style={styles.profileRow}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                    <View style={styles.statusDot} />
                  </View>
                  <View style={styles.nameBlock}>
                    <Text style={styles.name}>{userInfo.nombre}</Text>
                    <Text style={styles.subName}>{userInfo.nombreCompleto}</Text>
                    <Text style={styles.linea}>Línea</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                  <Text style={styles.logoutText}>Cerrar sesión</Text>
                  <Ionicons name="log-out-outline" size={24} color="#01763C" />
                </TouchableOpacity>
                <View style={styles.infoBox}>
                  <View style={styles.infoRowClean}>
                    <Text style={styles.infoLabel}>Documento</Text>
                    <Text style={styles.infoValue}>{userInfo.documento}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.infoRowClean}>
                    <Text style={styles.infoLabel}>Nombre</Text>
                    <Text style={styles.infoValue}>{userInfo.nombre}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.infoRowClean}>
                    <Text style={styles.infoLabel}>Apellido</Text>
                    <Text style={styles.infoValue}>{userInfo.apellido}</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.infoBox}>
                <Text style={styles.infoValue}>No se encontró información del usuario. Por favor, realice una consulta de multas primero.</Text>
              </View>
            )}
          </View>
        </ImageBackground>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MultasResultado')}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infracción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CodigoConvivencia')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Código de Convivencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={24} color="#01763C" />
            <Text style={[styles.tabLabel, styles.activeTab]}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Botón de logout reutilizado
function handleLogout() {
  Alert.alert(
    'Cerrar Sesión',
    '¿Estás seguro de que deseas cerrar sesión?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: () => {
          navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] });
        },
      },
    ]
  );
}

export default PerfilScreen;
