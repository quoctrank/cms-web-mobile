
import Constants from 'expo-constants';
const BASE_URL = (Constants?.expoConfig?.extra?.API_URL) || 'http://localhost:1337/api';
let token = null; export const setAuthToken = (t) => { token = t; };
async function request(path, options = {}){
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok){ const txt = await res.text(); throw new Error(`HTTP ${res.status}: ${txt}`); }
  return await res.json();
}
export const AuthAPI = { login: async (identifier, password) => request('/auth/local', { method: 'POST', body: JSON.stringify({ identifier, password }) }) };
export const TransactionAPI = { list: async (params = '') => request(`/transactions?populate=*${params}`), create: async (payload) => request('/transactions', { method: 'POST', body: JSON.stringify({ data: payload }) }) };
export const CategoryAPI = { list: async () => request('/categories') };
export const WalletAPI   = { list: async () => request('/wallets') };
