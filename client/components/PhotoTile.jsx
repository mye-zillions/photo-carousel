import React from 'react';

const PhotoTile = props => (
  <div className="photo-tile" onClick={(() => passId(props)).bind(this)}>
    <img src={props.link}></img>
  </div>
);

const passId = (props) => {
  props.openModal(props.id);
}

export default PhotoTile;
