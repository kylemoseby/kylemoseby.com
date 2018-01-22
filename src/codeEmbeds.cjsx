class GithubGist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.id,
      showGist: false
    };
    this.toggleGist = this.toggleGist.bind(this);
  }

  toggleGist(){
    this.setState(prevState => ({
      showGist: !prevState.showGist
    }));
  }

  render(){
    return(
      <div>
        <button className="btn btn-sm btn-primary" onClick={this.toggleGist}>
          <span className="icon-github" /> {this.state.showGist ? 'Hide' : 'Show'} Gist
        </button>
        <div className={this.state.showGist ? 'visible' : 'd-none'}>
          <Gist id={this.state.id} />
        </div>
      </div>
    );
  }
}

class Codepen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hash: props.hash,
      showPen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      showPen: !prevState.showPen
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} type="button" className="btn btn-sm btn-primary">
          <span className={this.state.showPen ? 'icon-close' : 'icon-codepen'}></span>
          &nbsp;{this.state.showPen ? 'Hide' : 'Show' } Codepen
        </button>
        <CodepenEmbed {...this.state} />
      </div>
    );
  }
}
