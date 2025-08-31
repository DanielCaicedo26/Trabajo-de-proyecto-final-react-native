import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DetalleInfraccionScreen = ({ navigation, route }) => {
  // Recibir datos por params o usar datos de ejemplo
  const infraccionDefault = {
    tipo: 'Tipo Uno',
    descripcion: 'Amenazar con dañar físicamente a alguien.',
    ubicacion: 'Palermo-Huila carrera 10 #15-21',
    fecha: '2025-02-11 16:45',
    oficial: 'Johnson Ramirez',
    consulta: 'SMDLV',
    infoMulta: [
      { icon: 'time-outline', texto: '11/02/25 al 16/02/25 - 50% de descuento', valor: '$94.500' },
      { icon: 'cash-outline', texto: '11/03/25 valor sin descuento', valor: '$189.800' },
      { icon: 'warning-outline', texto: '01/03/25 Inicia proceso de cobro coactivo', valor: '$189.800' },
    ],
    monto: '$189.800',
    fechaMax: '11/03/25',
  };
  
  const infraccion = route?.params?.infraccion || infraccionDefault;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.absoluteBg}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.curveBg}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(1,118,60,0.7)", "#F6FFF8"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientBg}
          />
        </ImageBackground>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Detalle de Infracción</Text>
        <Text style={styles.seccion}>Infracción</Text>
        <Text style={styles.consulta}>Consulta {infraccion.consulta} <Ionicons name="help-circle-outline" size={16} color="#01763C" /></Text>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="document-text-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{infraccion.tipo}</Text>
            <Text style={styles.cardDesc}>{infraccion.descripcion}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="location-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Ubicación</Text>
            <Text style={styles.cardDesc}>{infraccion.ubicacion}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="calendar-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Día y hora</Text>
            <Text style={styles.cardDesc}>{infraccion.fecha}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="person-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Oficial</Text>
            <Text style={styles.cardDesc}>{infraccion.oficial}</Text>
          </View>
        </View>
        <Text style={styles.seccion}>Información de la multa</Text>
        {infraccion.infoMulta.map((item, idx) => (
          <View style={styles.card} key={idx}>
            <View style={styles.cardIcon}><Ionicons name={item.icon} size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.texto}</Text>
              <Text style={styles.cardDesc}>{item.valor}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.seccion}>Monto y fecha máxima</Text>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="cash-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Monto a pagar</Text>
            <Text style={styles.cardDesc}>{infraccion.monto}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardIcon}><Ionicons name="calendar-outline" size={28} color="#01763C" /></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Fecha máxima de pago</Text>
            <Text style={styles.cardDesc}>{infraccion.fechaMax}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  curveBg: {
    width: '100%',
    height: 200,
  },
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  backBtn: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
    textAlign: 'left',
  },
  seccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  consulta: {
    fontSize: 14,
    color: '#01763C',
    marginBottom: 10,
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIcon: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#01763C',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
});

export default DetalleInfraccionScreen;
