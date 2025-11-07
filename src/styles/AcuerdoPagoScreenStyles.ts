import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Styles {
  safeArea: ViewStyle;
  backgroundImage: ImageStyle;
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  title: TextStyle;
  spacer: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  scrollView: ViewStyle;
  listContainer: ViewStyle;
  summaryHeader: ViewStyle;
  summaryTitle: TextStyle;
  summarySubtitle: TextStyle;
  searchContainer: ViewStyle;
  searchInput: TextStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
  listContent: ViewStyle;
  agreementCard: ViewStyle;
  cardHeader: ViewStyle;
  cardTitle: TextStyle;
  infoSection: ViewStyle;
  infoRow: ViewStyle;
  infoRowColumn: ViewStyle;
  infoLabel: TextStyle;
  infoValue: TextStyle;
  infoValueDescription: TextStyle;
  infoValueAmount: TextStyle;
  divider: ViewStyle;
  refreshButton: ViewStyle;
  refreshButtonText: TextStyle;
  emptyContainer: ViewStyle;
  emptyText: TextStyle;
  emptySubtext: TextStyle;
  retryButton: ViewStyle;
  retryButtonText: TextStyle;
  tabBar: ViewStyle;
  tabItem: ViewStyle;
  tabLabel: TextStyle;
  activeTab: TextStyle;
  accordionContainer: ViewStyle;
  accordionHeader: ViewStyle;
  accordionHeaderExpanded: ViewStyle;
  accordionHeaderLeft: ViewStyle;
  accordionIcon: ViewStyle;
  accordionHeaderText: ViewStyle;
  accordionTitle: TextStyle;
  accordionSubtitle: TextStyle;
  accordionStatus: TextStyle;
  accordionContent: ViewStyle;
  agreementSection: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  sectionContent: ViewStyle;
}

export default StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  } as ViewStyle,
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingTop: 20,
  } as ViewStyle,
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#01763C',
    textAlign: 'center',
    flex: 1,
  } as TextStyle,
  spacer: {
    width: 40,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 260,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#01763C',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  summaryHeader: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#01763C',
    marginBottom: 6,
  } as TextStyle,
  summarySubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  } as TextStyle,
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#01763C',
    paddingVertical: 6,
    paddingHorizontal: 8,
  } as TextStyle,
  clearButton: {
    marginLeft: 8,
    backgroundColor: '#01763C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  } as ViewStyle,
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 260,
  },
  agreementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#01763C',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#01763C',
    marginLeft: 12,
    flex: 1,
  },
  infoSection: {
    gap: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoRowColumn: {
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#01763C',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
  },
  infoValueDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#01763C',
    marginTop: 8,
    lineHeight: 22,
    textAlign: 'justify',
  },
  infoValueAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8ECEF',
    marginVertical: 5,
  },
  refreshButton: {
    backgroundColor: '#01763C',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  } as ViewStyle,
  emptyText: {
    fontSize: 16,
    color: '#01763C',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    fontWeight: '600',
  } as TextStyle,
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 20,
  } as TextStyle,
  retryButton: {
    backgroundColor: '#01763C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  } as ViewStyle,
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  } as TextStyle,
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 12,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 5,
  } as ViewStyle,
  tabItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  } as ViewStyle,
  tabLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
    width: '100%',
  } as TextStyle,
  activeTab: {
    color: '#01763C',
    fontWeight: '700',
  },
  // Estilos para acordeones
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8ECEF',
  } as ViewStyle,
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  } as ViewStyle,
  accordionHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
    backgroundColor: '#F8F9FA',
  } as ViewStyle,
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,
  accordionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  accordionHeaderText: {
    flex: 1,
  } as ViewStyle,
  accordionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#01763C',
    marginBottom: 4,
  } as TextStyle,
  accordionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  } as TextStyle,
  accordionStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: '#01763C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  } as TextStyle,
  accordionContent: {
    padding: 18,
    paddingTop: 12,
    backgroundColor: '#FAFBFC',
  } as ViewStyle,
  agreementSection: {
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  } as ViewStyle,
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#01763C',
    marginLeft: 8,
  } as TextStyle,
  sectionContent: {
    gap: 10,
  },
});
