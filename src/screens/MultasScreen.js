import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/MultasScreenStyles';

export default function MultasScreen() {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Escudo_de_Salamina_Caldas.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Revision De Multas</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Mira infraccion</Text>
        <View style={styles.inputGroup}>
          <Picker
            selectedValue={tipoDocumento}
            style={styles.input}
            onValueChange={(itemValue) => setTipoDocumento(itemValue)}
          >
            <Picker.Item label="Selecciona tu Tipo De Documento" value="" />
            <Picker.Item label="Cédula de Ciudadanía" value="cc" />
            <Picker.Item label="Tarjeta de Identidad" value="ti" />
            <Picker.Item label="Cédula de Extranjería" value="ce" />
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Digita Tu Numero De Documento"
            value={numeroDocumento}
            onChangeText={setNumeroDocumento}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
