var express = require('express');
var router = express.Router();
var applicationController = require('../controllers/applicationController.js');

router.get('/', function(req, res) {
	res.sendFile('/html/index.html', {root:'./public'});
});

router.get('/applicants', function(req, res){
	res.sendFile('/html/applicants.html',{root:'./public'});
});

router.post('/newApplicant', applicationController.createApplicant);

router.get('/success', function(req, res){
	res.send('success, bro');
});

router.get('/pullapplicants', applicationController.pullApplicants);

router.post('/deleteresource', applicationController.deleteApplicant);

router.get('/:userid', function(req, res){
	res.sendFile('/html/applicationView.html', {root: './public'});
});

router.post('/getoneapplication', applicationController.getOneApplication);

module.exports = router;