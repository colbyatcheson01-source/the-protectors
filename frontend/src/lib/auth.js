const TOKEN_KEY = 'enforcers_admin_token';
const ADMIN_KEY = 'enforcers_admin_data';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdmin() {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
}

export function setAuth(token, admin) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`/api/admin${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Request failed');
  }

  return res.json();
}
