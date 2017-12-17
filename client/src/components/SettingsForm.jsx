import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import TextField from 'material-ui/TextField';

const styles = {
  block: {
    maxWidth: 150,
  },
  radioButton: {
    marginBottom: 16,
  },
};


const SettingsForm = ({
  onSubmit,
  onChange,
  lightMode,  
  lightTime,
  successMessage
}) => (
  <Card className="containerForSettings" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
    <form className="settForm" action="/" onSubmit={onSubmit}>
    <div className="card-heading">
      <p >Light settings</p>
    </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="settingsContainer"> 
        <p>Mode</p>
        <RadioButtonGroup name="lightMode" style={styles.block} label="Light mode"onChange={onChange} valueSelected={lightMode}>   
          <RadioButton
            value="light"
            label="Light"
            style={styles.radioButton}
          />
          <RadioButton
            value="medium"
            label="Medium"
            style={styles.radioButton}
          />
          <RadioButton
            value="strong"
            label="Strong"
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        <p>Time</p>
        <RadioButtonGroup name="lightTime"  style={styles.block} label="Light time" onChange={onChange} valueSelected={lightTime}>
          <RadioButton
            value="5"
            label="5 sec"
            style={styles.radioButton}
          />
          <RadioButton
            value="10"
            label="10 sec"
            style={styles.radioButton}
          />
          <RadioButton
            value="15"
            label="15 sec"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
   
       </div>
      <div className="button-line">
        <RaisedButton backgroundColor="#ffb347" type="submit" label="Save" />
      </div>
    </form>
  </Card>
);

SettingsForm.propTypes = {
  successMessage: PropTypes.string.isRequired
};

export default SettingsForm;