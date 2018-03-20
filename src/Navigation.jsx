import React from 'react';
import {
  Link
} from 'react-router-dom';

import * as Icon from 'react-feather';

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
      <div className={this.props.menuShow ? "col-md-3 col-lg-2 km-nav" : "invisible"}>
        <ul className="list-unstyled">
          <li><Link to="/photography"><Icon.Aperture /> Photography</Link></li>
          <li><Link to="/code"><Icon.Code /> Code</Link></li>
          <li>
            <ul className="">{menuPens}</ul>
          </li>
          <li>
            <ul className="">{menuGists}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;