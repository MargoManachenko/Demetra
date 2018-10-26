import React , { PropTypes }from 'react';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {DatePicker, FlatButton, Dialog, TextField} from "material-ui";
import moment from "moment";



const styles = {
    floatingLabelStyle: {
        color: 'white'
    }
};

class UserCropDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key : this.props.key,
            cropId: this.props.cropId,
            cropName : this.props.cropName,
            indicatorsId : this.props.indicatorsId,
            normalTemperature : this.props.normalTemperature,
            normalHumidity : this.props.normalHumidity,
            seedsPricePerKg : this.props.seedsPricePerKg,
            cropPricePerKg : this.props.cropPricePerKg,
            maturationTimeInMonths : this.props.maturationTimeInMonths,
            currentTemperature : this.props.currentTemperature,
            currentHumidity : this.props.currentHumidity,
            harvestingDate: this.props.harvestingDate,
            harvestingAmount: this.props.harvestingAmount,
            sowingDate: this.props.sowingDate,
            sowingAmount: this.props.sowingAmount,
            advice: [],
            open: false,
            message: '',
            anticipatedIncome: '',
            paymentRequirements: '',
            payed: this.props.payed
        };
        this.OnChangeHarvestingDate = this.OnChangeHarvestingDate.bind(this);
        this.OnChangeSowingDate = this.OnChangeSowingDate.bind(this);
        this.onChangeHarvestingAmount= this.onChangeHarvestingAmount.bind(this);
        this.onChangeSowingAmount = this.onChangeSowingAmount.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.SaveDateChanges = this.SaveDateChanges.bind(this);
    }

    componentDidMount(){
        if(this.state.currentTemperature && this.state.currentHumidity){
            let minMaxTemperature = this.state.currentTemperature.split("-");
            let minMaxTHumidity = this.state.currentHumidity.split("-");

            let minTemp = parseInt(minMaxTemperature[0]);
            let maxTemp = parseInt(minMaxTemperature[1]);
            let minHum = parseInt(minMaxTHumidity[0]);
            let maxHum = parseInt(minMaxTHumidity[1]);

            let advices = [];
            if(parseInt(this.state.currentTemperature) <= minTemp){
                advices.push('Temperature is too low.');
            }
            if(parseInt(this.state.currentTemperature) >= maxTemp){
                advices.push('Temperature is too high.');
            }
            if(parseInt(this.state.currentHumidity) <= minHum){
                advices.push('Humidity is too low. Watering may help. ');
            }
            if(parseInt(this.state.currentHumidity) <= maxHum){
                advices.push('Humidity is too low. Lower the water portions or periodicity. ');
            }
            this.setState({
                advice:advices
            });
        }
    }

    OnChangeSowingDate(event, date){
        this.setState({
            sowingDate: date
        });
    };

    OnChangeHarvestingDate(event, date){
        this.setState({
            harvestingDate: date
        });
    };

    onChangeHarvestingAmount(event){
        this.setState({
            harvestingAmount: event.target.value
        });
    };

    onChangeSowingAmount(event){
        this.setState({
            sowingAmount: event.target.value
        }, function () {
            console.log(this.state.sowingAmount)
        });
    };

    handleOpen(){
        if(this.state.sowingAmount && this.state.harvestingAmount){
            let wasting = this.state.seedsPricePerKg * this.state.sowingAmount;
            let income = this.state.cropPricePerKg * this.state.harvestingAmount;
            console.log(wasting);
            console.log(income);
            this.state.anticipatedIncome = income - wasting;
            this.state.paymentRequirements = this.state.anticipatedIncome * 0.15;
        }


        this.setState({open: true});
    }

    handleClose(){
        this.setState({open: false});
    }

    SaveDateChanges(){
        const cropId = this.state.cropId;
        const sowingDate = this.state.sowingDate;
        const sowingAmount = this.state.sowingAmount;
        const harvestingDate = this.state.harvestingDate;
        const harvestingAmount = this.state.harvestingAmount;

        let formData = `cropId=${cropId}`;
        if(sowingDate){
            formData += `&sowingDate=${sowingDate}`;
        }
        if(sowingAmount){
            formData += `&sowingAmount=${sowingAmount}`;
        }
        if(harvestingDate){
            formData += `&harvestingDate=${harvestingDate}`;
        }
        if(harvestingAmount){
            formData += `&harvestingAmount=${harvestingAmount}`;
        }

        console.log(formData);
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crop/saveChanges');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: xhr.response.message
                });
            }
        });
        xhr.send(formData);
    }

    render(){
        return(
            <div>
                <Card className="container"  style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
                    <div className="homeBlock">
                        <div className="cropDetailsBlock">
                            <p className="headP">{this.state.cropName}</p>
                            <p className="headP">Indicator values:</p>
                            {this.state.currentTemperature && <p>Temperature: {this.state.currentTemperature } °C </p>}
                            {!this.state.currentTemperature && <p>Temperature is not defined yet</p>}
                            {this.state.currentHumidity && <p>Humidity: {this.state.currentHumidity } % </p>}
                            {!this.state.currentHumidity && <p>Humidity is not defined yet</p>}

                            {this.state.advice && <p>Advice: {this.state.advice }</p>}
                            {!this.state.advice && <p>No advice </p>}
                            {this.state.advice.map(advice => (
                                <p>{advice}</p>
                            ))}

                            <p className="headP customizeInfoP">Customize info:</p>
                            <DatePicker
                                floatingLabelText="Sowing date"
                                hintText="Sowing date"
                                onChange={this.OnChangeSowingDate}
                                value={this.state.sowingDate}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                            />

                            <TextField
                                floatingLabelText="Sowing amount"
                                name="sowingAmount"
                                onChange={this.onChangeSowingAmount}
                                value={this.state.sowingAmount}
                                autoComplete='off'
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                            />

                            <DatePicker
                                floatingLabelText="Harvesting date"
                                hintText="Harvesting date"
                                value={this.state.harvestingDate}
                                onChange={this.OnChangeHarvestingDate}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                            />

                            <TextField
                                floatingLabelText="Harvesting amount"
                                name="harvestingAmount"
                                onChange={this.onChangeHarvestingAmount}
                                value={this.state.harvestingAmount}
                                autoComplete='off'
                                floatingLabelStyle={styles.floatingLabelStyle}
                                inputStyle={styles.floatingLabelStyle}
                            />
                            <p></p>
                            <div>
                                <RaisedButton backgroundColor="#ffb347" label="Save changes" onClick={this.SaveDateChanges} />
                            </div>
                            <p></p>
                            {this.state.message && <p className="success-message">{this.state.message}</p>}


                            <div>
                                <RaisedButton backgroundColor="#ffb347" onClick={this.handleOpen} label="Calculations"/>
                                <Dialog
                                    title="Your anticipated income and payment requirement"
                                    actions={[
                                        <FlatButton
                                            label="Close"
                                            primary={true}
                                            onClick={this.handleClose}
                                        />
                                    ]}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    modal={false}
                                    onRequestClose={this.handleClose}
                                >
                                    <p>According to the contract you must pay 15% from the anticipated income</p>
                                    {this.state.anticipatedIncome && <p>Anticipated income: {this.state.anticipatedIncome} ₴</p>}
                                    {this.state.anticipatedIncome && <p>You have to pay for leasing: {this.state.paymentRequirements} ₴</p>}

                                    {!this.state.anticipatedIncome && <p>Can not count anticipated income. Type in sowing and harvesting amount </p>}
                                    <RaisedButton backgroundColor="#ffb347"  label="Requisites" />
                                </Dialog>
                            </div>

                        </div>
                    </div>
                </Card>

            </div>
        )
    }
}

UserCropDetails.contextTypes = {
    router: PropTypes.object.isRequired
};

export default UserCropDetails;
