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

const __kylemoseby__ = {
  codepen: [
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
  gist : [
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
    "_z.jpg";
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
      <div className="col-10">
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

class PhotoDetail extends Component {
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

class CodepenEmbed extends Component {

  updatePen(){
    console.log('update pen');

    let wrapper = document.getElementById("wrapper-" + this.props.hash);
    let _elmP_= document.createElement("div");

    _elmP_.className = "codepen";
    _elmP_.setAttribute('data-height', '800');
    _elmP_.setAttribute('data-theme-id', 'dark');
    _elmP_.setAttribute('data-slug-hash', this.props.hash);
    _elmP_.setAttribute('data-show-tab-bar', 'no');
    _elmP_.setAttribute('data-default-tab', 'js,result');
    _elmP_.setAttribute('data-embed-version', '2');
    wrapper.prepend(_elmP_);

    const headID = document.getElementsByTagName("head")[0];
    const newScript = document.createElement('script');

    newScript.type = 'text/javascript';
    newScript.id = 'codepen_' + this.props.hash;
    newScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';
    headID.appendChild(newScript);
  }

  componentDidUpdate(prevProps){
    let hashRemove = prevProps.hash;
    let penIframe = document.getElementById("cp_embed_" + hashRemove);
    penIframe.parentNode.remove();
    this.updatePen();
  }

  componentDidMount(){
    this.updatePen();
  }

  render(){
    console.log('render');
    return (
      <div className="react-wrapper">
        <div id={"wrapper-" + this.props.hash} />
        <ul>
          <li>hash {this.props.hash}</li>
        </ul>
      </div>
    );
  }
}

class CodeExample extends Component {
  render(){

    const exmplePlat  = this.props.match.params.platform;
    const exmpleId = this.props.match.params.id;

    let exampleEmbed = null;

    if (exmplePlat === 'gist'){
      exampleEmbed = <Gist id={exmpleId} />;
    } else if (exmplePlat === "codepen"){
      exampleEmbed = <CodepenEmbed hash={exmpleId} />;
    }

    let currentInd = Number(this.props.match.params.ind);
    let t2 = __kylemoseby__[exmplePlat].length;
    let isFirst = currentInd === 0;
    let isLast = currentInd === t2;
    let prevUrl = ["/example", (isFirst ? currentInd - 1 : t2), exmplePlat, exmpleId];
    let nextUrl = ["/example", (isLast ? (currentInd + 1) : 0), exmplePlat, exmpleId];

    return (
      <div className="col-10">
        <h2>Code Example</h2>
        {exampleEmbed}
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to={prevUrl.join('/')}>Prev</Link>
          </li>
          <li className="list-inline-item">
            <Link to={nextUrl.join('/')}>Next</Link>
          </li>
        </ul>
      </div>
    );
  }
}

class CodePage extends Component {
  constructor (props) {
    super(props);
    this.state = __kylemoseby__;
  }
  render(){
    const codepens = this.state.codepen;
    const gists = this.state.gist;
    return (
      <div className="col-10">
        <h2>JavaScript, HTML, CSS</h2>
        {codepens.map((pen, index) =>
          <div key={index}>
            <h3>{pen.title}</h3>
            <div>{pen.description}</div>
            <Link to={'/example/' + index + '/codepen/' + pen.slugHash}><span className="icon-codepen" /></Link>
          </div>
        )}
        <h2>Python</h2>
        {gists.map((gist, index) =>
          <div key={index}>
            <h3>{gist.title}</h3>
            <div>{gist.description}</div>
            <Link to={'/example/' + index + '/gist/' + gist.id}><span className="icon-github" /></Link>
          </div>
        )}
      </div>
    );
  }
}

class KyleMoseby extends Component {
  constructor(props){
    super(props);
    this.state = __kylemoseby__;
  }

  render() {
    const accounts = this.state.contact.social;
    return (
      <Router>
        <div className="container-fluid">
          <div className="row KyleMoseby">
            <Navigation  {...this.state} />
            <Route exact path="/" render={props => (
              <div className="col">
                <img src="https://c1.staticflickr.com/7/6070/6078025602_346479fb66_z.jpg" alt="Whatever" />
              </div>
            )}/>
            <Route path="/example/:ind/:platform/:id" component={CodeExample}/>
            <Route exact path="/code" component={CodePage}>
            </Route>
            <Route path="/photo/:secret/:farm/:server/:id" component={PhotoDetail} />
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
    const menuPens = this.state.codepen.map((_pen_, index) =>
      <li key={index}>
        <Link to={{
            pathname: "/example/" + index + "/codepen/" + _pen_.slugHash,
            state: _pen_
          }}>{_pen_.title}</Link>
      </li>
    );
    const menuGists = this.state.gist.map((_gist_, index) =>
      <li key={index}>
         <Link to={{
            pathname: "/example/" + index + "/gist/" + _gist_.id,
            state: _gist_
          }}>{_gist_.title}</Link>
      </li>
    );

    return (
      <div className="col">
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