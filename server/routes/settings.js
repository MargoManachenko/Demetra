const express = require('express');
const passport = require('passport');
const User = require('mongoose').model('User');
const router = new express.Router();

//update sattings to db
router.post('/settings', (req, res, next) => {

	const newLightMode = req.body.lightMode;
	const newLightTime = req.body.lightTime;
	const userID = req.body.userID;

	if(newLightMode == null) newLightMode = 'medium';
	if(newLightTime == null) newLightTime = '10';

	User.findOneAndUpdate({_id: userID}, { $set:{lightMode : newLightMode, lightTime : newLightTime}}, function(err, res){
		if(err) {
			console.log(err);
			return res.status(400).json({
	       		success: false,
	      		errors: 'Could not process the form.'
      		});
		}
	});	

	return res.status(200).json({ 
		success: true,
		successMessage: 'You have successfully changed your settings!',
		lightMode : newLightMode,
		lightTime : newLightTime
	});	
	
});

//get settings from db
router.post('/settings/my', (req, res, next) =>{

	const userID = req.body.userID;

	User.findOne({ _id: userID }, (err, user) => {
    if (err) {console.log(err); return err;}
   
    return res.status(200).json({
			success: true,
			lightMode : user.lightMode,
			lightTime : user.lightTime
		});	
    });
});
 

router.post('/hello', (req, res, next) =>{

	console.log("hello");

});

module.exports = router;
