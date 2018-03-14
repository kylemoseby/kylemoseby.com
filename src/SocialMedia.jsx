import React, {
  Component
} from 'react';
import * as Icon from 'react-feather';
import {
  Link
} from 'react-router-dom';

class SocialMedia extends Component {
  render() {
    const tester = this.props.accounts;
    const icon = function(__platform){
      switch(__platform){
        case 'codepen' : return (
            <Icon.Codepen />
          );
        case 'github' : return (
            <Icon.Github />
          );
        case 'instagram' : return (
            <Icon.Instagram />
          );
        default: return null;
      }
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

export default SocialMedia;