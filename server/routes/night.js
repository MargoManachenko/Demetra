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

router.post('/startPhase', (req, res, next) => {

	const nightID = req.body.nightID;

	Night.startPhase(nightID, (err) => {
		if(err){
			console.log(err); 
	    	return err;
		}
	});	
	return res.status(200).json({ 
		successMessage: 'New phase is added'
	});	
}); 

router.post('/endPhase', (req, res, next) => {

	const nightID = req.body.nightID;

	Night.endPhase(nightID, (err) => {
		if(err){
			console.log(err); 
	    	return err;
		}
	});	
	return res.status(200).json({ 
		successMessage: 'The phase is closed'
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

router.post('/isPhase', (req, res, next) =>{

	const currentNightID = req.body.nightID;

	var query = {_id : currentNightID};

	Night.findOne({_id : currentNightID}, (err, night) =>{
		if(err){
			console.log(err);
			return err;
		}

		if(night.phases.length == 0){
			console.log(false + "=0");
			return res.status(200).json({
				isPhase: false
			});
		}

	  	let lastPhase = night.phases[night.phases.length-1];

	  	if(lastPhase.endTimeOfPhase == null){
	  		console.log(true);
	  		return res.status(200).json({
				isPhase: true
			});
	  	}
	  	if(lastPhase.endTimeOfPhase !== null){
	  		console.log(false);
	  		return res.status(200).json({
				isPhase: false
			});
	  	}

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

	  	if(nights.length == 0){
	  		isNightCurrentUser = false;
	  		return res.status(200).json({
	  			isNight: isNightCurrentUser
	  		});
	  	}	
	  	let lastNight = nights[nights.length-1];

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