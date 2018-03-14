import React from 'react';
import ExecutionEnvironment from 'exenv';
import {
  Link
} from 'react-router-dom';
import Masonry from 'react-masonry-component';
import * as Icon from 'react-feather';
import __sitemap__ from './sitemap';
import debounce from './debounce';
import getGalleryData from './getGalleryData';

class FlickrGallery extends React.Component {

  handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
      debounce(this.addImages(), 750);
    }
  }

  addImages() {
    if (this.state.gallery !== null && this.state.photoShow <= this.state.gallery.length) {

      let currentEnd = this.state.photoShow + 10;

      this.setState({
        photoShow: currentEnd
      });
    }
  }

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('scroll', this.handleScroll);
    }
    /*
      INIT
    */
    this.addImages();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  constructor(props) {
    super(props);

    let optIndex = props.match.params.index === undefined ?
      null : Number(props.match.params.index);

    this.state = {
      gallery: __sitemap__.photography,
      ind: optIndex,
      photoShow: 10
    };
    if (!this.state.gallery) {

      let flickrData =  getGalleryData();
      let __gallery = this;

      flickrData.then(function(data){
        __gallery.setState({
          gallery: __sitemap__.photography
        });
      });
    }

    // Bind methods to gallery Class
    this.handleScroll = this.handleScroll.bind(this);
    this.addImages = this.addImages.bind(this);
  }

  render() {

    if (this.state.gallery !== null) {

      const masonryOptions = {
        transitionDuration: 0
      };

      let photos = this.state.gallery.slice(0, this.state.photoShow);
      let __gallery = this;

      const photoList = photos.map((photo, index) => {

        let imgSize = null;

        if (index === this.state.ind){
          imgSize = 'k';
        }
        else {
          imgSize = 'z'
        }

        return (
          <div key={index} className="photo-wrap">
            <Link className="photo-link" to={["/photography", photo.secret, photo.farm, photo.server, photo.id].join('/')}>
              <Icon.Maximize2 />
            </Link>
            <img src={[
                "https://farm",
                photo.farm,
                ".staticflickr.com/",
                photo.server,
                "/",
                photo.id,
                "_",
                photo.secret,
                "_",
                imgSize,
                ".jpg"
              ].join("")} alt={""} />
          </div>
        );
      });

      return (
        <div className="col">
          <Masonry
            className={'flickr-img'}
            elementType={'div'}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}>
            {photoList}
          </Masonry>
        </div>
      );

    } else {

      return (
        <p>Getting gallery data...</p>
      )
    }
  }
}

export default FlickrGallery;