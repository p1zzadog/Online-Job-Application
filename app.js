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
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile('/views/index.html', {root:'./'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('/views/applicants.html',{root:'./'})
});

app.get('/pullapplicants', function(req, res){
	Applicants.find({}, function(err, data){
		if(err){
			console.log('error ',err);
			res.send(err);
		}
		else{
			res.send(data);
		};
	});
});

// creates and applicant
app.post('/newApplicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	
	var createApplicant = new Applicants({
		name : req.body.name,
		bio  : req.body.bio,
		skills : req.body.skills.split(','),
		years : req.body.years,
		fluffery : req.body.why
	});

	createApplicant.save(function(err, data){
		if (err) {
			res.send('there was an error, bro');
		}
	});

	res.redirect('/success');
});

app.get('/success', function(req, res){
	res.send('success, bro')
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
