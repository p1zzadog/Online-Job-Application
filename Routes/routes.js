var express = require('express');
var router = express.Router();
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


router.get('/', function(req, res) {
	res.sendFile('/html/index.html', {root:'./public'});
});


router.get('/applicants', function(req, res){
	res.sendFile('/html/applicants.html',{root:'./public'})
});

router.post('/newApplicant', function(req, res){	
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

router.get('/success', function(req, res){
	res.send('success, bro')
});

router.get('/pullapplicants', function(req, res){
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

router.post('/deleteresource', function(req, res){
	Applicants.remove( {_id : req.body._id }).exec()
	Applicants.find({}, function(err, data){
		if(err){
			console.log(err);
		}
		else{
			res.send(data);
		};
	});
})

module.exports = router;