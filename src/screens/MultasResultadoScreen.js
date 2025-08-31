import React from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MultasResultadoScreenStyles';

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

export default MultasResultadoScreen;
