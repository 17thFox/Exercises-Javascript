var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/', express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/search/movie', function (req, res) {
  res.send('You searched for a movie using the term: ' + req.body.movie);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
