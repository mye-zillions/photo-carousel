import React from 'react';
import PhotoTile from './PhotoTile';
import Modal from './Modal';
import {
  CarouselContainer,
  CarouselButton,
  ServiceContainer,
  CarouselLeftDiv,
  CarouselRightDiv,
  ImageContainer,
  BackIcon,
  NextIcon,
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
      beginScroll: true,
      endScroll: false,
      basicDetails: {},
      thumbnails: [],
      fulls: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalNavigateBack = this.modalNavigateBack.bind(this);
    this.modalNavigateNext = this.modalNavigateNext.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`/api/thumb/photos/${id}`) // $SERVER_URL
      .then(response => response.json())
      .then(links => links.map(({ url }) => url))
      .then(thumbnails => this.setState({ thumbnails }));

    fetch(`/api/full/photos/${id}`) // $SERVER_URL
      .then(response => response.json())
      .then(links => links.map(({ url }) => url))
      .then(fulls => this.setState({ fulls }));

    fetch(`/api/basicdetails/${id}`)
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

  // eslint-disable-next-line class-methods-use-this
  scrollLeft(event) {
    event.preventDefault();
    const carousel = document.querySelector('#carousel');
    const start = carousel.scrollLeft;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, 0 - carousel.clientWidth, 1000);
      carousel.scrollLeft = val;
      if (currentTime < 1000) {
        setTimeout(animateScroll, increment);
      } else {
        this.setState({
          beginScroll: (carousel.scrollLeft) ? false : true,
          endScroll: false,
        });
      }
    };
    animateScroll();
  }

  // eslint-disable-next-line class-methods-use-this
  scrollRight(event) {
    event.preventDefault();
    const carousel = document.querySelector('#carousel');
    const { endScroll } = this.state;

    const start = carousel.scrollLeft;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (distance, callback) => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, distance, 1000);
      carousel.scrollLeft = val;
      if (currentTime < 1000) {
        setTimeout(() => { animateScroll(distance, callback); }, increment);
      } else {
        callback();
      }
    };

    if (endScroll) {
      animateScroll(0 - carousel.scrollWidth, () => {
        this.setState({
          beginScroll: true,
          endScroll: false,
        });
      });
    } else {
      animateScroll(carousel.clientWidth, () => {
        if (carousel.scrollLeft !== 0) {
          this.setState({
            beginScroll: false,
          });
        }

        if ((carousel.scrollLeft + carousel.clientWidth) === carousel.scrollWidth) {
          this.setState({
            endScroll: true,
          });
        }
      });
    }
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
    const {
      thumbnails,
      fulls,
      modalView,
      modalId,
      beginScroll,
      endScroll,
      basicDetails,
    } = this.state;
    return (
      <ServiceContainer>
        <CarouselContainer>
          <CarouselLeftDiv>
            <CarouselButton style={{ display: beginScroll ? 'none' : 'flex' }} onClick={this.scrollLeft}>
              <BackIcon className="material-icons md-36">arrow_back_ios</BackIcon>
            </CarouselButton>
          </CarouselLeftDiv>
          <ImageContainer id="carousel">
            {thumbnails.map((link, id) => (
              <PhotoTile
                link={link}
                id={id}
                openModal={this.openModal}
                height={id ? '206px' : '414px'}
                width={id ? '278px' : '548px'}
              />
            ))}
          </ImageContainer>
          <CarouselRightDiv>
            <CarouselButton onClick={this.scrollRight}>
              <NextIcon className="material-icons md-36">{endScroll ? 'replay' : 'arrow_forward_ios'}</NextIcon>
            </CarouselButton>
          </CarouselRightDiv>
        </CarouselContainer>
        <Modal
          display={modalView}
          link={fulls[modalId]}
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

// t = current time
// b = start value
// c = change in value
// d = duration
// eslint-disable-next-line func-names
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t -= 1;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

export default PhotoCarousel;
