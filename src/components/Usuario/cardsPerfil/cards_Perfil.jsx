import React, { useEffect, useState } from 'react';
import './cards_Perfil.css';
import Card from '../../eventCard/eventCard';

const EventosUsuario = ({ idUsuario }) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/usuario/${idUsuario}/eventos`);
        if (!res.ok) throw new Error('Error al obtener eventos');
        const json = await res.json();
        setEventos(json);
      } catch (err) {
        setError(err.message);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) fetchData();
  }, [idUsuario]);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className='title'>Eventos del Usuario</h2>
      {eventos.length === 0 ? (
        <p className='noLibros'>No hay eventos.</p>
      ) : (
        <div className="publicaciones-grid">
          {eventos.map((evento) => (
            <Card
              key={evento.id}
              id={evento.id}
              nombre_libro={evento.name} 
              imagenes={evento.imagenes || []} 
              price={evento.price}
              id_usuario={evento.id_creator_user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventosUsuario;
