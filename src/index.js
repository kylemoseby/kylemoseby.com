import React, {
  Component
} from 'react';
import ExecutionEnvironment from 'exenv';
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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

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

class FlickrGallery extends React.Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      ind: null,
      thumbs: true
    };

    this.galleryIDs = [
      '72157671573143060',
      '72157642607219393',
      '72157642608822784',
      '72157641683609583',
    ];

    this.handleScroll = this.handleScroll.bind(this);
    this.addImages = this.addImages.bind(this);
    this.toggleThumbs = this.toggleThumbs.bind(this);
    this.indexMove = this.indexMove.bind(this);
    this.clearDetail = this.clearDetail.bind(this);

    this.addImages();
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

  handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
      debounce(this.addImages(), 750);
    }
  }

  addImages(newPhotos) {

    if(this.galleryIDs.length > 0){

      let galId = this.galleryIDs.pop();
      let _this_ = this;

      axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photosets.getPhotos",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photoset_id: galId,
          extras: "description",
          format: "json"
        }
      })
      .then(function(response) {
        const updated = _this_.state.photos.slice().concat(response.data.photoset.photo);
        _this_.setState({
          photos: updated
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  toggleThumbs() {
    this.setState({
      thumbs: !this.state.thumbs
    });
  }

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  indexMove($eve){
    let elmId = $eve.currentTarget.getAttribute("id");
    let __index = this.state.ind;
    let __photoLngth = this.state.photos.length - 1;
    let indUpdate = null;

    if (this.state.ind === null) {

      indUpdate = 0;

    } else if (elmId === 'indexFrwd'){
      debugger;
      indUpdate = __index === __photoLngth ? 0 : __index + 1;

    } else if (elmId === 'indexBack'){
      debugger;
      indUpdate = __index === 0 ? __photoLngth : __index - 1;
    }

    this.setState({
      ind: indUpdate
    });
  }

  clearDetail() {
    this.setState({
      ind: null
    });
  }


  render() {

    let __gallery = this;

    const photos = this.state.photos;
    const masonryOptions = {
      transitionDuration: 0
    };

    const photoList = photos.map((photo, index) => {

      function toggleThumbs(event) {
        __gallery.setState({
          ind: index
        });
      }

      let imgSize = null;

      if (index === this.state.ind){
        imgSize = "k";
      }
      else if (this.state.thumbs){
        imgSize = "n";
      }
      else {
        imgSize = "c"
      }

      return (
        <div key={index}>
          <a href={["photo", photo.secret, photo.farm, photo.server, photo.id].join('/')}>permalink</a>
          <img onClick={toggleThumbs}
            src={[
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
        <button type="button" className="btn btn-primary" id="indexBack" onClick={this.indexMove}>back</button>
        <div>{this.state.ind}</div>
        <button type="button" className="btn btn-primary" id="indexFrwd" onClick={this.indexMove}>forward</button>
        <button type="button" className="btn btn-primary" onClick={this.clearDetail}>close</button>
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

    let photoId = this.props.match.params.id;
    let __this = this;

    this.state = {
      title: null,
      description: null,
    };

    axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photos.getInfo",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photo_id: photoId,
          extras: "description",
          format: "json"
        }
      })
      .then(function(response) {
        let photoInfo = response.data.photo;
        console.log(photoInfo);
        debugger;
        __this.setState({
          title: photoInfo.title._content,
          description: photoInfo.description._content
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let __photo = this.props.match.params;
    console.log(this.state);
    debugger;
    return (
      <div>
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
            ".jpg"
          ].join("")} alt={""} />
      </div>
    );
  }
}

class CodepenEmbed extends Component {

  updatePen(){
    let _elmP_= document.createElement("div");
    _elmP_.className = "codepen";
    _elmP_.setAttribute('data-height', '800');
    _elmP_.setAttribute('data-theme-id', 'light');
    _elmP_.setAttribute('data-slug-hash', this.props.hash);
    _elmP_.setAttribute('data-show-tab-bar', 'no');
    _elmP_.setAttribute('data-default-tab', 'js,result');
    _elmP_.setAttribute('data-embed-version', '2');

    let wrapper = document.getElementById("wrapper-" + this.props.hash);
    wrapper.prepend(_elmP_);

    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.id = 'codepen_' + this.props.hash;
    newScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';

    const headID = document.getElementsByTagName("head")[0];
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
    return (
      <div className="react-wrapper">
        <div id={"wrapper-" + this.props.hash} />
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
        <ul className="list-inline d-none">
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
                <img src="kylemoseby_resume.jpg" alt=""/>
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
      <div className="col-3">
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