import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/MultasScreenStyles';

export default function MultasScreen() {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
              <TouchableOpacity
                style={[
                  styles.button,
                  isButtonPressed && styles.buttonPressed
                ]}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}> Consultar Multas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
