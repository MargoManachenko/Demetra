const express = require('express');
const User = require('mongoose').model('User');

const router = new express.Router();

router.post('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.post('/employeeDashboard', (req, res) => {
  let usersList = [];
  console.log(usersList);
  User.find({}, (err, users) => {
    if(err){
      console.log(err);
      return res.status(200).json({
          message: "No users found in the system",
          usersList: []
      });
    }
    usersList = users;
    console.log(usersList);
    res.status(200).json({
        message: '',
        usersList: usersList
    });
  });
});

module.exports = router;
