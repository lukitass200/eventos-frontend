import { useState } from 'react';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.status === 201) {
      alert('Registro exitoso. Ahora podés iniciar sesión.');
    } else {
      const data = await res.json();
      alert(data.message || 'Error al registrarse');
    }
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} />
      <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} />
      <input type="email" name="username" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
}
