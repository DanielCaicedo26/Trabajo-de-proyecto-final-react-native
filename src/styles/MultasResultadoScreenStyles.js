import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#38e07888',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '140%',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    zIndex: 1,
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
    color: '#01763cf8',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8ff',
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
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
  },
});

export default styles;
