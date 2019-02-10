/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import ReactDOM from 'react-dom';
import PhotoCarousel from './components/PhotoCarousel.jsx';

const App = (props) => (
  <PhotoCarousel id={props.id} />
)

ReactDOM.render(
  <App id="45" />,
  document.getElementById('app')
)
