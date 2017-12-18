import React, { PropTypes } from 'react';
import Trend from 'react-trend';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class Night extends React.Component{

  constructor(props) {
      super(props);

      this.state = { 
        night: this.props.night,
        phases: this.props.phases,
        errors:{},    
        successMessage: '',  
        isPhase: false,
        nightIs: this.props.nightIs,
        data2 : []
      };

      this.DeleteNight = this.DeleteNight.bind(this);
      this.ProcessPhase = this.ProcessPhase.bind(this);
  }

  DeleteNight(event){

    const formData = `nightID=${this.props.night._id}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/night/deleteNight');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
          this.setState({
            successMessage: xhr.response.successMessage
        });
      } else {
        console.log('error from Night');
      }
    });
    xhr.send(formData);
  }

  getFormatTime(){

    if(this.state.nightIs){
      if(this.state.night.endDateOfNight == null){
        return ' can not show. The night is not finished yet';
      }
      let milisecons = Number(this.state.night.endDateOfNight) - Number(this.state.night.startDateOfNight);
      let minutes = Math.round(milisecons/60000);
      if(minutes < 60) return minutes + ' minutes';
      else{
        let hours = Math.floor(minutes/60);
        let restMinutes = minutes - hours*60;
        return hours + ' hours ' + restMinutes + ' minutes';
      }
    }
    return '';
  }

  getREM(){
    if(this.state.phases.length != 0){
      let remSum = 0;
      for(var i = 0; i < this.state.phases.length; i++){
        remSum += Number(this.state.phases[i].duration);
      }
      let seconds = remSum/1000;
      if(seconds < 60){
        return Math.round(seconds) + ' seconds';
      }
      return Math.round(seconds/60) + ' minutes';
    }
    return ' no phases';
  }

  getFormatDate(){
    return  moment(this.state.night.startDateOfNight, 'x').format('ddd MMM DD YYYY');

    for(var i = 0; i < this.state.phases.length; i++){
      var startFormat = moment(this.state.phases[i].startTimeOfPhase, "x").format('HH:mm');
      var duration = Math.round(Number(this.state.phases[i].duration)/1000);
      phaseInfo.push(i+1 + ". Start time: " + startFormat + ". Duration: " + duration + " sec. ");
    }

  }

  getDateForGraph(){
    var data = [];
    var startTime = moment(this.state.night.startDateOfNight, 'x').format('HH:mm');

    var startPoint = {
      name: startTime,
      uv: 0
    };

    data.push(startPoint);

    for(var i = 0; i < this.state.phases.length; i++){
      
      var startFormat = moment(this.state.phases[i].startTimeOfPhase, 'x').format('HH:mm');
      
      var duration = Math.round(Number(this.state.phases[i].duration)/1000);

      var deepPoint = {
        name: startFormat,
        duration: duration.toString() + ' sec',
        uv: 7
      }

      data.push(deepPoint);

      var endFormat = moment(this.state.phases[i].endTimeOfPhase, 'x').format('HH:mm');

      var middlePoint = {
        name: endFormat,
        duration: duration.toString() + ' sec',
        uv: 0
      }

      data.push(middlePoint);
    }

    var endTime = moment(this.state.night.endDateOfNight, 'x').format('HH:mm');

    var endPoint = {
      name: endTime,
      uv: 0
    };

    data.push(endPoint);
    return data;
  }

  getPhasesTime(){
    var phaseInfo = [];
    for(var i = 0; i < this.state.phases.length; i++){
      var startFormat = moment(this.state.phases[i].startTimeOfPhase, "x").format('HH:mm');
      var duration = Math.round(Number(this.state.phases[i].duration)/1000);
      phaseInfo.push(i+1 + ". Start time: " + startFormat + ". Duration: " + duration + " sec. ");
    }
    return phaseInfo;
  }


  render(){
    if(this.state.nightIs){           

      if(this.state.phases.length != 0){
        this.state.data2 = this.getDateForGraph();
        return(
          <div>
            <Card className="containerForNightPhase" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
              <CardHeader className="nightTitle"
                title={this.getFormatDate()}
                actAsExpander={true}
                showExpandableButton={true}            
              />            
              <CardActions>
                <RaisedButton backgroundColor="#ffb347" label="Delete"  onClick={this.DeleteNight} />
              </CardActions>         

              <div className="deleteNightMessage">
              {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
              </div>

              <Card expandable={true} style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
                <div className="clearfix nightText">
                  <p>{"Sleep time: " + this.getFormatTime()}</p>
                  <p>{"REM time: " + this.getREM()}</p>
                    <div>
                      <div className="verticalAxis">
                        <p>REM sleep</p>
                        <p className="lastchild">Non-REM sleep</p>
                      </div>

                      <div className="graph">   
                        <LineChart width={550} height={200} data={this.state.data2}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                          <XAxis dataKey="name" stroke="#e5e5e5"/>
                          <Line type="linear" dataKey="duration" stroke="#8884d8" dot={false} />
                          <CartesianGrid strokeDasharray="2 2" horizontal={false}/>
                          <Tooltip dataKey="duration" />
                          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>    
                        <div className="phaseInfo">
                          {this.getPhasesTime()}
                        </div>
                      </div>

                      <div className="horizontalAxis">

                      </div>
                    </div>
                </div>
              </Card>
            </Card>
            <br/>
          </div>
        );
      }
      return(
        <div>
        <Card className="containerForNightPhase" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
          <CardHeader className="nightTitle"
            title={this.getFormatDate()}
            actAsExpander={true}
            showExpandableButton={true}            
          />            
          <CardActions>
            <RaisedButton backgroundColor="#ffb347" label="Delete" onClick={this.DeleteNight}/>

          </CardActions>  

          <div className="deleteNightMessage">
          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
          </div>

          <Card expandable={true}  style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>
            <div className="clearfix nightText">
              <p>{"Sleep time: " + this.getFormatTime(this.state.nightDuration)}</p>
              <p>No REM phases</p>              
            </div>
          </Card>
        </Card>
        <br/>

        </div>
      );
    }
    else{
      return(
        <div>123</div>
      )
    }   
  }
}
export default Night;
