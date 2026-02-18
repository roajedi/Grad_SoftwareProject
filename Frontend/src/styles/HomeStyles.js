import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
    backgroundColor: '#2196F3', 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 40 
  },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  loginBtn: { 
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 5 
  },
  loginText: { color: 'white', fontWeight: 'bold' },
  logoutBtn: { 
    backgroundColor: '#f44336', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 5 
  },
  logoutText: { color: 'white', fontWeight: 'bold' },
  form: { 
    backgroundColor: 'white', 
    padding: 20, 
    margin: 15, 
    borderRadius: 10, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  input: { borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 15, padding: 8, fontSize: 16 },
  addButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    marginHorizontal: 20, 
    marginVertical: 6, 
    borderRadius: 8, 
    borderLeftWidth: 5, 
    borderLeftColor: '#2196F3',
    elevation: 2
  },
  cardName: { fontWeight: 'bold', fontSize: 17, color: '#2196F3' },
  cardDetails: { color: '#666', marginTop: 4, fontSize: 15 },
  cardInfo: { justifyContent: 'center' }
});