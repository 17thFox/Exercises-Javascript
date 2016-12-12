var express = require('express');
var app = express();
var qhttp = require('q-io/http');

var cache = require('lru-cache')({  
    max : 100,                   // The maximum number of items allowed in the cache
    max_age : 1000 * 60 * 60     // The maximum life of a cached item in milliseconds
});

var myResponseJSON = {};

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use('/', express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/search/movie', function(req, res) {

    console.log("1. " + cache.get(req.body.movie));
    if (cache.get(req.body.movie) === '' || !(cache.has(req.body.movie))) {

        var omdbapiURL = 'https://www.omdbapi.com/?s=' + encodeURIComponent(req.body.movie).replace(/%20/g, "+");

    	cache.set(req.body.movie);
    	console.log(cache.get(req.body.movie));
        console.log("went to: " + omdbapiURL);

        qhttp.read(omdbapiURL).then(function(json) {
            var responseJSON = JSON.parse(json);
            cache.set(myResponseJSON, responseJSON["Search"]);
            // console.log(cache.get(myResponseJSON));
            res.send(responseJSON['Search']);
        }).then(null, console.error).done();
    } else {
        console.log("got to: " + cache.get(myResponseJSON));
    	res.send(cache.get(myResponseJSON));
    }
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
