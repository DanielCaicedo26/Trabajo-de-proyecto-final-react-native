import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DetalleSmlvScreenStyles';


const SALARIO_MINIMO = 1423500;
const SMLDV = Math.round(SALARIO_MINIMO / 30);

const DetalleSmlvScreen = ({ navigation, route }) => {
  const smdlv = route?.params?.smdlv || 2;
  const valorSmdlv = SMLDV;
  const valorTotal = valorSmdlv * smdlv;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Detalle de Infraccion</Text>
          <Text style={styles.seccion}>Infraccion</Text>
          <View style={styles.divider} />
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="list-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Numero de SMDLV</Text>
              <Text style={styles.valueGreen}>{smdlv}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="cash-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Salario minimo vigente</Text>
              <Text style={styles.valueBlue}>${SALARIO_MINIMO.toLocaleString('es-CO')}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="calculator-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Calculo del SMDLV</Text>
              <Text style={styles.valueBlue}>${SALARIO_MINIMO.toLocaleString('es-CO')}/30</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="pricetag-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Valor de un SMDLV</Text>
              <Text style={styles.valueGreen}>${valorSmdlv.toLocaleString('es-CO')}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="calculator-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Calcular Valor De Multa</Text>
              <Text style={styles.valueBlue}>${valorSmdlv.toLocaleString('es-CO')} x {smdlv}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="cash-outline" size={32} color="#fff" /></View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Valor Total de Multa</Text>
              <Text style={styles.valueGreen}>${valorTotal.toLocaleString('es-CO')}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DetalleSmlvScreen;
