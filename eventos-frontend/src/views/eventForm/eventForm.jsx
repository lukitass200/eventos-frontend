import { useState } from 'react';
import { apiFetch } from '../../services/api';
import './EventForm.css';

export default function EventForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    duration_in_minutes: 60,
    price: 0,
    enabled_for_enrollment: true,
    max_assistance: 100,
    id_event_location: '',
  });

  const handleChange = e => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/event', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      alert('Evento creado correctamente');
      onCreated?.();
    } catch (err) {
      alert('Error al crear evento');
    }
  };

  return (
    <form className="eventForm" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" onChange={handleChange} />
      <input type="datetime-local" name="start_date" onChange={handleChange} />
      <input type="number" name="duration_in_minutes" placeholder="Duración" onChange={handleChange} />
      <input type="number" name="price" placeholder="Precio" onChange={handleChange} />
      <input type="number" name="max_assistance" placeholder="Capacidad" onChange={handleChange} />
      <input name="id_event_location" placeholder="ID Ubicación" onChange={handleChange} />
      <button type="submit">Crear Evento</button>
    </form>
  );
}
