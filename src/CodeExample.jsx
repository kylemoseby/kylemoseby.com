import React, {
  Component
} from 'react';

import Gist from 'react-gist';
import CodepenEmbed from './CodepenEmbed';

const codeReadMe = {
  _JJZbPm : function(){
    return (
      <p>Add a description</p>
    );
  },
  _0f10e6b7a6fb348908b7dbc212876d62 : function(){
    return (
      <p>Add a description</p>
    );
  },
  _86cbd886a137fb713c61126a98f05780 : function(){
    return (
      <p>Add a description</p>
    );
  },
  _48dc386f62becb37fcbb583066955f0b : function(){
    return (
      <p>Add a description</p>
    );
  },
  _3930a36183bca9acb3c02875be428d07 : function(){
    return (
      <p>Add a description</p>
    );
  },
  _098a0271331019239b81afce6276f20d : function(){
    return (
      <p>Add a description</p>
    );
  },
};

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
      <div className="row">
        <div className="col-3">
          <h2>Code Example</h2>
          {__readMe}
        </div>
        <div className="col-9">
          {exampleEmbed}
        </div>
      </div>
    );
  }
}

export default CodeExample;