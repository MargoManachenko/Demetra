import React, { PropTypes } from 'react';
import Trend from 'react-trend';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import Night from '../components/Night.jsx';

class NightPage extends React.Component {

  constructor(props, context) {
    super(props);

    // set the initial component state
    this.state = {
      userID: '5a2405c50ae9f865ec989471',
      errors: {},
      nightsList: [],
      nightsListExist: false
    };
  }

  componentDidMount() {  

      const userID = '5a2405c50ae9f865ec989471'; 
      const formData = `userID=${userID}`;
      
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/night/getAllNights');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {   
               
          this.setState({
            errors:{},
            nightsList: xhr.response.nightsList,
            nightsListExist: xhr.response.nightsListExist
          });
          //console.log(this.state.nightsList);

        } 
        if (xhr.status === 400) {          
          this.setState({
            errors:{},
            nightsListExist: xhr.response.nightsListExist
          });
        } 
        // else {
        //    console.log('error.  log from nightsPage');        
        // }
      });
      xhr.send(formData);
    }

  isEmpty(){
    var empty = false;
    if(this.state.nightsList.length == 0){
      empty = true;    
    }
    return empty;
  }

  render() {
    var listToRender = [];  
    var empty = true;

    if(this.state.nightsListExist){
      empty = false;
      for(var i = 0; i < this.state.nightsList.length; i++){
        listToRender.push(
          <Night 
          key={i}
          night={this.state.nightsList[i]}
          phases={this.state.nightsList[i].phases}  
          nightIs={this.state.nightsListExist}         
          />);
      }        
       
      return (
        <div className="containerForNight">
          {listToRender}
        </div>
      );
    }

    else{
      return (
        <div>
          <Card className="container">
          <CardTitle
            title="Sorry, no sleeps in your account"
            subtitle="Try to follow the instruction and start the sleep on your Dashboar"/>
            <CardActions>
              <RaisedButton backgroundColor="#ffb347" label="Instruction" />
              <RaisedButton backgroundColor="#ffb347" label="Dashboard" />
            </CardActions>
          </Card>
        </div>
      );
    }          
  }
}
 export default NightPage;
