import React from 'react';

class Modal extends React.Component {
  closeModal(event) {
    if (event.target.className.includes('modal')) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className="modal" style={{display: this.props.display}} onClick={this.closeModal.bind(this)}>
        <button className="back" onClick={() => {this.props.btnBack(this.props.id)}}><span className="buttonText">&lt;</span></button>
        <div className="content">
          <div className="modal-counter">{this.props.id + 1} of {this.props.imageCount}</div>
          <img className="imgs" src={this.props.link} />
        </div>
        <button className="forward" onClick={() => {this.props.btnNext(this.props.id)}}><span className="buttonText">&gt;</span></button>
      </div>
    )
  }
}

export default Modal;
