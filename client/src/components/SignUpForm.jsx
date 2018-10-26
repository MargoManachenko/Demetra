import React , { PropTypes }from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const styles = {
    floatingLabelStyle: {
        color: 'white'
    }
};

const SignUpForm = ({
    errors,
    onChange,
    onSubmit,
    user
}) => (
    <Card className="containerSignUp" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
    <form className="form" action="/" onSubmit={onSubmit}>

        <h2 className="card-heading">Sign up</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <TextField
            floatingLabelText="Name"
            name="name"
            errorText={errors.name}
            onChange={onChange}
            value={user.name}
            autoComplete='off'
            floatingLabelStyle={styles.floatingLabelStyle}
            inputStyle={styles.floatingLabelStyle}
        />

        <TextField
            floatingLabelText="Email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
            autoComplete='off'
            floatingLabelStyle={styles.floatingLabelStyle}
            inputStyle={styles.floatingLabelStyle}
        />
        <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            errorText={errors.password}
            onChange={onChange}
            value={user.password}
            autoComplete='off'
            floatingLabelStyle={styles.floatingLabelStyle}
            inputStyle={styles.floatingLabelStyle}
        />
        {/*<TextField*/}
            {/*floatingLabelText="Phone"*/}
            {/*name="phone"*/}
            {/*errorText={errors.phone}*/}
            {/*onChange={onChange}*/}
            {/*value={user.phone}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}
        {/*<TextField*/}
            {/*floatingLabelText="Country"*/}
            {/*name="country"*/}
            {/*errorText={errors.country}*/}
            {/*onChange={onChange}*/}
            {/*value={user.country}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}
        {/*<TextField*/}
            {/*floatingLabelText="City"*/}
            {/*name="city"*/}
            {/*errorText={errors.city}*/}
            {/*onChange={onChange}*/}
            {/*value={user.city}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}
        {/*<TextField*/}
            {/*floatingLabelText="Street"*/}
            {/*name="street"*/}
            {/*errorText={errors.street}*/}
            {/*onChange={onChange}*/}
            {/*value={user.street}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}
        {/*<TextField*/}
            {/*floatingLabelText="House"*/}
            {/*name="house"*/}
            {/*errorText={errors.house}*/}
            {/*onChange={onChange}*/}
            {/*value={user.house}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}
        {/*<TextField*/}
            {/*floatingLabelText="Flat"*/}
            {/*name="flat"*/}
            {/*errorText={errors.flat}*/}
            {/*onChange={onChange}*/}
            {/*value={user.flat}*/}
            {/*autoComplete='off'*/}
            {/*floatingLabelStyle={styles.floatingLabelStyle}*/}
            {/*inputStyle={styles.floatingLabelStyle}*/}
        {/*/>*/}

        <div className="button-line">
            <RaisedButton backgroundColor="#ffb347" type="submit" label="Create new account"/>
        </div>

        <CardText style={{color: 'white'}}>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
    </Card>
);

SignUpForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;
