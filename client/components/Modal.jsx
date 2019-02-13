import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event) {
    const { closeModal } = this.props;
    if (event.target.className.includes('modal-container') || event.target.innerText === 'close') {
      closeModal();
    }
  }

  render() {
    const { display, btnBack, btnNext, id, imageCount, link } = this.props;
    return (
      <div className="modal-container" style={{display}} onClick={this.closeModal}>
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
              <div onClick={this.closeModal}>
                <i className="material-icons icon-light md-30">close</i>
              </div>
            </li>
          </ul>
        </div>
        <button className="back" onClick={() => { btnBack(id) }}><i className="material-icons md-36 icon-light">arrow_back_ios</i></button>
        <div className="content">
          <div className="modal-counter">{id + 1} of {imageCount}</div>
          <img className="imgs" src={link} alt="fullsize version" />
        </div>
        <button className="forward" onClick={() => { btnNext(id) }}><i className="material-icons md-36 icon-light">arrow_forward_ios</i></button>
      </div>
    )
  }
}

export default Modal;
