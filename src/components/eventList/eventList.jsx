import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import EventCard from '../eventCard/eventCard';
import '../eventList/eventList.css';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch('/event')
      .then(data => {
        console.log('RESPUESTA COMPLETA DE /event:', data);
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar eventos:', err);
        setError('No se pudieron cargar los eventos.');
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="loading">Cargando eventos...</p>;
  
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="eventList">
      {events.length > 0 ? (
        events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No hay eventos disponibles</p>
      )}
    </div>
  );
}