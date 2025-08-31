import React from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MultasResultadoScreenStyles';

const infracciones = [
  {
    id: '1',
    tipo: 'Tipo Uno',
    descripcion: 'Amenazar con dañar físicamente a alguien.',
    valor: '$189.000',
    infoMulta: [
      { icon: 'time-outline', texto: '11/02/25 al 16/02/25 - 50% de descuento', valor: '$94.500' },
      { icon: 'cash-outline', texto: '11/03/25 valor sin descuento', valor: '$189.800' },
      { icon: 'warning-outline', texto: '01/03/25 Inicia proceso de cobro coactivo', valor: '$189.800' },
    ],
    ubicacion: 'Palermo-Huila carrera 10 #15-21',
    fecha: '2025-02-11 16:45',
    oficial: 'Johnson Ramirez',
    consulta: 'SMDLV',
    monto: '$189.800',
    fechaMax: '11/03/25',
  },
  {
    id: '2',
    tipo: 'Tipo Dos',
    descripcion: 'Restringir muestras de afecto no sexuales por discriminación.',
    valor: '$189.000',
    infoMulta: [
      { icon: 'time-outline', texto: '12/02/25 al 17/02/25 - 50% de descuento', valor: '$94.500' },
      { icon: 'cash-outline', texto: '12/03/25 valor sin descuento', valor: '$189.000' },
      { icon: 'warning-outline', texto: '02/03/25 Inicia proceso de cobro coactivo', valor: '$189.000' },
    ],
    ubicacion: 'Neiva-Huila calle 8 #12-34',
    fecha: '2025-03-12 10:30',
    oficial: 'Maria Torres',
    consulta: 'SMDLV',
    monto: '$189.000',
    fechaMax: '12/03/25',
  },
  {
    id: '3',
    tipo: 'Tipo Tres',
    descripcion: 'Agredir físicamente a personas por cualquier medio',
    valor: '$379.000',
    infoMulta: [
      { icon: 'time-outline', texto: '13/02/25 al 18/02/25 - 50% de descuento', valor: '$189.500' },
      { icon: 'cash-outline', texto: '13/03/25 valor sin descuento', valor: '$379.000' },
      { icon: 'warning-outline', texto: '03/03/25 Inicia proceso de cobro coactivo', valor: '$379.000' },
    ],
    ubicacion: 'Garzón-Huila carrera 5 #7-89',
    fecha: '2025-04-13 14:15',
    oficial: 'Carlos Pérez',
    consulta: 'SMDLV',
    monto: '$379.000',
    fechaMax: '13/03/25',
  },
  {
    id: '4',
    tipo: 'Tipo Cuatro',
    descripcion: 'Usar o manejar pólvora sin cumplir la norma.',
    valor: '$1.518.000',
    infoMulta: [
      { icon: 'time-outline', texto: '14/02/25 al 19/02/25 - 50% de descuento', valor: '$759.000' },
      { icon: 'cash-outline', texto: '14/03/25 valor sin descuento', valor: '$1.518.000' },
      { icon: 'warning-outline', texto: '04/03/25 Inicia proceso de cobro coactivo', valor: '$1.518.000' },
    ],
    ubicacion: 'Campoalegre-Huila avenida 3 #2-10',
    fecha: '2025-05-14 20:00',
    oficial: 'Luisa Gómez',
    consulta: 'SMDLV',
    monto: '$1.518.000',
    fechaMax: '14/03/25',
  },
  {
    id: '5',
    tipo: 'Tipo Cuatro',
    descripcion: 'Arrojar residuos que obstruyan redes de aguas.',
    valor: '$1.518.000',
    infoMulta: [
      { icon: 'time-outline', texto: '15/02/25 al 20/02/25 - 50% de descuento', valor: '$759.000' },
      { icon: 'cash-outline', texto: '15/03/25 valor sin descuento', valor: '$1.518.000' },
      { icon: 'warning-outline', texto: '05/03/25 Inicia proceso de cobro coactivo', valor: '$1.518.000' },
    ],
    ubicacion: 'Pitalito-Huila calle 2 #1-22',
    fecha: '2025-06-15 09:45',
    oficial: 'Jorge Ruiz',
    consulta: 'SMDLV',
    monto: '$1.518.000',
    fechaMax: '15/03/25',
  },
];

import { useNavigation } from '@react-navigation/native';

const MultasResultadoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Consulta tus infracciones"
          placeholderTextColor="#6B9080"
        />
        <Text style={styles.title}>Infracciones</Text>
        <FlatList
          data={infracciones}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('DetalleInfraccion', { infraccion: item })}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={32} color="#01763C" />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.tipo}>{item.tipo}</Text>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
              </View>
              <Text style={styles.valor}>{item.valor}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
      </ImageBackground>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="list-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Infracción</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CodigoConvivencia')}>
          <Ionicons name="book-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Código de Convivencia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MultasResultadoScreen;
