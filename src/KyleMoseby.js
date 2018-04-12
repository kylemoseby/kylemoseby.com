import React, {
  Component
} from 'react';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import * as Icon from 'react-feather';
import __sitemap__ from './sitemap';

import Navigation from './Navigation';
import HomePage from './HomePage';
import ContactPage from './ContactPage';
import CodePage from './CodePage';
import CodeExample from './CodeExample';
import FlickrGallery from './FlickrGallery';
import PhotoDetail from './PhotoDetail';
import SocialMedia from './SocialMedia';

class KyleMoseby extends Component {
  constructor(){
    super()
    this.state = Object.assign({
      menuShow: true,
    }, __sitemap__);
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
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar">
            <div className="col">
              <Icon.Menu onClick={this.toggleMenu} />&nbsp;
              <Link className="navbar-brand" to="/">Kyle Moseby</Link>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col">
            <Navigation {...this.state} />
          </div>
          <div className="col-sm-12 col-md-10">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/code" component={CodePage} />
              <Route path="/code/:platform/:hashid" component={CodeExample}/>
              <Route exact path="/photography/" component={FlickrGallery}/>
              <Route path="/photography/:secret/:farm/:server/:id" component={PhotoDetail} />
            </Switch>
          </div>
        </div>
        <nav className="navbar">
          <SocialMedia accounts={accounts} className="col" />
        </nav>
      </div>
    );
  }
}

export default KyleMoseby;