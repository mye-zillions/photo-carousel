import React from 'react';

const PhotoEntry = props => (
  <div className="photo">
    <img src={props.link}></img>
  </div>
);

export default PhotoEntry;
