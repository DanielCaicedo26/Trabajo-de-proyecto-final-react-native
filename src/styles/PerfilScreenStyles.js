import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#38e07888',
  },
  // headerBg eliminado
  infoRowClean: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
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
    marginBottom: 16,
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#38E078',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 0,
    marginLeft: 0,
  },
  subName: {
    fontSize: 18,
    color: '#6B9080',
    marginBottom: 0,
    marginLeft: 2,
  },
  linea: {
    fontSize: 15,
    color: '#000000ff',
    marginBottom: 18,
    marginLeft: 2,
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
    color: '#52946B',
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
    color: '#000000ff',
    fontSize: 15,
    marginTop: 10,
  },
  infoValue: {
    color: '#52946B',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8F5E8',
    marginVertical: 6,
    width: '100%',
    alignSelf: 'center',
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
  activeTab: {
    fontWeight: 'bold',
  },
});

export default styles;