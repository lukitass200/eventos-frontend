import { useState } from 'react';
import { apiFetch } from '../../services/api';

export default function EventLocationForm() {
  const [form, setForm] = useState({
    name: '',
    full_address: '',
    id_location: '',
    max_capacity: 0,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/event-location', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      alert('Ubicación creada');
    } catch (err) {
      alert('Error al crear ubicación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="full_address" placeholder="Dirección" onChange={handleChange} />
      <input name="id_location" placeholder="ID Localidad" onChange={handleChange} />
      <input name="max_capacity" type="number" placeholder="Capacidad máxima" onChange={handleChange} />
      <button type="submit">Crear ubicación</button>
    </form>
  );
}
