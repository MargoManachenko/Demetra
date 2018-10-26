// import React, { PropTypes } from 'react';
// import { Card, CardTitle, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import { withStyles } from 'material-ui/styles';
//
//
//
// const Dashboard = ({
//   secretData,
//   onClick,
//   successMessage,
//   buttonText
// 	}) => (
//   <Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}} >
//       <div className="homeBlock">
//           <div className="homeBlockHeadingBig">
//               <h1>My crops</h1>
//           </div>
//           <div className="button-line">
//               <RaisedButton backgroundColor="#ffb347"  label="Add crop" fullWidth={true}/>
//           </div>
//       </div>
//   </Card>
//
// );
//
// Dashboard.propTypes = {
//   secretData: PropTypes.string.isRequired,
//   successMessage: PropTypes.string.isRequired,
//   onSubmit: PropTypes.func.isRequired
// };
//
// export default Dashboard;
//
//
// if(this.state.currentTemperature && this.state.currentHumidity){
//     let minMaxTemperature = this.state.currentTemperature.split("-");
//     let minMaxTHumidity = this.state.currentHumidity.split("-");
//
//     let minTemp = parseInt(minMaxTemperature[0]);
//     let maxTemp = parseInt(minMaxTemperature[1]);
//     let minHum = parseInt(minMaxTHumidity[0]);
//     let maxHum = parseInt(minMaxTHumidity[1]);
//
//     let advices = [];
//     if(this.state.currentTemperature <= minTemp){
//         advices.push('Temperature is too low.');
//     }
//     if(this.state.currentTemperature >= maxTemp){
//         advices.push('Temperature is too high.');
//     }
//     if(this.state.currentHumidity <= minHum){
//         advices.push('Humidity is too low. Watering may help. ');
//     }
//     if(this.state.currentHumidity <= maxHum){
//         advices.push('Humidity is too low. Lower the water portions or periodicity. ');
//     }
//     this.setState({
//         advice:advices
//     });
// }