import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import __sitemap__ from './sitemap';
import * as Icon from 'react-feather';

const CodePenTiles = () => (
  <div>
    <div>
      {__sitemap__.codepen.map(pen => (
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
    this.state = __sitemap__;
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

export default CodePage;