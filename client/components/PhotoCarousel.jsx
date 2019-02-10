import React from 'react';
import PhotoEntry from './PhotoEntry.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalView: false,
      links: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3333/api/photos/${this.props.id}`)
      .then(response => response.json())
      .then(links => {
        return links.map(({url}) => url)
      })
      .then(links => this.setState( {links} ));
  }

  render() {
    return (
      <div className="carousel">
        {this.state.links.map(link => (
          <PhotoEntry link={link}/>
        ))}
      </div>
    )
  }
}

export default PhotoCarousel;
