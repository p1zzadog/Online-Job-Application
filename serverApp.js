var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', routes);
app.use('/applicants', routes);
app.use('/pullapplicants', routes);
app.use('/newApplicant', routes);
app.use('/success', routes);
app.use('/deleteresource', routes);

var port = 3000
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
