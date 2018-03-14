import React, {
  Component
} from 'react';

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

export default CodepenEmbed;