const mongoose = require('mongoose');

const IndicatorSchema = new mongoose.Schema({
    indicatorId : {
        type: String
    },
    currentTemperature : {
        type: String
    },
    currentHumidity : {
        type: String
    },
    advice : {
        type: String
    }
});

module.exports = mongoose.model('Indicator', IndicatorSchema);