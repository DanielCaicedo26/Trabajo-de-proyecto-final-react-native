import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  // Referencia para el temporizador de inactividad
  const timerRef = useRef(null);
  // Animated values
  const logoAnim = useRef(new Animated.Value(0)).current; // 0 -> hidden, 1 -> visible
  const cardAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const checkboxScale = useRef(new Animated.Value(1)).current;

  // Mapeo de tipo de documento a ID
  const tipoDocumentoIdMap = {
    cc: 1,
    ce: 2,
    ti: 3
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
    // Animaciones de entrada
    Animated.sequence([
      Animated.timing(logoAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(cardAnim, { toValue: 1, duration: 500, useNativeDriver: true })
    ]).start();
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
                {/* Barra de búsqueda superior similar a Código de Convivencia */}
                <TextInput
                  style={styles.searchBar}
                  placeholder="Consulta tus infracciones"
                  placeholderTextColor="#01763C"
                  onFocus={resetTimer}
                />
                <Animated.View style={[styles.logoContainer, {
                  opacity: logoAnim,
                  transform: [{ translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }]
                }]}
                >
                  <View style={styles.logoWrapper}>
                    <Image
                      source={require('../img/image 6.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.title}>Revisión de Multas</Text>
                </Animated.View>
                <Animated.View style={[styles.card, {
                  opacity: cardAnim,
                  transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }]
                }]}
                >
                  <Text style={styles.subtitle}>Mira Infraccion</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Tipo de Documento</Text>
                    <Picker
                      selectedValue={tipoDocumento}
                      style={[
                        styles.searchBar,
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
                        styles.searchBar,
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
                  <TouchableWithoutFeedback onPress={() => {
                    // animación checkbox
                    Animated.sequence([
                      Animated.timing(checkboxScale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
                      Animated.timing(checkboxScale, { toValue: 1.05, duration: 120, useNativeDriver: true }),
                      Animated.timing(checkboxScale, { toValue: 1, duration: 100, useNativeDriver: true })
                    ]).start();
                    setAcceptedTerms(prev => !prev);
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                      <Animated.View style={[styles.checkbox, acceptedTerms ? styles.checkboxChecked : null, { transform: [{ scale: checkboxScale }] }]}>
                        {acceptedTerms ? <Text style={{ color: '#fff', fontWeight: '700' }}>✓</Text> : null}
                      </Animated.View>
                      <TouchableOpacity onPress={() => setShowTermsModal(true)} style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#34495e', textDecorationLine: 'underline' }}>Acepto términos y condiciones</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showTermsModal}
                    onRequestClose={() => setShowTermsModal(false)}
                  >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
                      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 18, maxHeight: '80%' }}>
                        <ScrollView>
                          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Términos y Condiciones</Text>
                          <Text style={{ marginBottom: 12 }}>
                            Aquí van los términos y condiciones. Puedes pegar el texto real o un resumen largo que el usuario debe aceptar antes de continuar. Asegúrate de incluir información relevante como uso de datos, responsabilidad, y referencias legales.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            1. Uso de la información: El usuario acepta que los datos proporcionados serán usados para consultar infracciones en la base de datos.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            2. Privacidad: Los datos no serán compartidos con terceros sin consentimiento.
                          </Text>
                          <Text style={{ marginBottom: 12 }}>
                            3. Limitación de responsabilidad: La plataforma no es responsable por errores en los datos de origen.
                          </Text>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                          <Pressable onPress={() => setShowTermsModal(false)} style={{ marginRight: 12 }}>
                            <Text style={{ color: '#666' }}>Cerrar</Text>
                          </Pressable>
                          <Pressable onPress={() => { setAcceptedTerms(true); setShowTermsModal(false); }}>
                            <Text style={{ color: '#01763C', fontWeight: '700' }}>Aceptar</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {error ? <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text> : null}
                  <Animated.View style={{ width: '100%', transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        isButtonPressed && styles.buttonPressed,
                        !acceptedTerms && styles.buttonDisabled
                      ]}
                      onPressIn={() => {
                        setIsButtonPressed(true);
                        Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true }).start();
                      }}
                      onPressOut={() => {
                        setIsButtonPressed(false);
                        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
                      }}
                      onPress={handleConsultarMultas}
                      activeOpacity={0.8}
                      disabled={loading || !acceptedTerms}
                    >
                      <Text style={styles.buttonText}>{loading ? 'Consultando...' : 'Consultar Multas'}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
