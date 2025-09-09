import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

  // Mapeo de tipo de documento a ID
  const tipoDocumentoIdMap = {
    cc: 1,
    ti: 2,
    ce: 3
  };

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
      console.log('Consultando usuario:', documentTypeId, numeroDocumento);
      const usuario = await buscarUsuarioPorDocumento(documentTypeId, numeroDocumento);
      console.log('Respuesta usuario:', usuario);
      if (!usuario) {
        setError('No existe un usuario con ese documento.');
        setLoading(false);
        return;
      }
      // Si existe, consultar multas
      console.log('Consultando infracciones:', documentTypeId, numeroDocumento);
      const multas = await consultarInfracciones(documentTypeId, numeroDocumento);
      console.log('Respuesta multas:', multas);
      if (!multas || multas.length === 0) {
        // Si no hay multas, al menos guardar la info que tenemos del usuario
        setUser(usuario);
        setError('No se encontraron multas para este documento.');
        setLoading(false);
        return;
      }

      // Si hay multas, enriquecer la info del usuario con los datos de la primera multa
      const firstInfraction = multas[0];
      const enrichedUser = {
        ...usuario,
        firstName: firstInfraction.firstName,
        lastName: firstInfraction.lastName,
      };
      setUser(enrichedUser);

      setInfracciones(multas);
      navigation.navigate('MultasResultado', { multas });
    } catch (err) {
      setError('Error: ' + (err?.message || JSON.stringify(err)));
      console.log('Error en consulta:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
