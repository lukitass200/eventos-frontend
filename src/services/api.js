export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      ...options,
      headers,
    });
  
    if (!res.ok) throw new Error(await res.text());
  
    return res.json();
  }
  