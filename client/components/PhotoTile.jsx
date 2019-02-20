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
    {/* <img src={link} alt="property" /> */}
  </Tile>
);

export default PhotoTile;
