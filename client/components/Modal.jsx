import React from 'react';

class Modal extends React.Component {
  closeModal(event) {
    if (event.target.className.includes('modal-container') || event.target.innerText === 'close') {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className="modal-container" style={{display: this.props.display}} onClick={this.closeModal.bind(this)}>
        <div className="modal-bar">
          <div className="modal-tab-link">
            <div>Photos</div>
          </div>
          <ul className="modal-gallery-actions">
            <li>
              <div>
                <button>Contact agent</button>
              </div>
            </li>
            <li>
              <div>
                <i className="material-icons icon-light md-18">favorite_border</i>
                <span>Save Home</span>
              </div>
            </li>
            <li>
              <div>
                <i className="material-icons icon-light md-18">email</i>
                <span>Share</span>
              </div>
            </li>
            <li>
              <div onClick={this.closeModal.bind(this)}>
                <i className="material-icons icon-light md-30">close</i>
              </div>
            </li>
          </ul>
        </div>
        <button className="back" onClick={() => {this.props.btnBack(this.props.id)}}><i className="material-icons md-36 icon-light">arrow_back_ios</i></button>
        <div className="content">
          <div className="modal-counter">{this.props.id + 1} of {this.props.imageCount}</div>
          <img className="imgs" src={this.props.link} />
        </div>
        <button className="forward" onClick={() => {this.props.btnNext(this.props.id)}}><i className="material-icons md-36 icon-light">arrow_forward_ios</i></button>
      </div>
    )
  }
}

export default Modal;
