import React from 'react';
import PhotoTile from './PhotoTile';
import Modal from './Modal';
import {
  CarouselContainer,
  CarouselButton,
  ServiceContainer,
  CarouselLeftDiv,
  CarouselRightDiv,
} from '../styles';

const formatCommas = (num) => {
  const str = `${num}`;
  let numberString = '';
  for (let i = 0; i < str.length; i += 1) {
    if (i > 0 && i % 3 === 0) {
      numberString = `,${numberString}`;
    }
    numberString = str[str.length - 1 - i] + numberString;
  }

  return numberString;
};

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: 'none',
      modalId: '',
      basicDetails: {},
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

    fetch(`http://localhost:3333/api/${id}/basicdetails`)
      .then(response => response.json())
      .then(([basicDetails]) => {
        const details = basicDetails;
        details.price = formatCommas(details.price);
        details.sq_ft = formatCommas(details.sq_ft);
        return details;
      })
      .then(basicDetails => this.setState({ basicDetails }));
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
    const { thumbnails, modalView, modalId, basicDetails } = this.state;
    return (
      <ServiceContainer>
        <CarouselContainer>
          <CarouselLeftDiv>
            <CarouselButton><i className="material-icons md-36 icon-light back-icon">arrow_back_ios</i></CarouselButton>
          </CarouselLeftDiv>
          {thumbnails.map((link, id) => (
            <PhotoTile
              link={link}
              id={id}
              openModal={this.openModal}
            />
          ))}
          <CarouselRightDiv>
            <CarouselButton><i className="material-icons md-36 icon-light">arrow_forward_ios</i></CarouselButton>
          </CarouselRightDiv>
        </CarouselContainer>
        <Modal
          display={modalView}
          link={thumbnails[modalId]}
          id={modalId}
          imageCount={thumbnails.length}
          closeModal={this.closeModal}
          btnBack={this.modalNavigateBack}
          btnNext={this.modalNavigateNext}
          details={basicDetails}
        />
      </ServiceContainer>
    );
  }
}

export default PhotoCarousel;
