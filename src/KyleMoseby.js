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

export default KyleMoseby;