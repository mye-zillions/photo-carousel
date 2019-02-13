import React from 'react';
import PhotoTile from './PhotoTile';
import Modal from './Modal';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: 'none',
      modalId: '',
      thumbnails: [],
      // fulls: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalNavigateBack = this.modalNavigateBack.bind(this);
    this.modalNavigateNext = this.modalNavigateNext.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`http://localhost:3333/api/photos/${id}`) // $SERVER_URL
      .then(response => response.json())
      .then(links => links.map(({ url }) => url))
      .then(thumbnails => this.setState({ thumbnails }));
  }

  openModal(id) {
    this.setState({
      modalView: 'flex',
      modalId: id,
    });
  }

  closeModal() {
    this.setState({
      modalView: 'none',
    });
  }

  modalNavigateNext(id) {
    const { thumbnails } = this.state;
    const modalId = (id + 1) % thumbnails.length;
    this.setState({
      modalId,
    });
  }

  modalNavigateBack(id) {
    const { thumbnails } = this.state;
    const modalId = ((id - 1) + thumbnails.length) % thumbnails.length;
    this.setState({
      modalId,
    });
  }

  render() {
    const { thumbnails, modalView, modalId } = this.state;
    return (
      <div className="container">
        <div className="carousel-container">
          {thumbnails.map((link, id) => (
            <PhotoTile
              link={link}
              id={id}
              openModal={this.openModal}
            />
          ))}
        </div>
        <Modal
          display={modalView}
          link={thumbnails[modalId]}
          id={modalId}
          imageCount={thumbnails.length}
          closeModal={this.closeModal}
          btnBack={this.modalNavigateBack}
          btnNext={this.modalNavigateNext}
        />
      </div>
    );
  }
}

export default PhotoCarousel;
