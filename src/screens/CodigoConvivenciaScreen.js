import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  searchBar: {
    backgroundColor: '#fcfcfcff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 24,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#01763C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  leyTitulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#01763C',
  },
  leyDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
});

export default CodigoConvivenciaScreen;
