const express = require('express');
const CropConstants = require('mongoose').model('CropConstants');
const Crop = require('mongoose').model('Crop');
const router = new express.Router();

router.get('/cropNames', (req, res) => {

    // const cropNames = CropConstants.getCropNames();
    // console.log(cropNames);
    //
    // res.status(200).json({
    //     message: "success",
    //     cropNames: cropNames
    // });

    CropConstants.find({}, (err, names) => {
        if (err) {
            console.log(err);
            return err;
        }

        let cropNamesArr = [];
        for(let i = 0; i < names.length; i++){
            cropNamesArr[i] = names[i].name;
        }

        return res.status(200).json({
            cropNames: cropNamesArr
        });
    }).select("name -_id");

});

router.post('/getAllCrop', (req,res) => {
    const userId = req.body.userId;
    const query = {clientId: userId};
    let cropListResult = [];

    Crop.find(query, (err, cropList) => {

        if(err){
            return res.status(400).json({
                error: err
            });
        }
        cropListResult = cropList;

        console.log(cropListResult);
        return res.status(200).json({
            cropList: cropListResult
        });
    })
});

router.post('/addCrop', (req,res) =>{
    console.log(5555);
    const userId = req.body.userId;
    const cropName = req.body.cropName;
    // const indicatorsId = req.body.indicatorsId;

    // let crop1 = new CropConstants({
    //     name:  "Kamut",
    //     normalTemperature: "25",
    //     normalHumidity: "20",
    //     seedsPricePerKg: "40",
    //     cropPricePerKg: "30",
    //     maturationTimeInMonths: "1"
    // });
    // crop1.save();
    // crop1.save((err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else
    //         console.log('good');
    // });

    let query = {name : cropName};
    CropConstants.findOne(query, (err, crop) => {
        if(err){
            console.log(err);
            return err;
        }

        if(crop){
            let newCrop = new Crop({
                clientId: userId,
                cropConstantsId: crop._id,
                cropName: cropName,
                // indicatorsId: indicatorsId,
                normalTemperature: crop.normalTemperature,
                normalHumidity: crop.normalHumidity,
                seedsPricePerKg: crop.seedsPricePerKg,
                cropPricePerKg: crop.cropPricePerKg,
                maturationTimeInMonths: crop.maturationTimeInMonths,
                payed: null
            });
            newCrop.save((err) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                else
                    return res.status(200).json({
                        message: 'New crop was just added'
                });
            });
        }
        else{
            return res.status(400).json({
                error: 'No crop in crop constants found. Connect the manager for needed help.'
            });
        }
    });



    // Crop.AddCrop(userId, cropName, indicatorsId, (err) =>{
    //     if(err){
    //         return res.status(201).json({
    //             message: 'Error occured'
    //         });
    //     }
    //     return res.status(200).json({
    //         message: 'success: crop added'
    //     });
    // });
});

router.post('/saveChanges', (req,res) => {
    const cropId = req.body.cropId;
    const sowingDate = req.body.sowingDate;
    const sowingAmount = req.body.sowingAmount;
    const harvestingDate = req.body.harvestingDate;
    const harvestingAmount = req.body.harvestingAmount;

    const query = {_id: cropId};

    if(sowingDate){
        Crop.findOneAndUpdate(query, {$set: {sowingDate:  sowingDate}}, function (err,res) {
            console.log('res:');
            console.log(res);
            if(err){
                return res.status(400).json({
                    message: "couldn't update sowing date"
                });
            }
        });
    }

    if(sowingAmount){
        Crop.findOneAndUpdate(query, {$set: {sowingAmount:  sowingAmount}}, function (err,res) {
            if(err){
                return res.status(400).json({
                    message: "couldn't update sowing amount"
                });
            }
        });
    }

    if(harvestingDate){
        Crop.findOneAndUpdate(query, {$set: {harvestingDate:  harvestingDate}}, function (err,res) {
            if(err){
                return res.status(400).json({
                    message: "couldn't update harvesting date"
                });
            }
        });
    }

    if(harvestingAmount){
        Crop.findOneAndUpdate(query, {$set: {harvestingAmount:  harvestingAmount}}, function (err,res) {
            if(err){
                return res.status(400).json({
                    message: "couldn't update harvesting amount"
                });
            }
        });
    }

    return res.status(200).json({
        message: 'Information was updated'
    });

});

//
//IoT method to get indicator's value
//
router.post('/indicatorValues', (req,res) => {

    console.log('I started');
    const cropId = req.body.cropId;
    const temperature = req.body.temperature;
    const humidity = req.body.humidity;

    console.log(cropId);
    const query = {_id: cropId};


    Crop.findOneAndUpdate(query, {$set: {currentTemperature:  temperature, currentHumidity: humidity}}, function (err,res) {
        if(err){
            return res.status(400).json({
                message: "couldn't update indicator values"
            });
        }
    });

    Crop.findOne(query, (err, crop) => {
        if(err){
            console.log(err);
            return err;
        }
        console.log(crop);
    });
    return res.status(200).json({
        message: 'Values were updated'
    });


});

module.exports = router;
