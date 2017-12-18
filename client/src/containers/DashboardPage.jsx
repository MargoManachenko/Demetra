import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    const userId = localStorage.getItem('userId');

    this.state = {
      secretData: '',
      isNight : false,
      successMessage: '',
      userID: userId,
      buttonText: ''
    };

     this.startNight = this.startNight.bind(this);
     this.changeButtonText = this.changeButtonText.bind(this);
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }    
    });
    xhr.send();

    const formData = `userID=${this.state.userID}`;
    const xhr2 = new XMLHttpRequest();
    xhr2.open('post', '/night/isNight');
    xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', () => {
      if (xhr2.status === 200) {  
        this.setState({
          isNight: xhr2.response.isNight,
        });      

        if(this.state.isNight == false){
          this.setState({
            buttonText: 'Start sleep',
          });    
        }  
        else{
          this.setState({
            buttonText: 'End sleep',
          });
        }    
      }
    });
    xhr2.send(formData);
  }

  checkIsNight(){

    const formData = `userID=${this.state.userID}`;
    xhr.open('post', '/night/isNight');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';

      xhr.addEventListener('load', () => {

        if (xhr.status === 200) {        
          this.setState({
            isNight: xhr.response.isNight
          });       
        }
      });
    xhr.send(formData);
  }

  startNight(event){
    event.preventDefault();
    const formData = `userID=${this.state.userID}`;

    // create an AJAX request  
    var request;  
    if(this.state.isNight === false){
      console.log('request to start');
      request = 'startNight';
    }
    else{
      console.log('request to end');
      request = 'endNight';
    }    

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/night/'+ request);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
          this.setState({
            success: xhr.response.success,
            isNight: xhr.response.isNight,
            successMessage: xhr.response.successMessage
        });
      } else {
        console.log('error from dashboard');
      }
    });
    xhr.send(formData);
  }

  changeButtonText(){
    let currentText = this.state.buttonText;
    if(currentText.localeCompare('End sleep') == 0){
       this.setState({
        buttonText : 'Start sleep'
      });
    }
    if(currentText.localeCompare('Start sleep') == 0){
       this.setState({
        buttonText : 'End sleep'
      });
    }     
  }

  render() {
    return (
      <Dashboard 
        onSubmit={this.startNight}
        secretData={this.state.secretData}
        successMessage={this.state.successMessage}
        isNight={this.state.isNight}
        userID={this.state.userID}        
        onClick={this.changeButtonText}
        buttonText={this.state.buttonText}
      />
    );
  }
} 

export default DashboardPage;
