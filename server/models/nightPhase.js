const mongoose = require('mongoose');
var moment = require('moment');

// define the User model schema
const NightPhaseSchema = new mongoose.Schema({
  nightID: String,
  startTimeOfPhase: String,
  endTimeOfPhase: String,
  duration: String
});


NightPhaseSchema.statics.getNightByUserId = function getNightByUserId(currentUserId) {

	//return this.find({userID : currentUserId}).sort({ date: -1 }).limit(1);
};
          
               
NightPhaseSchema.statics.addPhase = function addPhase(newPhase, callback){

	newPhase.save();
};

NightPhaseSchema.statics.endPhase = function endPhase(currentNightId, callback){
	
	var durationOfPhase;
	var endTime = new Date().getTime();

	this.findOne({ nightID: currentNightId }, (err, phase) => {
	    if (err) {
	    	console.log(err); 
	    	return err;
	    }  
	    var startTime = phase.startTimeOfPhase;
	    durationOfPhase = endTime -startTime;
	});
	
	var query = {nightID : currentNightId};
	var update = {endTimeOfPhase : endTime, duration : durationOfPhase}

	this.findOneAndUpdate(query, update, function(err){
		if(err) console.log(err);
	});
};

module.exports = mongoose.model('NightPhase', NightPhaseSchema);
