import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';

export default function ParticipantsList() {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    apiFetch(`/event/${id}/participants`)
      .then(data => setParticipants(data.collection || []))
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <h3>Participantes</h3>
      <ul>
        {participants.map((p, i) => (
          <li key={i}>
            {p.user.first_name} {p.user.last_name} - {p.attended ? 'Asistió' : 'No asistió'}
          </li>
        ))}
      </ul>
    </div>
  );
}
