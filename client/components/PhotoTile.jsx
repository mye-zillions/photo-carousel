import React from 'react';
import { Tile } from '../styles';

const PhotoTile = ({ openModal, id, link }) => (
  <Tile onClick={() => openModal(id)}>
    <img src={link} alt="property" />
  </Tile>
);

export default PhotoTile;
