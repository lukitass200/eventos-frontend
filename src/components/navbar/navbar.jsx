import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Inicio</Link>
        {isLoggedIn && (
          <>
            <Link to="/event/new">Nuevo Evento</Link>
            <Link to="/event-location/new">Nueva Ubicación</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <><button onClick={logout}>Cerrar sesión</button><Link className='link1' to="/profileView"><img src="src\assets\image.png" alt="" className='iconUser' /></Link></>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
            <Link className = 'link1' to ="/profileView"><img src="src\assets\image.png" alt="" className='iconUser' /></Link>
          </>
        )}
      </div>
    </nav>
  );
}
