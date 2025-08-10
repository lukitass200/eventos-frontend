import React, { useState } from 'react';
import ProfileHeader from '../components/Usuario/profileHeader/profileHeader.jsx';
import PublicacionesUsuario from '../components/Usuario/cardsPerfil/cards_Perfil.jsx';
     

const ProfileView = () => {
  const idUsuario = 1; // Replace with actual logged-in user ID
  const [activeTab, setActiveTab] = useState('Publicaciones'); // Default tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Determine which component to render based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'Publicaciones':
        return <PublicacionesUsuario idUsuario={idUsuario} />;
      case 'Favoritos':
        return <FavoritosUsuario idUsuario={idUsuario} />;
      case 'Reviews':
        return <ReviewsUsuario idUsuario={idUsuario} />;
      case 'Compras':
        return <ComprasUsuario idUsuario={idUsuario} />;
      default:
        return <PublicacionesUsuario idUsuario={idUsuario} />; 
    }
  };

  return (
    <div className="profile-container">
      <ProfileHeader />
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="card-list">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileView;