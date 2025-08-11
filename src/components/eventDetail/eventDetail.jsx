import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import '../eventDetail/eventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Obtener el usuario actual desde el token
    apiFetch(`/user/me`)
      .then(user => {
        setCurrentUserId(user.id);
        console.log(user.id)
      })
      .catch(err => {
        console.error("Error obteniendo usuario logueado:", err);
      });

    // Traer detalle del evento
    apiFetch(`/event/${id}`)
      .then(data => setEvent(data))
      .catch(err => {
        console.error('Error al obtener evento:', err);
        setError('No se pudo cargar el evento.');
      });

    // Verificar inscripción
    apiFetch(`/event/${id}/enrollment`)
      .then(data => setIsEnrolled(data.enrolled))
      .catch(err => console.error('Error verificando inscripción:', err));

  }, [id]);
  console.log(event)
  // Verificar si es dueño del evento
  useEffect(() => {
    if (event && currentUserId) {
      setIsOwner(currentUserId == event.creator_user?.id); 
    }
  }, [event, currentUserId]);

  if (error) return <p className="error">{error}</p>;
  if (!event) return <p className="loading">Cargando evento...</p>;

  const handleEnroll = () => {
    setLoadingEnroll(true);
    apiFetch(`/api/event/${id}/enrollment`, {
      method: 'POST',
      body: JSON.stringify({ description: '' })
    })
      .then(() => setIsEnrolled(true))
      .catch(err => console.error(err))
      .finally(() => setLoadingEnroll(false));
  };

  const handleUnenroll = () => {
    setLoadingEnroll(true);
    apiFetch(`/api/event/${id}/enrollment`, {
      method: 'DELETE'
    })
      .then(() => setIsEnrolled(false))
      .catch(err => console.error(err))
      .finally(() => setLoadingEnroll(false));
  };

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
        <p><strong>Lugar:</strong> {event.eventLocation?.name}</p>
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

      <div className="actions">
        {isOwner ? (
          <button onClick={() => navigate(`/editEventForm/${id}`)}>Editar evento</button>
        ) : isEnrolled ? (
          <button onClick={handleUnenroll} disabled={loadingEnroll}>
            {loadingEnroll ? 'Procesando...' : 'Darme de baja'}
          </button>
        ) : (
          <button onClick={handleEnroll} disabled={loadingEnroll || !event.enabled_for_enrollment}>
            {loadingEnroll ? 'Procesando...' : 'Inscribirme'}
          </button>
        )}
      </div>
    </div>
  );
}
