import Auth from '../modules/Auth';
import React, {PropTypes} from 'react';
import AddCropDialog from "../components/AddCropDialog.jsx";
import UserCropDetails from "../components/UserCropDetails.jsx";

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        const userId = localStorage.getItem('userId');

        this.state = {
            secretData: '',
            successMessage: '',
            userID: userId,
            open: false,
            indicatorsId: '',
            cropName: '',
            message: '',
            error: '',
            cropList: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onChangeCropName = this.onChangeCropName.bind(this);
        this.onChangeIndicatorId = this.onChangeIndicatorId.bind(this);
        this.SubmitForm = this.SubmitForm.bind(this);
    }


    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send();

        const xhr2 = new XMLHttpRequest();
        const userId = this.state.userID;
        const formData = `userId=${userId}`;
        xhr2.open('post', '/crop/getAllCrop');
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr2.responseType = 'json';
        xhr2.addEventListener('load', () => {
            if (xhr2.status === 200) {
                this.setState({
                    cropList: xhr2.response.cropList
                });
            }
        });
        xhr2.send(formData);

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

    onChangeCropName(searchText) {
        this.setState({
            cropName: searchText
        });
    };

    SubmitForm(event) {
        event.preventDefault();

        const userID = this.state.userID;
        const cropName = this.state.cropName;
        const indicatorsId = this.state.indicatorsId;

        const formData = `userId=${userID}&cropName=${cropName}&indicatorsId=${indicatorsId}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crop/addCrop');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: xhr.response.message,
                    error: xhr.response.error,
                    open: false
                });
                this.context.router.replace('/');
            }
        });
        xhr.send(formData);
    }

    render() {
        let cropListToRender = [];
        if (this.state.cropList.length !== 0) {
            for (let i = 0; i < this.state.cropList.length; i++) {
                cropListToRender.push(
                    <UserCropDetails
                        key={i}
                        cropId={this.state.cropList[i]._id}
                        cropName={this.state.cropList[i].cropName}
                        indicatorsId={this.state.cropList[i].indicatorsId}
                        normalTemperature={this.state.cropList[i].normalTemperature}
                        normalHumidity={this.state.cropList[i].normalHumidity}
                        seedsPricePerKg={this.state.cropList[i].seedsPricePerKg}
                        cropPricePerKg={this.state.cropList[i].cropPricePerKg}
                        maturationTimeInMonths={this.state.cropList[i].maturationTimeInMonths}
                        currentTemperature={this.state.cropList[i].currentTemperature}
                        currentHumidity={this.state.cropList[i].currentHumidity}
                        harvestingDate={this.state.cropList[i].harvestingDate}
                        harvestingAmount={this.state.cropList[i].harvestingAmount}
                        sowingDate={this.state.cropList[i].sowingDate}
                        sowingAmount={this.state.cropList[i].sowingAmount}
                        payed={this.state.cropList[i].payed}
                    />
                );
            }
            return (
                <div>
                    {this.state.error && <p className="error-message">{this.state.error}</p>}
                    {this.state.message && <p className="success-message">{this.state.message}</p>}
                    <AddCropDialog
                        onClose={this.handleClose}
                        OpenDialog={this.handleOpen}
                        open={this.state.open}
                        onChangeCropName={this.onChangeCropName}
                        onChangeIndicatorId={this.onChangeIndicatorId}
                        SubmitForm={this.SubmitForm}
                    />
                    <div className="containerForNight">
                        {cropListToRender}
                    </div>
                </div>

            );
        }
        else {
            return (
                <div>
                    <div className="homeBlockHeadingBig">
                        {this.state.error && <p className="error-message">{this.state.error}</p>}
                        {this.state.message && <p className="success-message">{this.state.message}</p>}

                        <p style={{color: 'white'}}>You don't have any crop added. Start now.</p>
                    </div>

                    <AddCropDialog
                        onClose={this.handleClose}
                        OpenDialog={this.handleOpen}
                        open={this.state.open}
                        onChangeCropName={this.onChangeCropName}
                        onChangeIndicatorId={this.onChangeIndicatorId}
                        SubmitForm={this.SubmitForm}
                    />

                </div>
            );
        }
    }
}

DashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default DashboardPage;
