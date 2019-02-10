import React from 'react';
import PhotoEntry from './PhotoEntry.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: false,
      thumbnails: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3333/api/photos/${this.props.id}`)
      .then(response => response.json())
      .then(links => {
        return links.map(({url}) => url)
      })
      .then(thumbnails => this.setState({thumbnails}));
  }

  render() {
    return (
      <div className="carousel-container">
        {this.state.thumbnails.map((link, id) => (
          <PhotoEntry link={link} id={id} />
        ))}
      </div>
    )
  }
}

export default PhotoCarousel;
