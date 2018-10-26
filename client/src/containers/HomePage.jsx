import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';


const HomePage = () => (
<div>

    <div className="homeBlock">
		<div className="homeBlockHeadingBig">
			<p style={{color: 'white'}}>Demetra</p>
	 	</div>
	</div>

    <div className="homeBlock2">
		<div className="homeBlockHeading">
			<p style={{color: 'white'}}>What is Demetra?</p>

		</div>
		<p style={{color: 'white'}}>
			Demetra is a leasing control system. If you want to get a temperature and humidity
			sensor for rent with the possibility of further foreclosure - you are on the right page.</p>

		<div className="homeBlockHeading">
			<p style={{color: 'white'}}>Why do you need it?</p>

		</div>
		<p style={{color: 'white'}}>
			Demetra is a leasing control system. If you want to get a temperature and humidity
			sensor for rent with the possibility of further foreclosure - you are on the right page.</p>
	</div>

 </div>

);

export default HomePage;
