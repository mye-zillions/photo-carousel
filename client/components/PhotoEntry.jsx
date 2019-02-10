import React from 'react';

const PhotoEntry = props => (
  <div className="photo-tile">
    <img src={props.link}></img>
  </div>
);

export default PhotoEntry;
