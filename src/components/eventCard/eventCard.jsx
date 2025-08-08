import './eventCard.css';

export default function EventCard({ event }) {
  if (!event) return null;

  return (
    <div className="EventCard">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      {event.start_date && (
        <p>Fecha: {new Date(event.start_date).toLocaleDateString()}</p>
      )}
      <p>Precio: ${event.price}</p>
      <p>Lugar: {event.eventLocation?.name}</p>
    </div>
  );
}
