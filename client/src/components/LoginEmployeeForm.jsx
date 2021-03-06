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

const LoginEmployeeForm = ({
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
            floatingLabelText="Id"
            name="userId"
            errorText={errors.userId}
            onChange={onChange}
            value={user.userId}
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

        <div className="button-line">
            <RaisedButton backgroundColor="#ffb347" type="submit" label="Log in"/>
        </div>

        <CardText style={{color: 'white'}}>Are you Demetra's customer? <Link to={'/login'}>Log in</Link></CardText>

    </form>
    </Card>
);

LoginEmployeeForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginEmployeeForm;
