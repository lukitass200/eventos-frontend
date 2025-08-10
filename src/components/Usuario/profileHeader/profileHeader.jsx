import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <img
        src="src\assets\serena.jpg" 
        alt="Foto de perfil"
        className="profile-img"
      />
      <div className="profile-info">
        <h3 className="profile-name">SERENA</h3>
        <p className="profile-username">Van der Woodsen</p>
        <div className="profile-actions">
          <button className="edit-btn">Editar perfil</button>
          <button className="logout-btn">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};


export default ProfileHeader;