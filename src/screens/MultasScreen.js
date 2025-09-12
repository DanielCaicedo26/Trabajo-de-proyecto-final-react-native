import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/MultasScreenStyles';

import { useNavigation } from '@react-navigation/native';
import { consultarInfracciones } from '../api/infraccionesApi';
import { buscarUsuarioPorDocumento } from '../api/userApi';
import { setDocumentInfo, setUser } from '../api/userCache';
import { setInfracciones } from '../api/infraccionesCache';


export default function MultasScreen() {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  // Referencia para el temporizador de inactividad
  const timerRef = useRef(null);

  // Mapeo de tipo de documento a ID
  const tipoDocumentoIdMap = {
    cc: 1,
    ti: 2,
    ce: 3
  };

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

  const handleConsultarMultas = async () => {
    setLoading(true);
    setError('');
    try {
      const documentTypeId = tipoDocumentoIdMap[tipoDocumento];
      if (!documentTypeId || !numeroDocumento) {
        setError('Selecciona tipo y número de documento.');
        setLoading(false);
        return;
      }
      setDocumentInfo({ documentTypeId, numeroDocumento });
      // Validar usuario primero
      const usuario = await buscarUsuarioPorDocumento(documentTypeId, numeroDocumento);
      if (!usuario) {
        setError('No existe un usuario con ese documento.');
        setLoading(false);
        return;
      }
      // Si existe, consultar multas
      const multas = await consultarInfracciones(documentTypeId, numeroDocumento);
      // Filtrar solo las infracciones del usuario encontrado
      const multasUsuario = (Array.isArray(multas) ? multas : []).filter(m => {
        if (usuario?.id != null && m?.userId != null) {
          return String(m.userId) === String(usuario.id);
        }
        if (usuario?.userName && m?.userName) {
          return String(m.userName).trim().toLowerCase() === String(usuario.userName).trim().toLowerCase();
        }
        return false;
      });
      if (!multasUsuario || multasUsuario.length === 0) {
        setUser(usuario);
        setError('No se encontraron multas para este documento.');
        setLoading(false);
        return;
      }
      // Si hay multas, enriquecer la info del usuario con los datos de la primera multa
      const firstInfraction = multasUsuario[0];
      let firstName = firstInfraction?.firstName;
      let lastName = firstInfraction?.lastName;
      if ((!firstName || !lastName) && firstInfraction?.userName) {
        const parts = String(firstInfraction.userName).trim().split(/\s+/);
        firstName = firstName || (parts[0] || '');
        lastName = lastName || (parts.slice(1).join(' ') || '');
      }
      const enrichedUser = {
        ...usuario,
        userName: firstInfraction?.userName || usuario?.userName,
        firstName: firstName || usuario?.firstName || '',
        lastName: lastName || usuario?.lastName || '',
      };
      setUser(enrichedUser);
      setInfracciones(multasUsuario);
      navigation.navigate('MultasResultado', { multas: multasUsuario });
    } catch (err) {
      setError('Error: ' + (err?.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: 'https://i.ibb.co/wZbZttV5/Whats-App-Image-2025-01-07-at-3-26-56-PM-2.png' }}
          style={styles.backgroundImage}
          blurRadius={4}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2E8B57" translucent />
                <View style={styles.logoContainer}>
                  <View style={styles.logoWrapper}>
                    <Image
                      source={require('../img/image 6.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.title}>Revisión de Multas</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.subtitle}>Mira Infraccion</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Tipo de Documento</Text>
                    <Picker
                      selectedValue={tipoDocumento}
                      style={[
                        styles.input,
                        focusedInput === 'picker' && styles.inputFocused
                      ]}
                      onValueChange={(itemValue) => setTipoDocumento(itemValue)}
                      onFocus={() => setFocusedInput('picker')}
                      onBlur={() => setFocusedInput(null)}
                    >
                      <Picker.Item label="Selecciona tu Tipo De Documento" value="" />
                      <Picker.Item label="Cédula de Ciudadanía" value="cc" />
                      <Picker.Item label="Tarjeta de Identidad" value="ti" />
                      <Picker.Item label="Cédula de Extranjería" value="ce" />
                    </Picker>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Número de Documento</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === 'document' && styles.inputFocused
                      ]}
                      placeholder="Digita Tu Número De Documento"
                      placeholderTextColor="#95a5a6"
                      value={numeroDocumento}
                      onChangeText={setNumeroDocumento}
                      keyboardType="numeric"
                      onFocus={() => setFocusedInput('document')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text> : null}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      isButtonPressed && styles.buttonPressed
                    ]}
                    onPressIn={() => setIsButtonPressed(true)}
                    onPressOut={() => setIsButtonPressed(false)}
                    onPress={handleConsultarMultas}
                    activeOpacity={0.8}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}>{loading ? 'Consultando...' : 'Consultar Multas'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
