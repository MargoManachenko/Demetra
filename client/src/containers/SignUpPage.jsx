import React, { PropTypes }  from 'react';
import SignUpForm from '../components/SignUpForm.jsx'


class SignUpPage extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            errors:{},
            user:{
                email: '',
                name: '',
                password: ''
                // phone: '',
                // country: '',
                // city: '',
                // street: '',
                // house: '',
                // flat: ''
            }
        };

        this.ProcessForm = this.ProcessForm.bind(this);
        this.ChangeUser = this.ChangeUser.bind(this);
    }


    ProcessForm(event){
        event.preventDefault();

        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        // const phone = encodeURIComponent(this.state.user.phone);
        // const country = encodeURIComponent(this.state.user.country);
        // const city = encodeURIComponent(this.state.user.city);
        // const street = encodeURIComponent(this.state.user.street);
        // const house = encodeURIComponent(this.state.user.house);
        // const flat = encodeURIComponent(this.state.user.flat);

        // const formData = `name=${name}&email=${email}&password=${password}&phone=${phone}&country=${country}&city=${city}&street=${street}&house=${house}&flat=${flat}`
        const formData = `name=${name}&email=${email}&password=${password}`

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/signup');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if(xhr.status === 200){
                this.setState({
                    errors: {}
                });

                localStorage.setItem('successMessage', xhr.response.message);
                this.context.router.replace('/login');
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
            <SignUpForm
                onChange={this.ChangeUser}
                onSubmit={this.ProcessForm}
                errors={this.state.errors}
                user={this.state.user}
            />
        )
    };
}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;