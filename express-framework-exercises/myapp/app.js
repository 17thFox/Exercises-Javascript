var express = require('express');
var app = express();
var qhttp = require('q-io/http');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/search/movie', function (req, res) {
	var omdbapiURL = 'https://www.omdbapi.com/?s=' + encodeURIComponent(req.body.movie).replace(/%20/g, "+");

	qhttp.read(omdbapiURL).then(function(json){
		var responseJSON = JSON.parse(json);
		res.send(responseJSON['Search']);
	}).then(null,console.error).done();
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
