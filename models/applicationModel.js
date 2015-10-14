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

module.exports = Applicants