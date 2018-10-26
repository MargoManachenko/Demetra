const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    clientId:{
        type: String
    },
    cropConstantsId: {
        type: String
    },
    cropName: {
        type: String
    },
    sowingDate: {
        type: Object
    },
    harvestingDate: {
        type: Object
    },
    harvestingAmount: {
        type: Number
    },
    sowingAmount: {
        type: Number
    },
    indicatorsId: {
        type: String
    },
    normalTemperature: {
        type: String
    },
    normalHumidity: {
        type: String
    },
    seedsPricePerKg: {
        type: String
    },
    cropPricePerKg: {
        type: String
    },
    maturationTimeInMonths: {
        type: String
    },
    currentTemperature:{
        type: String
    },
    currentHumidity:{
        type: String
    },
    payed:{
        type: Boolean
    }
});

CropSchema.statics.GetAllUserCrop = function GetAllUserCrop(userId){
    let query = {clientId: userId};
    return this.find(query);
};

module.exports = mongoose.model('Crop', CropSchema);