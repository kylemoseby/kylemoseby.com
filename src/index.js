import React, {
  Component
} from 'react';
import ExecutionEnvironment from 'exenv';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom';
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
      'hashID': 'JJZbPm',
    },
    {
      'title': 'Seattle Crime Reports Timeline',
      'description': 'A timeline plotted in D3js of crime reports filed by Seattle Police Department.  Data found at data.gov',
      'hashID': '0f10e6b7a6fb348908b7dbc212876d62',
    },
    {
      'title': 'Flickr Recent Photos',
      'description': 'A Flickr API integration written in Angular',
      'hashID': '86cbd886a137fb713c61126a98f05780',
    },
    {
      'title': 'Flickr Album',
      'description': 'A Flickr API integration written in Angular',
      'hashID': '48dc386f62becb37fcbb583066955f0b',
    }
  ],
  gist : [
    {
      'title': 'Twitter Account Tools',
      'description': 'Python scripts to automate certain account management tasks.',
      'hashID': '3930a36183bca9acb3c02875be428d07',
    },{
      'title': 'Tumblr Account Tools',
      'description': 'Python scripts to automate certain account management tasks.',
      'hashID': '098a0271331019239b81afce6276f20d',
    },
  ],
  photography: null,
  contact: {
    social: [
      {
        platform: 'instagram',
        url: 'http://instagram.com/kylemoseby'
      },
      {
        platform: 'flickr',
        url: 'http://flickr.com/photos/kylemoseby'
      },
      {
        platform: 'github',
        url: 'http://github.com/kylemoseby'
      },
      {
        platform: 'codepen',
        url: 'https://codepen.io/kylemoseby/'
      }
    ]
  }
};

function getGalleryData() {

  const galleryIDs = [
    '72157671573143060',
    '72157642607219393',
    '72157642608822784',
    '72157641683609583',
  ];

  const queue = galleryIDs.map(function(__galId){
    // Get image gallery data from flickr
    return axios
      .get("https://api.flickr.com/services/rest/", {
        params: {
          nojsoncallback: 1,
          method: "flickr.photosets.getPhotos",
          api_key: "cf8f1cf4fdd37bce0498531da5f31ed1",
          photoset_id: __galId,
          extras: "description",
          format: "json"
        }
      })
      .catch(function(error) {
        console.log(error);
      }
    )
  });

  return axios.all(queue)
    .then(function(__queue){

      let gallery = [];

      __queue.forEach(function(response) {
        gallery = gallery.concat(response.data.photoset.photo);
      });

      __kylemoseby__.photography = gallery;
    }
  );
}

class FlickrGallery extends React.Component {
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

  addImages() {
    if (this.state.gallery !== null && this.state.photoShow <= this.state.gallery.length) {

      let currentEnd = this.state.photoShow + 10;

      this.setState({
        photoShow: currentEnd
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
    /*
      INIT
    */
    this.addImages();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  indexMove($eve){
    let elmId = $eve.currentTarget.getAttribute("id");
    let __index = this.state.ind;
    let __photoLngth = this.state.photos.length - 1;
    let indUpdate = null;

    if (!this.state.ind) {
      indUpdate = 0;

    } else if (elmId === 'indexFrwd'){
      indUpdate = __index === __photoLngth ? 0 : __index + 1;

    } else if (elmId === 'indexBack'){
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

  constructor(props) {
    super(props);

    let optIndex = props.match.params.index === undefined ?
      null : Number(props.match.params.index);

    this.state = {
      gallery: __kylemoseby__.photography,
      ind: optIndex,
      photoShow: 10
    };
    if (!this.state.gallery) {

      let flickrData =  getGalleryData();
      let __gallery = this;

      flickrData.then(function(data){
        __gallery.setState({
          gallery: __kylemoseby__.photography
        });
      });
    }

    // Bind methods to gallery Class
    this.handleScroll = this.handleScroll.bind(this);
    this.addImages = this.addImages.bind(this);
    this.toggleThumbs = this.toggleThumbs.bind(this);
    this.indexMove = this.indexMove.bind(this);
    this.clearDetail = this.clearDetail.bind(this);
  }

  render() {

    if (this.state.gallery !== null) {

      const masonryOptions = {
        transitionDuration: 0
      };

      let photos = this.state.gallery.slice(0, this.state.photoShow);
      let __gallery = this;

      const photoList = photos.map((photo, index) => {

        function toggleThumbs(event) {
          __gallery.setState({
            ind: index
          });
        }

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

      let showButton = !this.state.ind ? 'invisible' : 'btn btn-primary';

      return (
        <div className="col">
          <button type="button" className={showButton} id="indexBack" onClick={this.indexMove}>back</button>
          <button type="button" className={showButton} id="indexFrwd" onClick={this.indexMove}>forward</button>
          <button type="button" className={showButton} onClick={this.clearDetail}>close</button>
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
          gallery: __kylemoseby__.photography
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

    if (!__kylemoseby__.photography){

      galleryNavigation = (
        <p>no gallery info burh</p>
      );

    } else {

      let currentInd =  __kylemoseby__.photography.findIndex(function(photo){
        return photo.id === __photo.id ?
          true : false;
      });

      let galLng = __kylemoseby__.photography.length - 1;

      let _prevImg = __kylemoseby__.photography[currentInd <= 0 ?
        galLng : currentInd - 1 ];

      let _nextImg = __kylemoseby__.photography[currentInd >= galLng ?
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

const codeReadMe = {
  _JJZbPm : function(){
    return (
      <p>_JJZbPm</p>
    );
  },
  _0f10e6b7a6fb348908b7dbc212876d62 : function(){
    return (
      <p>_0f10e6b7a6fb348908b7dbc212876d62</p>
    );
  },
  _86cbd886a137fb713c61126a98f05780 : function(){
    return (
      <p>_86cbd886a137fb713c61126a98f05780</p>
    );
  },
  _48dc386f62becb37fcbb583066955f0b : function(){
    return (
      <p>_48dc386f62becb37fcbb583066955f0b</p>
    );
  },
  _3930a36183bca9acb3c02875be428d07 : function(){
    return (
      <p>_86cbd886a137fb713c61126a98f05780</p>
    );
  },
  _098a0271331019239b81afce6276f20d : function(){
    return (
      <p>_48dc386f62becb37fcbb583066955f0b</p>
    );
  },
};

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
    const exmpleId = this.props.match.params.hashid;

    let exampleEmbed = null;

    // Is this example a Codepen or a Gist?
    if (exmplePlat === 'gist'){
      exampleEmbed = <Gist id={exmpleId} />;

    } else if (exmplePlat === "codepen"){
      exampleEmbed = <CodepenEmbed hash={exmpleId} />;
    }

    // Check for README file
    let __readMe = codeReadMe['_' + exmpleId]();

    return (
      <div className="col">
        <h2>Code Example</h2>
        {exampleEmbed}
        {__readMe}
      </div>
    );
  }
}

const CodePenTiles = () => (
  <div>
    <div>
      {__kylemoseby__.codepen.map(pen => (
        <div key={pen.hashID}>
          <h3>{pen.title}</h3>
          <div>{pen.description}</div>
          <Link to={'/code/codepen/' + pen.hashID}><Icon.Codepen/></Link>
        </div>
      ))}
    </div>
  </div>
);

class CodePage extends Component {
  constructor (props) {
    super(props);
    this.state = __kylemoseby__;
  }
  render(){
    const gists = this.state.gist;
    return (
      <div className="col">
        <h2>JavaScript, HTML, CSS</h2>
        <CodePenTiles />
        <h2>Python</h2>
        {gists.map((gist, index) =>
          <div key={index}>
            <h3>{gist.title}</h3>
            <div>{gist.description}</div>
            <Link to={'/code/gist/' + gist.hashID}><Icon.Github/></Link>
          </div>
        )}
      </div>
    );
  }
}

class ContactPage extends Component {

  submitForm(_event) {

    _event.nativeEvent.preventDefault()

    let __contactPage = this;

    axios.post('https://maker.ifttt.com/trigger/kylemoseby_form_contact/with/key/paj55zq9xejIeveDVQ0cW', {
      value1 : this.state.name,
      value2 : this.state.email,
      value3 : this.state.message
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (__error) {
      console.log(__error);
      __contactPage.state.error = {
        name: __error.name,
        message: __error.message
      }
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  constructor(){
    super();
    // BIND METHODS
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: 'NAME',
      email: 'EMAIL',
      message: 'MESSAGE',
      error: null
    };
  }

  render() {

    function errorMessage(){
      if (this.state.error !== null) {
        return (
          <p>Error: {this.state.error.name} - {this.state.error.message}</p>
        )
      } else {
        return null;
      };
    }

    return(
      <div className="col">
        <h2>Contact Form</h2>
        <p> All fields are required.</p>
        <div className={!this.state.error ?  'invisible': 'alert alert-error'} role="alert">
          <p>Something went wrong.  Please try again later.</p>
          {/*<div>{errorMessage(this.state.error)}</div>*/}
        </div>
        <form name="contactForm"
          className="contact-form"
          action=""
          method="POST"
        >
          <div className="form-group">
            <label>
              Name
              <input value={this.state.name}
                name="name"
                onChange={this.handleChange}
                className="form-control"
              /></label>
          </div>
          <div className="form-group">
            <label>
              Email address
              <input value={this.state.email}
                name="email"
                onChange={this.handleChange}
                className="form-control"
                maxLength="80"
                size="20"
              /></label>
          </div>
          <div className="form-group">
            <label>
              Message
              <textarea value={this.state.message}
                name="message"
                onChange={this.handleChange}
                className="form-control"
                rows="3"
                type="text"
                wrap="soft"
              /></label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
{/*
  Old SFDC for contact form
  <input type="hidden" name="oid" value="00D50000000Ia2S" />
  <input type="hidden" name="retURL" value="http://kylemoseby.com/#/contact_success" />
  FORM TEXTAREA name="00N50000002CHu6"
  FORM ACTION https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8
*/}

class HomePage extends Component {
  render() {
    return(
      <div className="col">
        <img src="kylemoseby_resume.jpg" className="img-fluid" alt=""/>
      </div>
    );
  }
}

class Navigation extends React.Component {
  render(){

    const menuPens = this.props.codepen.map((_pen_, index) =>
      <li key={index}>
        <Link to={{
            pathname: "/code/codepen/" + _pen_.hashID,
            state: _pen_
          }}>{_pen_.title}</Link>
      </li>
    );

    const menuGists = this.props.gist.map((_gist_, index) =>
      <li key={index}>
         <Link to={{
            pathname: "/code/gist/" + _gist_.hashID,
            state: _gist_
          }}>{_gist_.title}</Link>
      </li>
    );

    return (
      <div className={this.props.menuShow ? "col-md-3 col-lg-2" : "km-nav invisible"}>
        <ul className="list-unstyled">
          <li><Link to="/contact"><Icon.Send /> Contact</Link></li>
          <li><Link to="/photography"><Icon.Aperture /> Photography</Link></li>
          <li><Link to="/code"><Icon.Code /> Code</Link></li>
          <li>
            <ul>{menuPens}</ul>
          </li>
          <li>
            <ul>{menuGists}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

class SocialMedia extends Component {
  render() {
    const tester = this.props.accounts;
    const icon = function(__platform){
      switch(__platform){
        case 'codepen' : return (
            <Icon.Codepen />
          );
          break;
        case 'github' : return (
            <Icon.Github />
          );
          break;
        case 'instagram' : return (
            <Icon.Instagram />
          );
          break;
        default: return null;
      };
    };

    const accounts = tester.map((account, index) =>
      <li className="list-inline-item" key={index}>
        <Link to={account.url} target="blank">
          {icon(account.platform)}
        </Link>
      </li>
    );
    return (
      <ul className="list-inline">{accounts}</ul>
    );
  }
}

class KyleMoseby extends Component {
  constructor(){
    super()
    this.state = Object.assign({
      menuShow: true,
    }, __kylemoseby__);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    const newState = !this.state.menuShow
    this.setState({
      menuShow: newState
    });
  }

  render() {
    const accounts = this.state.contact.social;
    return (
      <div>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">Kyle Moseby</Link>
          <Icon.Menu onClick={this.toggleMenu} />
        </nav>
        <div className="container-fluid">
          <div className="row">
            <Navigation {...this.state} />
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/code" component={CodePage} />
              <Route path="/code/:platform/:hashid" component={CodeExample}/>
              <Route exact path="/photography/" component={FlickrGallery}/>
              <Route path="/photography/:secret/:farm/:server/:id" component={PhotoDetail} />
            </Switch>
          </div>
          <nav className="navbar">
            <SocialMedia accounts={accounts} className="col" />
          </nav>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <BrowserRouter>
    <KyleMoseby />
  </BrowserRouter>,
  document.getElementById('root')
);