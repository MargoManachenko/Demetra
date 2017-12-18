import React, { PropTypes } from 'react';
import SettingsForm from '../components/SettingsForm.jsx';


class SettingsPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const userId = localStorage.getItem('userId');
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      userID: userId,
      errors: {},
      successMessage,
      lightMode: '',
      lightTime: ''
    };

    this.processForm = this.processForm.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
  }

  componentDidMount() {

    const formData = `userID=${this.state.userID}`;
    
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/settings/settings/my');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
  
        this.setState({
          errors:{},
          lightTime: xhr.response.lightTime,
          lightMode: xhr.response.lightMode
        });
      } else {

         console.log('error. console log from settingsPage');
        
      }
    });
    xhr.send(formData);
  }

  changeSettings(event){
    if(event.target.name == 'lightMode') {
      this.setState({
        lightMode : event.target.value
      });      

    }
    this.setState({
        lightTime : event.target.value
      });
  }
    
  processForm(event) {
    
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const lightMode = encodeURIComponent(this.state.lightMode);
    const lightTime = encodeURIComponent(this.state.lightTime);
    const userID = this.state.userID; 

    const formData = `lightMode=${lightMode}&lightTime=${lightTime}&userID=${userID}`;
    console.log(formData);
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/settings/settings');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
          successMessage: 'You have successfully changed your settings!'
        });
        // change the current URL to /
        // this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

render() {
    return (
      <SettingsForm
        onSubmit={this.processForm}
        errors={this.state.errors}
        onChange={this.changeSettings}
        successMessage={this.state.successMessage}
        userID={this.state.userID}
        lightTime={this.state.lightTime}
        lightMode={this.state.lightMode}
      />
    );
  }
}

  SettingsPage.contextTypes = {
    router: PropTypes.object.isRequired
  };

 export default SettingsPage;
