import { useState, useEffect } from 'react';
import './EventCard.css';
export default function EventCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/api/event')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.collection || []);
      })
      .catch((error) => {
        console.error('Error al obtener eventos:', error);
      });
  }, []);

  return (
    <div className="EventCard">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No hay eventos disponibles</p>
      )}
    </div>
  );
}