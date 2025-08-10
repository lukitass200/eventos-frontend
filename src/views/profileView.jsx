import React, { useState } from 'react';
import ProfileHeader from '../components/Usuario/profileHeader/profileHeader.jsx';
import PublicacionesUsuario from '../components/Usuario/cardsPerfil/cards_Perfil.jsx';
     

const ProfileView = () => {
  const idUsuario = 1; // Replace with actual logged-in user ID
  

  return (
    <div className="profile-container">
      <ProfileHeader />
      <div className="card-list">
      </div>
    </div>
  );
};

export default ProfileView;