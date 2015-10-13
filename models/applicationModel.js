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

module.exports = {
	createApplicant : function(req, res){
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
	},

	pullApplicants : function(req, res){
		Applicants.find({}, function(err, data){
			if(err){
				console.log('error ',err);
				res.send(err);
			}
			else{
				res.send(data);
			};
		});
	},

	deleteApplicant : function(req, res){
		Applicants.remove( {_id : req.body._id }).exec();
		Applicants.find({}, function(err, data){
			if(err){
				console.log(err);
			}
			else{
				res.send(data);
			};
		});
	}
};