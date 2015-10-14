var Applicant = require('../models/applicationModel.js')

	var createApplicant = function(req, res){
		var createApplicant = new Applicant({
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
	};

	var pullApplicants = function(req, res){
		Applicant.find({}, function(err, data){
			if(err){
				console.log('error ',err);
				res.send(err);
			}
			else{
				res.send(data);
			};
		});
	};

	var deleteApplicant = function(req, res){
		Applicant.remove( {_id : req.body._id }).exec();
		Applicant.find({}, function(err, data){
			if(err){
				console.log(err);
			}
			else{
				res.send(data);
			};
		});
	};

	var getOneApplication = function(req, res){
		Applicant.find({_id : req.body.id}, function(err, data){
			if(err){
				res.send(err)
			}
			else{
				res.send(data)

			};
		});
	};

module.exports = {
	createApplicant : createApplicant,
	pullApplicants  : pullApplicants,
	deleteApplicant : deleteApplicant,
	getOneApplication : getOneApplication
};