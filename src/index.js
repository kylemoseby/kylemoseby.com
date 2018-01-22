
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';
import Gist from 'react-gist';
import Masonry from 'react-masonry-component';
import * as Icon from 'react-feather';
import './KyleMoseby.css';


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
    "_b.jpg";
  return (
    <img src={imgSrc} alt={img.id} />
  );
}

class FlickrGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };

    const galleryIDs = [
      '72157671573143060',
      '72157642607219393',
      '72157642608822784',
      '72157641683609583',
    ];

    let addImages = function(newPhotos) {
      const updated = this.state.photos.slice().concat(newPhotos);
      this.setState({
        photos: updated
      });
    }
    addImages = addImages.bind(this);

    galleryIDs.forEach(function(_id_){
      axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photosets.getPhotos",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photoset_id: _id_,
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
        <Link key={index} to={{
          pathname: ["/photo",
            photo.secret,
            photo.farm,
            photo.server,
            photo.id
          ].join("/")
        }}>
          <Flickrimg photo={photo} />
        </Link>
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
  }
}

function CodepenEmbed(props) {
  const headID = document.getElementsByTagName("head")[0];
  const newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.id = 'codepen_' + props.hash;
  newScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';
  headID.appendChild(newScript);

  return (
    <div>
      <p
        data-height="800"
        data-theme-id="light"
        data-slug-hash={props.hash}
        data-show-tab-bar="no"
        data-default-tab="js,result"
        data-embed-version="2"
        className="codepen"
      >
      </p>
    </div>
  );
}

function CodeExmplTemplates(props){
  if (props.platform === 'gist'){
    return (
      <Gist id={props.id} />
    );
  } else if (props.platform === "codepen"){
    return(
      <CodepenEmbed hash={props.id} />
    );
  }
}

class CodeExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      platform: props.match.params.platform,
    };
  }

  render(){
    return (
      <div className="col">
        <h2>Code Example</h2>
        <CodeExmplTemplates {...this.state} />
      </div>
    );
  }
}

class PhotoTest extends Component {
  constructor(props){
    super(props);
    this.state = props.match.params;
  }

  render() {
    return (
      <div>
        <Flickrimg photo={this.state}/>
      </div>
    );
  }
}

class KyleMoseby extends Component {

  constructor(props){
    super(props);
    this.state = {
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

  render() {
    const accounts = this.state.contact.social;
    const codepens = this.state.code;
    const gists = this.state.gists;
    return (
      <Router>
        <div className="container-fluid">
          <div className="row KyleMoseby">
            <Navigation className="col" {...this.state} />
            <Route exact path="/" render={props => (
              <div className="col">
                <img src="https://c1.staticflickr.com/7/6070/6078025602_346479fb66_z.jpg" alt="Whatever" />
              </div>
            )}/>
            <Route exact path="/code/:platform/:id" component={CodeExample}/>
            <Route path="/code" render={props => (
              <div>
                <h2>JavaScript, HTML, CSS</h2>
                {codepens.map((pen, index) =>
                  <div key={index}>
                    <h3>{pen.title}</h3>
                    <div>{pen.description}</div>
                    <Link to={'/code/codepen/' + pen.slugHash}><span className="icon-codepen" /></Link>
                  </div>
                )}
                <h2>Python</h2>
                {gists.map((gist, index) =>
                  <div key={index}>
                    <h3>{gist.title}</h3>
                    <div>{gist.description}</div>
                    <Link to={'/code/gist/' + gist.id}><span className="icon-github" /></Link>
                  </div>
                )}
              </div>
            )}/>
            <Route path="/photo/:secret/:farm/:server/:id" component={PhotoTest} />
            <Route path="/gallery" component={FlickrGallery}/>
          </div>
          <nav className="navbar fixed-bottom navbar-light">
            <SocialMedia accounts={accounts} className="col" />
          </nav>
        </div>
      </Router>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      menuShow: true,
    }, props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    const newState = !this.state.menuShow
    this.setState({
      menuShow: newState
    });
  }

  render(){
    const menuPens = this.state.code.map((_pen_, index) =>
      <li key={index}>
        <Link to={"/code/codepen/" + _pen_.slugHash}>{_pen_.title}</Link>
      </li>
    );
    const menuGists = this.state.gists.map((_gist_, index) =>
      <li key={index}>
         <Link to={"/code/gist/" + _gist_.id}>{_gist_.title}</Link>
      </li>
    );

    return (
      <div>
        <h1><Link to="/">Kyle Moseby</Link></h1>
        <Icon.Menu onClick={this.toggleMenu} />
        <ul className={this.state.menuShow ? "list-unstyled" : "invisible"}>
          <li><Link to="/gallery"><Icon.Aperture /> Photography</Link></li>
          <li><Link to="/code"><Icon.Code /> Code</Link></li>
          <li>
            <ul className="list-unstyled">{menuPens}</ul>
          </li>
          <li>
            <ul className="list-unstyled">{menuGists}</ul>
          </li>
        </ul>
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
v}

ReactDOM.render(
  <KyleMoseby />,
  document.getElementById('root')
);