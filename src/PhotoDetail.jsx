import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import axios from 'axios';
import __sitemap__ from './sitemap';
import getGalleryData from './getGalleryData';


class PhotoDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      photo: {
        title: null,
        description: null,
      },
      next: null,
      prev: null,
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
  }

  getPhotoInfo() {
    let __photoDetail = this;

    axios
      .get('https://api.flickr.com/services/rest/', {
        params: {
          nojsoncallback: 1,
          method: 'flickr.photos.getInfo',
          api_key: 'cf8f1cf4fdd37bce0498531da5f31ed1',
          photo_id: __photoDetail.props.match.params.id,
          extras: 'description',
          format: 'json'
        }
      })
      .then(function(response) {
        // Photo detail state updated with data from Flickr API
        __photoDetail.setState({
          photo: response.data.photo
        });
      })
      .catch(function(error) {
        console.log(error);
      }
    );
  }

  render() {

    let __photo = this.props.match.params;

    function navImgSrc(imgObj){
      debugger;
      return [
        "https://farm",
        imgObj.farm,
        ".staticflickr.com/",
        imgObj.server,
        "/",
        imgObj.id,
        "_",
        imgObj.secret,
          "_m.jpg"
        ].join("")
    }
    function photoDetailLink(imgObj){
      return [
        '/photography',
        imgObj.secret,
        imgObj.farm,
        imgObj.server,
        imgObj.id,
      ].join('/')
    }

    let galleryNavigation = null;

    if (!__sitemap__.photography){

      galleryNavigation = (
        <p>no gallery info burh</p>
      );

    } else {

      let currentInd =  __sitemap__.photography.findIndex(function(photo){
        return photo.id === __photo.id ?
          true : false;
      });

      let galLng = __sitemap__.photography.length - 1;

      let _prevImg = __sitemap__.photography[currentInd <= 0 ?
        galLng : currentInd - 1 ];

      let _nextImg = __sitemap__.photography[currentInd >= galLng ?
        0 : currentInd + 1 ];
      debugger;
      galleryNavigation = (
        <div className="gallery-nav">
          <div className="prev-image">
            <img src={navImgSrc(_prevImg)} alt={""} />
            <Link to={photoDetailLink(_prevImg)}>Previous</Link>
          </div>
          <div className="next-image">
            <img src={navImgSrc(_nextImg)} alt={""} />
            <Link to={photoDetailLink(_nextImg)}>next</Link>
          </div>
        </div>
      );
    };

    return (
      <div>
        {galleryNavigation}
        <button type="button"><Link to={'/photography'}>close</Link></button>
        <div className="photo-title">{this.state.title}</div>
        <div className="photo-description">{this.state.description}</div>
        <img src={[
            "https://farm",
            __photo.farm,
            ".staticflickr.com/",
            __photo.server,
            "/",
            __photo.id,
            "_",
            __photo.secret,
            "_z.jpg"
          ].join("")} alt={""} />
      </div>
    );
  }
}

export default PhotoDetail;