const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:5000') + '/api';
const ORIGIN = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL ? new URL(import.meta.env.VITE_API_URL).origin : 'http://localhost:5000');

function getToken() {
  return localStorage.getItem('token');
}

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return ORIGIN ? `${ORIGIN}${path}` : path;
}

export async function api(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText || 'Request failed');
  return data;
}

export const authApi = {
  register: (body) => api('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => api('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => api('/auth/me'),
};

export const carsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/cars?${q}`);
  },
  featured: () => api('/cars/featured'),
  get: (id) => api(`/cars/${id}`),
  create: (body) => api('/cars', { method: 'POST', body: JSON.stringify(body) }),
  createWithImages: (formData) => api('/cars', { method: 'POST', body: formData }),
  update: (id, body) => api(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  updateWithImages: (id, formData) => api(`/cars/${id}`, { method: 'PUT', body: formData }),
  delete: (id) => api(`/cars/${id}`, { method: 'DELETE' }),
  myListings: () => api('/cars/my/listings'),
};
