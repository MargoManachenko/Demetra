const mongoose = require('mongoose');
var moment = require('moment');

// define the User model schema
const NightSchema = new mongoose.Schema({
  userID: String,
  startDateOfNight: String,
  endDateOfNight: String,
  duration: String,
  phases: [{
	startTimeOfPhase: String,
	endTimeOfPhase: String,
	duration: String
  }]
});


NightSchema.statics.getNightByUserId = function getNightByUserId(currentUserId) {

	return this.find({userID : currentUserId}).sort({ date: -1 }).limit(1);
};
          
               
NightSchema.statics.startNight = function startNight(currentUserId, callback){

	var newNight = new this({ 
		userID: currentUserId,
		startDateOfNight: new Date().getTime(),
		endDateOfNight: null,
		duration: null
	});


	newNight.save((err) => {
	    if (err) { return err; }
	    //else console.log(newNight);
	  });
};

NightSchema.statics.endNight = function endNight(currentUserId, callback){
	var durationOfNight;
	var endDate = new Date().getTime();

	this.find({ userID: currentUserId }, (err, nights) => {
	    if (err) {
	    	console.log(err); 
	    	return err;
	    }  
    
	    var startDate = nights[nights.length-1].startDateOfNight;
	    var id = nights[nights.length-1]._id;
	    
	    durationOfNight = endDate -startDate;


	 //    var phasesTest = [{			
		// 	startTimeOfPhase: "1513257446151",
		// 	endTimeOfPhase: "1513257492363",
		// 	duration: "46212"			
	 //    },
	 //    {
		// 	startTimeOfPhase: "1513257922935",
		// 	endTimeOfPhase: "1513257941648",
		// 	duration: "18713"
		// },
		//  {
		// 	startTimeOfPhase: "1513267957560",
		// 	endTimeOfPhase: "1513267984286",
		// 	duration: "26726"
		// },
		// {
		// 	startTimeOfPhase: "1513258036349",
		// 	endTimeOfPhase: "1513258200699",
		// 	duration: "163350"
		// }];	
			
		var query = {_id : id};
		var update = {endDateOfNight : endDate, duration : durationOfNight}
		//var update = {phases: phasesTest}

		this.findOneAndUpdate(query, update, function(err){
			if(err) console.log(err);
		});
	});
};


NightSchema.statics.getAllNights = function getAllNights(currentUserId, callback){

	this.find({userID: currentUserId}, (err, nights) =>{
		if(err){
			console.log(err);
			return err;
		}
		return nights;		
	});
};

module.exports = mongoose.model('Night', NightSchema);
