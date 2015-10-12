var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node8');

var applicantSchema = mongoose.Schema({
	name     : {type:String, required:true},
	bio      : {type:String, required:true},
	skills   : {type:Array, required:true},
	years    : {type:Number, required:true},
	fluffery : {type:String, required:true}

});

var Applicants = mongoose.model('Applicants', applicantSchema);


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.render('applicants')
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	
	var newApplicant = new Applicants({
		name : req.body.name,
		bio  : req.body.bio,
		skills : req.body.skills.split(','),
		years : req.body.years,
		fluffery : req.body.why
	});

	newApplicant.save(function(err, data){
		if (err) {
			res.send('there was an error, bro');
		}
	});

	res.redirect('/success');
});

app.get('/success', function(req, res){
	res.render('success')
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
