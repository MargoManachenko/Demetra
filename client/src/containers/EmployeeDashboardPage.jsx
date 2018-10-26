import Auth from '../modules/Auth';
import React, { PropTypes }  from 'react';
import AddCropDialog from "../components/AddCropDialog.jsx";
import UserCropDetails from "../components/UserCropDetails.jsx";
import {Card} from "material-ui";

class EmployeeDashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: '',
            error: '',
            usersList: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onChangeIndicatorId = this.onChangeIndicatorId.bind(this);
        this.GetUsers = this.GetUsers.bind(this);
    }



    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/employeeDashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: xhr.response.message,
                    usersList: xhr.response.usersList
                });
            }
        });
        xhr.send();
    }

    GetUsers(){
        const xhr = new XMLHttpRequest();
        console.log('getting users');
        xhr.open('post', '/api/employeeDashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: xhr.response.message,
                    usersList: xhr.response.usersList
                });
            }
        });
        xhr.send();
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    onChangeIndicatorId(event) {
        const newIndicatorsId = event.target.value;
        this.setState({
            indicatorsId: newIndicatorsId
        });
    }


    render() {
        console.log(this.state);
        let usersListToRender = [];
        if(this.state.usersList.length !== 0){
            for(let i = 0; i < this.state.usersList.length; i++){
                usersListToRender.push(
                        <Card className="container"  style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
                            <div className="homeBlock">
                                <div className="cropDetailsBlock">
                                    <p>{this.state.usersList[i].name}</p>
                                </div>
                            </div>
                        </Card>
                );
            }
            console.log(this.state.cropList);
            return (
                <div>
                    <div className="containerForNight">
                        {usersListToRender}
                    </div>
                </div>

            );
        }
        else{
            this.GetUsers();
            return (
                <div>
                    <p>No users registered in the system.</p>
                </div>
            );
        }
    }
}


EmployeeDashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default EmployeeDashboardPage;
