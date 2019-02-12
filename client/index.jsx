/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import ReactDOM from 'react-dom';
import PhotoCarousel from './components/PhotoCarousel.jsx';
import Modal from './components/Modal.jsx';
import './styles/style.css';

const App = (props) => (
  <div>
    <PhotoCarousel id={props.id} />
    <Modal />
  </div>
)

ReactDOM.render(
  <App id="45" />,
  document.getElementById('app')
)
