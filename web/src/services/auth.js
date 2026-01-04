
import { AuthAPI, setAuthToken } from './api';
const TOKEN_KEY = 'expense_jwt';
export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  isLoggedIn: () => !!localStorage.getItem(TOKEN_KEY),
  login: async (identifier, password) => { const res = await AuthAPI.login(identifier, password); localStorage.setItem(TOKEN_KEY, res.jwt); setAuthToken(res.jwt); return res.user; },
  logout: () => { localStorage.removeItem(TOKEN_KEY); setAuthToken(null); },
  init: () => { const t = localStorage.getItem(TOKEN_KEY); setAuthToken(t); },
};
