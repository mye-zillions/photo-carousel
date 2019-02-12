import React from 'react';
import PhotoTile from './PhotoTile.jsx';
import Modal from './Modal.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: 'none',
      modalId: '',
      thumbnails: [],
      fulls: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3333/api/photos/${this.props.id}`) // $SERVER_URL
      .then(response => response.json())
      .then(links => {
        return links.map(({url}) => url)
      })
      .then(thumbnails => this.setState({thumbnails}));
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
    id = (id + 1) % this.state.thumbnails.length;
    this.setState({
      modalId: id,
    });
  }

  modalNavigateBack(id) {
    id = ((id - 1) + this.state.thumbnails.length) % this.state.thumbnails.length;
    this.setState({
      modalId: id,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="carousel-container">
          {this.state.thumbnails.map((link, id) => (
            <PhotoTile 
              link={link} 
              id={id} 
              openModal={this.openModal.bind(this)} 
            />
            ))}
        </div>
        <Modal 
          display={this.state.modalView} 
          link={this.state.thumbnails[this.state.modalId]} 
          id={this.state.modalId}
          imageCount={this.state.thumbnails.length}
          closeModal={this.closeModal.bind(this)} 
          btnBack={this.modalNavigateBack.bind(this)}
          btnNext={this.modalNavigateNext.bind(this)}
        />
      </div>
    )
  }
}

export default PhotoCarousel;
