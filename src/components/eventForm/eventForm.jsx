import { useState } from 'react';
import { apiFetch } from '../../services/api';
import '../eventForm/eventForm.css';

export default function EventForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    id_event_category: '',        // ✅ obligatorio
    start_Date: '',               // ✅ coincide con backend
    duration_in_minutes: 60,
    price: 0,
    enabled_for_enrollment: true,
    max_assistance: 100,
    id_event_location: '',        // ✅ número
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
        headers: { 'Content-Type': 'application/json' },
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
      <input type="number" name="id_event_category" placeholder="ID Categoría" onChange={handleChange} />
      <input type="datetime-local" name="start_Date" onChange={handleChange} />
      <input type="number" name="duration_in_minutes" placeholder="Duración" onChange={handleChange} />
      <input type="number" name="price" placeholder="Precio" onChange={handleChange} />
      <input type="number" name="max_assistance" placeholder="Capacidad" onChange={handleChange} />
      <input type="number" name="id_event_location" placeholder="ID Ubicación" onChange={handleChange} />
      <button type="submit">Crear Evento</button>
    </form>
  );
}
