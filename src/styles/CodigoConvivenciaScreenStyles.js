import { StyleSheet } from 'react-native';

const CodigoConvivenciaScreenStyles = StyleSheet.create({
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

export default CodigoConvivenciaScreenStyles;
