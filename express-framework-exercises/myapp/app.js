var express = require('express');
var app = express();
var qhttp = require('q-io/http');


var cache = require('lru-cache')({  
    max : 100,                   // The maximum number of items allowed in the cache
    max_age : 1000 * 60 * 60     // The maximum life of a cached item in milliseconds
});


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use('/', express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/cache', function(req, res) {
    res.sendFile('public/cache.html' , { root : __dirname});
});

app.post('/search/movie', function(req, res) {
    if (!(cache.has(req.body.movie))) {

        var omdbapiURL = 'https://www.omdbapi.com/?s=' + encodeURIComponent(req.body.movie).replace(/%20/g, "+");

        qhttp.read(omdbapiURL).then(function(json) {
            var responseJSON = JSON.parse(json);
    		cache.set(req.body.movie, responseJSON);
            res.send(responseJSON);
        }).then(null, console.error).done();
    } else {
    	res.send(cache.get(req.body.movie));
    }
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
