import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7f9',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#01763C',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#333',
    marginRight: 8,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#01763C',
  },
  summaryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  // Tabs/Toggle removidos (ya no aplican)
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
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
   descripcion: {
     fontSize: 13,
     color: '#555',
     marginTop: 6,
     lineHeight: 18,
     flexShrink: 1,
     marginRight: 12,
   },
  priceContainer: {
    minWidth: 90,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#01763C',
    color: '#fff',
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginTop: -6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
     // usar espacio entre pero dar flex a label/valor para evitar que queden pegados
     paddingVertical: 6,
     alignItems: 'flex-start',
  },
   metaText: {
     fontSize: 12,
     color: '#666',
     flexShrink: 1,
   },
  detailLabel: {
      color: '#666',
      flex: 0.30,
      paddingRight: 12,
    },
  detailValue: {
      color: '#333',
      fontWeight: '600',
      flex: 0.70,
      paddingLeft: 12,
      textAlign: 'left',
      flexWrap: 'wrap',
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
  // Estilos de botón de resumen eliminados
});

export default styles;
