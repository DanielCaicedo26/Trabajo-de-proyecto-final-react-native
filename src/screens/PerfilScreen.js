import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBg} />
      <View style={styles.container}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.nameRow}>
            <Text style={styles.name}>DANIEL</Text>
            <View style={styles.statusDot} />
          </View>
        </View>
        <Text style={styles.subName}>Daniel Caicedo</Text>
        <Text style={styles.linea}>Linea</Text>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
          <Ionicons name="log-out-outline" size={24} color="#01763C" />
        </TouchableOpacity>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Documento</Text>
          <Text style={styles.infoValue}>11382745980</Text>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>Daniel</Text>
          <Text style={styles.infoLabel}>Apellido</Text>
          <Text style={styles.infoValue}>Caicedo</Text>
        </View>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MultasResultado')}>
          <Ionicons name="home-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>Información</Text>
        </TouchableOpacity>
        <View style={styles.tabItem}>
          <Ionicons name="list-outline" size={24} color="#01763C" />
          <Text style={styles.tabLabel}>infraccion</Text>
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
    paddingHorizontal: 24,
    zIndex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#38E078',
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 8,
  },
  subName: {
    fontSize: 18,
    color: '#6B9080',
    marginBottom: 2,
    marginLeft: 4,
  },
  linea: {
    fontSize: 15,
    color: '#B5C9B6',
    marginBottom: 18,
    marginLeft: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#B5C9B6',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  logoutText: {
    color: '#6B9080',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  infoBox: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 0,
  },
  infoLabel: {
    color: '#B5C9B6',
    fontSize: 15,
    marginTop: 10,
  },
  infoValue: {
    color: '#6B9080',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
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

export default PerfilScreen;
