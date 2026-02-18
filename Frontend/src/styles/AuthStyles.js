import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#B11226',
  dark: '#1C1C1C',
  gray: '#2E2E2E',
  light: '#FFFFFF',
  facebook: '#1877F2',
  google: '#DB4437',
  apple: '#000000',
};

export default StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  card: { width: '100%', padding: 25 },
  webCard: { maxWidth: 420, backgroundColor: COLORS.gray, borderRadius: 16 },
  logo: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: { color: COLORS.light, textAlign: 'center', marginBottom: 30 },
  input: {
    backgroundColor: COLORS.light,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#000'
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center'
  },
  buttonText: { color: COLORS.light, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  create: { color: COLORS.light, textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' },
  back: { color: COLORS.primary, textAlign: 'center', marginTop: 20 },
  backButtonTop: { alignSelf: 'flex-start', marginBottom: 10 },
  backButtonText: { color: COLORS.light, fontSize: 16, opacity: 0.7 },
  socialSection: { marginTop: 35 },
  socialIcons: { flexDirection: 'row', justifyContent: 'center' },
  iconCircle: {
    width: 55, height: 55, borderRadius: 27.5,
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
  },
  iconText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  forgotRight: { color: COLORS.primary, alignSelf: 'flex-end', marginBottom: 15 },
});