import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import '../eventDetail/eventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/event/${id}`)
      .then(data => setEvent(data))
      .catch(err => {
        console.error('Error al obtener evento:', err);
        setError('No se pudo cargar el evento.');
      });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!event) return <p className="loading">Cargando evento...</p>;

  const location = event.event_location?.location;
  const province = location?.province;

  return (
    <div className="eventDetail">
      <h2>{event.name}</h2>
      <p className="description">{event.description}</p>

      <div className="infoGroup">
        <p><strong>Fecha:</strong> {new Date(event.start_date).toLocaleString()}</p>
        <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
        <p><strong>Precio:</strong> ${event.price}</p>
        <p><strong>Capacidad máx:</strong> {event.max_assistance}</p>
        <p><strong>Habilitado para inscripción:</strong> {event.enabled_for_enrollment ? 'Sí' : 'No'}</p>
      </div>

      <div className="location">
        <h3>Ubicación</h3>
        <p><strong>Lugar:</strong> {event.event_location?.name}</p>
        <p><strong>Dirección:</strong> {event.event_location?.full_address}</p>
        <p><strong>Localidad:</strong> {location?.name}</p>
        <p><strong>Provincia:</strong> {province?.name}</p>
      </div>

      <div className="tags">
        <h3>Tags</h3>
        {event.tags?.length > 0 ? (
          <ul>
            {event.tags.map(tag => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay tags.</p>
        )}
      </div>

      <div className="creator">
        <h3>Organizado por</h3>
        <p>{event.creator_user?.first_name} {event.creator_user?.last_name}</p>
        <p>{event.creator_user?.username}</p>
      </div>
    </div>
  );
}
