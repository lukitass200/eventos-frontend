import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/event/new">Nuevo Evento</Link>
      <Link to="/event-location/new">Nueva Ubicación</Link>
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
  );
}
