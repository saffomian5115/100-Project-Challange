import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    authApi.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    localStorage.setItem('token', data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone, role: data.role, isFrozen: data.isFrozen });
    return data;
  };

  const register = async (name, email, password, phone) => {
    const data = await authApi.register({ name, email, password, phone });
    localStorage.setItem('token', data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone, role: data.role, isFrozen: data.isFrozen });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
