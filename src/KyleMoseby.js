import React, { Component } from 'react';
import axios from 'axios';
import Gist from 'react-gist';
import * as Icon from 'react-feather';
import Masonry from 'react-masonry-component';
import './KyleMoseby.css';


import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class KyleMoseby extends Component {

  constructor(props){
    super(props);

    this.state = {

      photography: {
        flickrPortfolio: [
          '72157671573143060',
          '72157642607219393',
          '72157642608822784',
          '72157641683609583',
        ]
      },

      code: [
        {
          'title': 'Seattle Crime Report Map',
          'description': 'Crime reports filed by the Seattle Police Department plotted to Google Maps.  Data found at data.gov',
          'slugHash': 'JJZbPm',
        },
        {
          'title': 'Seattle Crime Reports Timeline',
          'description': 'A timeline plotted in D3js of crime reports filed by Seattle Police Department.  Data found at data.gov',
          'slugHash': '0f10e6b7a6fb348908b7dbc212876d62',
        },
        {
          'title': 'Flickr Recent Photos',
          'description': 'A Flickr API integration written in Angular',
          'slugHash': '86cbd886a137fb713c61126a98f05780'
        },
        {
          'title': 'Flickr Album',
          'description': 'A Flickr API integration written in Angular',
          'slugHash': '48dc386f62becb37fcbb583066955f0b'
        }
      ],

      gists : [
        {
          'title': 'Twitter Account Tools',
          'description': 'Python scripts to automate certain account management tasks.',
          'id': '3930a36183bca9acb3c02875be428d07'
        },{
          'title': 'Tumblr Account Tools',
          'description': 'Python scripts to automate certain account management tasks.',
          'id': '098a0271331019239b81afce6276f20d'
        },
      ],

      contact: {
        social: [
          {
            platform: 'instagram',
            url: 'http://instagram.com/kylemoseby',
            icoMoon: 'icon-instagram',
          },
          {
            platform: 'flickr',
            url: 'http://flickr.com/photos/kylemoseby',
            icoMoon: 'icon-flickr2'
          },
          {
            platform: 'github',
            url: 'http://github.com/kylemoseby',
            icoMoon: 'icon-github'
          },
          {
            platform: 'codepen',
            url: 'https://codepen.io/kylemoseby/',
            icoMoon: 'icon-codepen'
          }
        ]
      }
    };
  }

  componentDidCatch(error, info) {

    this.setState({ hasError: true });

    console.log('there was an error!');
    console.log(error);
    console.log(info);
  }

  render() {
    return (
      <Router>
      <div className="container-fluid">
          <div className="row KyleMoseby">
            <div className="col">
              <h1>Kyle Moseby</h1>
            </div>
          </div>
          <div className="row KyleMoseby">
            <SideMenu className="col" {...this.state}></SideMenu>
            <Route exact path="/" component={KyleMoseby}/>
            <Route path="/code" component={Code}/>
            <Route path="/photography" component={Photography}/>
          </div>
          <div className="row footer">
            <SocialMedia accounts={this.state.contact.social} className="col" />
          </div>
        </div>
      </Router>

    );
  }
}

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = props;
  }

  render(){
    const menuPens = this.state.code.map((_pen_, index) =>
      <li key={index}>{_pen_.title}</li>
    );

    const menuGists = this.state.gists.map((_gist_, index) =>
      <li key={index}>{_gist_.title}</li>
    );

    return (
      <div>
        <ul>
          <li><Icon.Menu /></li>
          <li><Icon.Aperture /> Photography</li>
          <li><Icon.Code /> Code</li>
        </ul>
        <ul>{menuPens}</ul>
        <ul>{menuGists}</ul>
      </div>
    );
  }
}

class GithubGist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.id,
      showGist: false
    };
    this.toggleGist = this.toggleGist.bind(this);
  }

  toggleGist(){
    this.setState(prevState => ({
      showGist: !prevState.showGist
    }));
  }

  render(){
    return(
      <div>
        <button className="btn btn-sm btn-primary" onClick={this.toggleGist}>
          <span className="icon-github" /> {this.state.showGist ? 'Hide' : 'Show'} Gist
        </button>
        <div className={this.state.showGist ? 'visible' : 'd-none'}>
          <Gist id={this.state.id} />
        </div>
      </div>
    );
  }
}

class SocialMedia extends Component {
  render() {

    const tester = this.props.accounts;

    const accounts = tester.map((account, index) =>
      <li className="list-inline-item" key={index}>
        <a href={account.url} target="blank">
          <span className={account.icoMoon} />
        </a>
      </li>
    );

    return (
      <ul className="list-inline">{accounts}</ul>
    );
  }
}

function Codepenloader(props) {

  if (!props.showPen) {

    return(false)

  } else {
    const headID = document.getElementsByTagName("head")[0];
    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.id = 'codepen_' + props.slugHash;
    newScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';

    headID.appendChild(newScript);

    return (
      <div>
        <p
          data-height="800"
          data-theme-id="dark"
          data-slug-hash={props.slugHash}
          data-show-tab-bar="no"
          data-default-tab="js,result"
          data-embed-version="2"
          className="codepen"
        >
        </p>
      </div>
    );
  }
}

class Codepen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slugHash: props.hash,
      showPen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      showPen: !prevState.showPen
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} type="button" className="btn btn-sm btn-primary">
          <span className={this.state.showPen ? 'icon-close' : 'icon-codepen'}></span>
          &nbsp;{this.state.showPen ? 'Hide' : 'Show' } Codepen
        </button>
        <Codepenloader {...this.state} />
      </div>
    );
  }
}

function Flickrimg(props) {
  const img = props.photo;
  const imgSrc =
    "https://farm" +
    img.farm +
    ".staticflickr.com/" +
    img.server +
    "/" +
    img.id +
    "_" +
    img.secret +
    "_n.jpg";
  return (
    <div className={"flickr-img-thumb"}>
      <img src={imgSrc} alt={img.id} />
    </div>
  );
}

class FrontImages extends React.Component {

  constructor() {
    super();
    this.state = {
      photos: []
    };

    function addImages(photos) {
      this.setState({
        photos: photos
      });
    }
    addImages = addImages.bind(this);

    axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photosets.getPhotos",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photoset_id: "72157642607219393",
          extras: "description",
          format: "json"
        }
      })
      .then(function(response) {
        addImages(response.data.photoset.photo);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  calcWindowSize(){
    const _wdth = window.innerWidth;
    const _hght = window.innerHeight;
    return {
      wdth : _wdth,
      hght : _hght,
      ratio : _wdth / _hght
    };
  }

  render() {
    const photos = this.state.photos;
    const masonryOptions = {
      transitionDuration: 0
    };
    const photoList = photos.map((photo, index) => {
      return (
        <Flickrimg photo={photo} key={index} />
      );
    });

    return (
      <Masonry
        className={'flickr-img'}
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}>
        {photoList}
      </Masonry>
    );
  }
}

export default KyleMoseby;
