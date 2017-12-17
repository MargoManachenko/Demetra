import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from 'material-ui/styles';



const Dashboard = ({ 
	secretData,
	onSubmit,
  onClick,
  isNight,
  successMessage,
  buttonText            
	}) => (
  <Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', textColor: 'white'}}>
    <CardTitle
      title="Ready to fall into the world of your dreams?"/>
      <div className="instuctionContainer">
        <p>Quick instruction:</p>
        <ul className="instuctionContainerUl">
          <li>1. Be ready for the sleep</li>
          <li>2. Press the button down below</li>
          <li>3. Turn on the mask </li>
          <li>4. Sleep </li>
        </ul>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form action="/" onSubmit={onSubmit}>
        <div className="button-line">
          
          <RaisedButton  
          backgroundColor="#ffb347"                  
          type="submit" 
          label={buttonText} 
          onClick={onClick}/> 
        
        </div>
      </form>
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired
};

export default Dashboard;


