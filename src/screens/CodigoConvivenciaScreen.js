import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../styles/CodigoConvivenciaScreenStyles';
import { Ionicons } from '@expo/vector-icons';

const leyes = [
  {
    id: '1',
    titulo: 'LEY 1801 DE 2016',
    descripcion: 'Amenazar con dañar físicamente a alguien.',
  },
  {
    id: '2',
    titulo: 'LEY 2318 DE 2023',
    descripcion: 'Restringir muestras de afecto no sexuales por discriminación.',
  },
  {
    id: '3',
    titulo: 'LEY 2197 DE 2022',
    descripcion: 'Agredir físicamente a personas por cualquier medio.',
  },
  {
    id: '4',
    titulo: 'LEY 2054 DE 2022',
    descripcion: 'Usar o manejar pólvora sin cumplir la norma.',
  },
  // Puedes agregar más leyes aquí
  {
    id: '5',
    titulo: 'LEY 1804 DE 2016',
    descripcion: 'Protección integral a la primera infancia (Ley de Cero a Siempre).',
  },
  {
    id: '6',
    titulo: 'LEY 1257 DE 2008',
    descripcion: 'Medidas de protección contra la violencia hacia la mujer.',
  },
  {
    id: '7',
    titulo: 'LEY 1098 DE 2006',
    descripcion: 'Código de Infancia y Adolescencia.',
  },
  {
    id: '8',
    titulo: 'LEY 599 DE 2000',
    descripcion: 'Código Penal Colombiano.',
  },
];

const CodigoConvivenciaScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <TouchableOpacity style={{ alignSelf: 'flex-start', marginBottom: 10, backgroundColor: 'transparent', borderRadius: 20, padding: 4 }} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Consulta tu ley"
            placeholderTextColor="#6B9080"
          />
          <Text style={styles.titulo}>codigo de Convivencia {'  '}
            <Ionicons name="people-outline" size={20} color="#01763C" />
          </Text>
          <FlatList
            data={leyes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text-outline" size={28} color="#01763C" />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.leyTitulo}>{item.titulo}</Text>
                  <Text style={styles.leyDesc}>{item.descripcion}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default CodigoConvivenciaScreen;
