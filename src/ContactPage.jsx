import React, {
  Component
} from 'react';
import axios from 'axios';

class ContactPage extends Component {

  handleSubmit(_event) {

    _event.nativeEvent.preventDefault()

    let __contactPage = this;

    function $event(){
      __contactPage.setState({
        submited: true
      });
    }

    axios.post('https://maker.ifttt.com/trigger/kylemoseby_form_contact/with/key/paj55zq9xejIeveDVQ0cW', {
      value1 : this.state.fullName,
      value2 : this.state.email,
      value3 : this.state.message
    })
    .then($event)
    .catch($event);
  }

  handleChange(event) {
    let updateObj = {};
    updateObj[event.currentTarget.name] = event.currentTarget.value;
    this.setState(updateObj);
  }

  errorMessage(){
    if (!this.state.error) {
      return null;
    } else {
      return (
        <p>Error: there was an error.  Please try again later.</p>
      );
    }
  }

  clearForm() {
    this.setState({
      fullName: 'NAME',
      email: 'EMAIL',
      message: 'MESSAGE',
      error: null,
      submited: false
    });
  }

  constructor(){
    super();

    this.state = {
      fullName: 'NAME',
      email: 'EMAIL',
      message: 'MESSAGE',
      error: null,
      submited: false
    };

    // BIND METHODS
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  render() {
    return(
      <div className="col">
        <h2>Contact Form</h2>
        <form onSubmit={this.handleSubmit} className={this.state.submited ? "invisible" : "contact-form"}>
          <div className="form-group">
            <label>
              Name
              <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleChange}  />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email address
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  />
            </label>
          </div>
          <div className="form-group">
            <label>
              Message
              <textarea
                onChange={this.handleChange}
                name="message"
                value={this.state.message}
                rows="3"
                type="text"
                wrap="soft"
              /></label>
              <input type="submit" value="Submit" />
          </div>
        </form>
        <p> All fields are required.</p>
        <div className={this.state.submited ? "alert alert-primary" : "invisible"} role="alert">
          <p>Thank you for reaching out.</p>
        </div>
        <div className={!this.state.error ?  "invisible": "invisible"} role="alert">
          <p>Something went wrong.  Please try again later.</p>
          {this.errorMessage()}
        </div>
      </div>
    );
  }
}

export default ContactPage;