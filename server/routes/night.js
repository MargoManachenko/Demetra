const express = require('express');
const passport = require('passport');
const Night = require('mongoose').model('Night');
const NightPhase = require('mongoose').model('NightPhase');
const User = require('mongoose').model('User');
const router = new express.Router();
var moment = require('moment');

router.post('/startNight', (req, res, next) => {

	const userID = req.body.userID;
	Night.startNight(userID, (err) => {
		if(err){
			console.log('err');
			console.log(err); 
	    	return err;
		}
	});	
	console.log('The sleep mode is ON');
	return res.status(200).json({ 
		success: true,
		successMessage: 'The sleep mode is ON',
		isNight: true
	});	
}); 

router.post('/endNight', (req, res, next) =>{

	const userID = req.body.userID;
	
	Night.endNight(userID, (err) => {
		if(err) {
			console.log(err);
			return err;
		}			
	});
	return res.status(200).json({
		success:true,
		successMessage: 'The sleep mode is OFF',
		isNight: false
	});
});

router.post('/isNight', (req, res, next) =>{

	const currentUserID = req.body.userID;
	let isNightCurrentUser;

	Night.find({userID : currentUserID}, function(err, nights) {
	  	if(err){
	  		console.log(err);
	  		return err;
	  	}
	  	
	  	let lastNight = nights[nights.length-1];

	  	if(nights == null){
	  		isNightCurrentUser = false;
	  		return res.status(200).json({
	  			isNight: isNightCurrentUser
	  		});
	  	}
		if(lastNight.endDateOfNight == null){	      
			isNightCurrentUser = true;
			return res.status(200).json({
	  			isNight: isNightCurrentUser
	  		});
		}
		if(lastNight.endDateOfNight != null){;  
			isNightCurrentUser = false;
			return res.status(200).json({
	  			isNight: isNightCurrentUser
	  		});
		}
	});

	// return res.status(200).json({
	// 	isNight: isNightCurrentUser
	// });
});

router.post('/getAllNights', (req, res, next) =>{

	const currentUserID = req.body.userID;

	Night.find({userID: currentUserID}, (err, nights) => {
		if(err) {
		console.log(err);
		return err;
		}
		if(nights.length == 0){
			return res.status(400).json({
				nightsListExist: false
			});
		}
		else
		{	
			console.log('output result');
			console.log(nights);
			return res.status(200).json({
				nightsList: nights,
				nightsListExist: true
			});
			
		}

	});
});

router.post('/deleteNight', (req, res, next) =>{

	const currentNightID = req.body.nightID;

	Night.remove({ _id: currentNightID}, (err) => {
		if(err) {
		console.log(err);
		return err;
		}
		return res.status(200).json({
			successMessage: 'Night has been removed'
		});
	});
});
module.exports = router;