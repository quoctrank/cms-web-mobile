
import axios from 'axios';
const api = axios.create({ baseURL: (process.env.GATSBY_STRAPI_URL || 'http://localhost:1337') + '/api' });
export const setAuthToken = (token) => { if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`; else delete api.defaults.headers.common['Authorization']; };
export const AuthAPI = { login: async (identifier, password) => (await api.post('/auth/local', { identifier, password })).data };
export const TransactionAPI = {
  list: async (params = {}) => (await api.get('/transactions', { params: { populate: '*', sort: 'booked_at:desc', ...params } })).data,
  create: async (payload) => (await api.post('/transactions', { data: payload })).data,
  update: async (id, payload) => (await api.put(`/transactions/${id}`, { data: payload })).data,
  remove: async (id) => { await api.delete(`/transactions/${id}`); return true; },
};
export const CategoryAPI = { list: async () => (await api.get('/categories')).data };
export const WalletAPI   = { list: async () => (await api.get('/wallets')).data };
export default api;
