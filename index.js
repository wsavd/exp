var express = require('express');
var app = express();
var path = require('path');


//routing

var index = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');
var mongoose = require('mongoose');
var configDB = require('./database.js');
app.set('database', (process.env.MONGODB_URI || configDB.url));
mongoose.connect(app.get('database'), function(){
  console.log("connected");
});
var User = require('./models/user');  


app.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
}); 


var port = process.env.PORT || 8081;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/about', about);
app.use('/contact', contact);
app.use(function(req,res,next){
  res.status(404);
  res.render('404');
});

app.listen(port, function() {
  console.log('Node app is running on port ', port);
});
