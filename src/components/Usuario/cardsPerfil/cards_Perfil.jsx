import React, { useEffect, useState } from 'react';
import './cards_Perfil.css';
import Card from '../../card/Card';

const PublicacionesUsuario = ({ idUsuario }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/usuario/${idUsuario}/publicaciones`);
        if (!res.ok) throw new Error('Error al obtener publicaciones');
        const json = await res.json();
        setPublicaciones(json);
      } catch (err) {
        setError(err.message);
        setPublicaciones([]);
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) fetchData();
  }, [idUsuario]);
  
  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error: {error}</p>;

 
return (
  <div>
    <h2 className='title'>Publicaciones del Usuario</h2>
    {publicaciones.length === 0 ? (
      <p className='noLibros'>No hay publicaciones.</p>
    ) : (
      <div className="publicaciones-grid">
        {publicaciones.map((publi) => (
          <Card
            key={publi.id}
            id={publi.id}
            nombre_libro={publi.nombre_libro}
            imagenes={publi.imagenes}
            price={publi.precio}
            id_usuario={publi.id_usuario}
          />
        ))}
      </div>
    )}
  </div>
);
        }

export default PublicacionesUsuario;