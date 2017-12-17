import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  floatingLabelStyle: {
    color: 'white'
  }
};

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
    <form className="form" action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          floatingLabelStyle={styles.floatingLabelStyle}
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
          autoComplete='off'
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          floatingLabelStyle={styles.floatingLabelStyle}
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          autoComplete='off'
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          floatingLabelStyle={styles.floatingLabelStyle}
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
          autoComplete='off'
        />
      </div>

      <div className="button-line">
        <RaisedButton backgroundColor="#ffb347" type="submit" label="Create New Account" />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

