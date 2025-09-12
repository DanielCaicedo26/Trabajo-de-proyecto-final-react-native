import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/DetalleInfraccionScreenStyles';


const DetalleInfraccionScreen = ({ navigation, route }) => {
  const timerRef = useRef(null);
  const infraccionData = route?.params?.infraccion;

  const infraccion = {
    tipo: infraccionData?.typeInfractionName || 'No especificado',
    descripcion: infraccionData?.observations || 'Sin observaciones',
    fecha: infraccionData?.dateInfraction ? new Date(infraccionData.dateInfraction).toLocaleDateString() : 'No especificada',
    consulta: 'SMDLV', // Dato de ejemplo
    infoMulta: [
      { icon: 'time-outline', texto: '11/02/25 al 16/02/25 - 50% de descuento', valor: '$94.500' },
      { icon: 'cash-outline', texto: '11/03/25 valor sin descuento', valor: '$189.800' },
      { icon: 'warning-outline', texto: '01/03/25 Inicia proceso de cobro coactivo', valor: '$189.800' },
    ], // Datos de ejemplo
    monto: '$189.800', // Dato de ejemplo
    fechaMax: '11/03/25', // Dato de ejemplo
  };

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

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(showInactivityAlert, 300000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
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
          <TouchableOpacity onPress={() => navigation.navigate('ConsultaSmlv')} activeOpacity={0.7}>
            <Text style={styles.consulta}>Consulta {infraccion.consulta} <Ionicons name="help-circle-outline" size={16} color="#01763C" /></Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="document-text-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{infraccion.tipo}</Text>
              <Text style={styles.cardDesc}>{infraccion.descripcion}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="calendar-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Día y hora</Text>
              <Text style={styles.cardDesc}>{infraccion.fecha}</Text>
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
    </TouchableWithoutFeedback>
  );
};


export default DetalleInfraccionScreen;
