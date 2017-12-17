const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  lightMode: String,
  lightTime: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.methods.editSettings = function editSettings(newLightMode, newLightTime, userID){
  const user = this;

  var query = { _id: userID };
  var update = {lightMode : newLightMode, lightTime : newLightTime};
  user.findOneAndUpdate(query, update,  function(err){
    if(err) console.log(err);
  });
}

UserSchema.methods.setSettings = function setSettings(newLightMode, newLightTime, userID){
  this.findOneAndUpdate({_id: userID}, {$set: {lightMode: newLightMode, lightTime: newLightTime}}, function(err,res){
    if(err) console.log(err);

    console.log(res)
  });
}
/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
