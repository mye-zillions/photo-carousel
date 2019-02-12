import React from 'react';
import ReactDOM from 'react-dom';
import PhotoCarousel from './components/PhotoCarousel.jsx';
import './styles/style.css';

const App = (props) => (
  <PhotoCarousel id={props.id} />
)

ReactDOM.render(
  <App id="45" />,
  document.getElementById('app')
)
