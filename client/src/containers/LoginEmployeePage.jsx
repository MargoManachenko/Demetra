import React, { PropTypes } from 'react';
import LoginEmployeeForm from "../components/LoginEmployeeForm.jsx";


class LoginEmployeePage extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            errors:{},
            user:{
                userId: '',
                password: ''
            }
        };

        this.ProcessForm = this.ProcessForm.bind(this);
        this.ChangeUser = this.ChangeUser.bind(this);
    }
    ProcessForm(event){
        event.preventDefault();

        const userId = encodeURIComponent(this.state.user.userId);
        const password = encodeURIComponent(this.state.user.password);

        const formData = `email=${userId}&password=${password}`;
        console.log(formData);
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/loginEmployee');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if(xhr.status === 200){
                this.setState({
                    errors: {},
                    userId: xhr.response.userId
                });

                this.context.router.replace('/employee');
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
            <LoginEmployeeForm
                onChange={this.ChangeUser}
                onSubmit={this.ProcessForm}
                errors={this.state.errors}
                user={this.state.user}
            />
        )
    }
}


LoginEmployeePage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginEmployeePage;