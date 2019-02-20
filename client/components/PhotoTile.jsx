import React from 'react';
import { Tile } from '../styles';

const PhotoTile = ({ openModal, id, link, height, width }) => (
  <Tile
    onClick={() => openModal(id)} 
    style={{
      backgroundImage: `url('${link}')`,
      height,
      width,
    }}
  >
  </Tile>
);

export default PhotoTile;
