import React from 'react';
// import {
  // Link,
  // useParams
// } from "react-router-dom";

class CodePenEmbed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reloaded: false
    }
  }

  componentDidMount(props) {
    // https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds-6
    window.__CPEmbed(".codepen-later");
  }

  componentDidUpdate(prev) {
    if (prev.slugHash !== this.props.slugHash) {
      let reload = !this.state.reloaded;
      this.setState({ reloaded: reload })
      window.__CPEmbed(".codepen-later");
    }
  }

  render() {
    const slugHash = this.props.slugHash;
    // data-border="thick"
    // data-border-color="red"
    return (
      <div>
        <div className="codepen-later"
          data-height="800"
          data-default-tab="js,result"
          data-slug-hash={slugHash}
          data-user="kylemoseby"
          data-theme-id="light"
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CodePenEmbed;