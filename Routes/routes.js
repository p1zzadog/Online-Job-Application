var express = require('express');
var router = express.Router();
var applicationModel = require('../models/applicationModel.js');

router.get('/', function(req, res) {
	res.sendFile('/html/index.html', {root:'./public'});
});

router.get('/applicants', function(req, res){
	res.sendFile('/html/applicants.html',{root:'./public'});
});

router.post('/newApplicant', applicationModel.createApplicant);

router.get('/success', function(req, res){
	res.send('success, bro');
});

router.get('/pullapplicants', applicationModel.pullApplicants);

router.post('/deleteresource', applicationModel.deleteApplicant);

module.exports = router;