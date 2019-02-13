import React from 'react';

const PhotoTile = ({ openModal, id, link }) => (
  <div className="photo-tile" onClick={() => openModal(id)}>
    <img src={link} alt="property" />
  </div>
);

export default PhotoTile;
