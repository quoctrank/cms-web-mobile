
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthAPI, setAuthToken } from './api';
const TOKEN_KEY = 'expense_jwt';
export const auth = {
  getToken: async () => AsyncStorage.getItem(TOKEN_KEY),
  isLoggedIn: async () => !!(await AsyncStorage.getItem(TOKEN_KEY)),
  login: async (identifier, password) => { const res = await AuthAPI.login(identifier, password); await AsyncStorage.setItem(TOKEN_KEY, res.jwt); setAuthToken(res.jwt); return res.user; },
  logout: async () => { await AsyncStorage.removeItem(TOKEN_KEY); setAuthToken(null); },
  init: async () => { const t = await AsyncStorage.getItem(TOKEN_KEY); setAuthToken(t); },
};
