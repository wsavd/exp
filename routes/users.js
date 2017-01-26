var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var configDB = require('../database.js');
mongoose.connect(configDB.url, function(){
  console.log("connected");
}); // connect to our database

var User = require('../models/user');  

var apiRoutes = express.Router();

router.get('/', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
}); 

module.exports = router;