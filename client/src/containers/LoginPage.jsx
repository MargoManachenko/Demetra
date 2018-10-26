import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm - Copy.jsx';
import Auth from '../modules/Auth';


class LoginPage extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            errors:{},
            user:{
                email: '',
                password: ''
            }
        };

        this.ProcessForm = this.ProcessForm.bind(this);
        this.ChangeUser = this.ChangeUser.bind(this);
    }
    ProcessForm(event){
        event.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);

        const formData = `email=${email}&password=${password}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if(xhr.status === 200){
                this.setState({
                    errors: {},
                    userId: xhr.response.user.userID
                });

                //localStorage.setItem('successMessage', xhr.response.message);

                Auth.authenticateUser(xhr.response.token, xhr.response.user.userID);
                this.context.router.replace('/');
            }else{
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }


    ChangeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
            <LoginForm
                onChange={this.ChangeUser}
                onSubmit={this.ProcessForm}
                errors={this.state.errors}
                user={this.state.user}
            />
        )
    }
}


LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;