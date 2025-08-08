import { Link } from 'react-router-dom';
import '../eventCard/eventCard.css';

export default function EventCard({ event }) {
  if (!event) return null;

  return (
    <Link to={`/eventDetail/${event.id}`} className="EventCardLink">
      <div className="EventCard">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        {event.start_date && (
          <p>Fecha: {new Date(event.start_date).toLocaleDateString()}</p>
        )}
        <p>Precio: ${event.price}</p>
        <p>Lugar: {event.eventLocation?.name}</p>
      </div>
    </Link>
  );
}
