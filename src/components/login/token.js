export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');

  return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }) 
    }
  });
}
