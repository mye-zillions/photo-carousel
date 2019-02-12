import React from 'react';

class Modal extends React.Component {

  closeModal(event) {
    // console.log(event.target);
    if (event.target.className.includes('modal')) {
      event.target.style.display = "none";
    }
  }

  render() {
    return (
      <div className="modal" onClick={this.closeModal.bind(this)}>
        <img className="imgs" src="https://www.drawingnow.com/file/videos/steps/121736/how-to-draw-a-simple-boat-step-7.jpg" />
      </div>
    )
  }
}

export default Modal;
