import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal(event) {
    if (event.target.className.includes('modal')) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className="modal" style={{display: this.props.display}} onClick={this.closeModal.bind(this)}>
        <img className="imgs" src={this.props.link} />
      </div>
    )
  }
}

export default Modal;
