import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import EventCard from '../eventCard/eventCard';
import '../eventList/eventList.css';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offSet, setOffSet] = useState(1); // Estado para el offset
  const limit = 10; // Número de eventos por página

  useEffect(() => {
    setLoading(true);
    apiFetch(`/event/?limit=${limit}&offset=${offSet}`)
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar eventos:', err);
        setError('No se pudieron cargar los eventos.');
        setLoading(false);
      });
  }, [limit, offSet]); // Solo vuelve a cargar si offSet o limit cambian

  const handleNextPage = () => {
    setOffSet((prevOffSet) => prevOffSet + 1); // Sumar 1 al offset para la siguiente página
  };

  const handlePrevPage = () => {
    if (offSet > 1) {
      setOffSet((prevOffSet) => prevOffSet - 1); // Restar 1 al offset para la página anterior
    }
  };

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

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={offSet === 1}>
          &#8592; Anterior
        </button>
        <button onClick={handleNextPage}>
          Siguiente &#8594;
        </button>
      </div>
    </div>
  );
}