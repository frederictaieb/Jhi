import React from 'react';
import '../styles/ThreeColumns.css'; // Importation du fichier CSS global

const ThreeColumnsBody = () => {
  return (
    <div className="columns-container">
      <div className="column">
        <div className="content">
          <p>Contenu de la colonne 1...</p>
          <p>Plus de contenu...</p>
        </div>
      </div>

      <div className="column">
        <div className="content">
          <p>Contenu de la colonne 2...</p>
          <p>Plus de contenu...</p>
        </div>
      </div>

      <div className="column">
        <div className="content">
          <p>Contenu de la colonne 3...</p>
          <p>Plus de contenu...</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnsBody;