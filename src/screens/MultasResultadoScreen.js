import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const infracciones = [
  {
    id: '1',
    tipo: 'Tipo Uno',
    descripcion: 'Amenazar con dañar físicamente a alguien.',
    valor: '$189.000',
  },
  {
    id: '2',
    tipo: 'Tipo Dos',
    descripcion: 'Restringir muestras de afecto no sexuales por discriminación.',
    valor: '$189.000',
  },
  {
    id: '3',
    tipo: 'Tipo Tres',
    descripcion: 'Agredir físicamente a personas por cualquier medio',
    valor: '$379.000',
  },
  {
    id: '4',
    tipo: 'Tipo Cuatro',
    descripcion: 'Usar o manejar pólvora sin cumplir la norma.',
    valor: '$1.518.000',
  },
  {
    id: '5',
    tipo: 'Tipo Cuatro',
    descripcion: 'Arrojar residuos que obstruyan redes de aguas.',
    valor: '$1.518.000',
  },
];

const MultasResultadoScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBg} />
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
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={32} color="#01763C" />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.tipo}>{item.tipo}</Text>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
              </View>
              <Text style={styles.valor}>{item.valor}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Información</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="list-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Infraccion</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="wallet-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Acuerdos De Pago</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6FFF8',
  },
  headerBg: {
    height: 120,
    backgroundColor: '#01763C',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: '#fff',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  tipo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#01763C',
  },
  descripcion: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  valor: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#01763C',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#01763C',
    marginTop: 2,
  },
});

export default MultasResultadoScreen;
