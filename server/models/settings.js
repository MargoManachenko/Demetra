const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  userID : String,
  lightMode: String,
  lightTime: String
});

SettingSchema.methods.getSettingByUserId = function getSettingByUserId(_id, callback) {

};

SettingSchema.methods.editSettings = function editSettings(newLightMode, newLightTime, userID){
  const setting = this;

  var query = { _id: userID };
  var update = {lightMode : newLightMode, lightTime : newLightTime};
  setting.findOneAndUpdate(query, update,  function(err){
    if(err) console.log(err);
  });
}


module.exports = mongoose.model('SettingSchema', SettingSchema);
