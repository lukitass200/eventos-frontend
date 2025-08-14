import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { apiFetch } from './token';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      localStorage.setItem('token', data.token);
       window.location.reload();
      onLoginSuccess?.();
      navigate(redirectPath, { replace: true });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <form className="loginForm" onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Entrar'}
      </button>
    </form>
  );
}
