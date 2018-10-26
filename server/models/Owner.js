const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OwnerSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    password:{
        type:String
    },
    name:{
        type: String
    }
});

OwnerSchema.methods.comparePassword = function comparePassword(password, callback) {
    if(this.password === password){
        return true;
    }
    return false;
    //bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('Owner', OwnerSchema);