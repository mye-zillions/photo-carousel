import React from 'react';
import ReactDOM from 'react-dom';
import PhotoCarousel from './components/PhotoCarousel';
import './styles/style.css';

const App = ({ id }) => (
  <PhotoCarousel id={id} />
);

ReactDOM.render(
  <App id="45" />,
  document.getElementById('app'),
);
