var express = require('express');
var app = express();
var qhttp = require('q-io/http');

var cachingObject = {
    'myNewMovie': '',
    'myLastMovie': '',
    'myResponseJSON': {}
};

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

    cachingObject.myNewMovie = req.body.movie;

    if (cachingObject.myLastMovie === '' || cachingObject.myLastMovie !== cachingObject.myNewMovie) {

        var omdbapiURL = 'https://www.omdbapi.com/?s=' + encodeURIComponent(req.body.movie).replace(/%20/g, "+");

        console.log("went to: " + omdbapiURL);

        qhttp.read(omdbapiURL).then(function(json) {
            var responseJSON = JSON.parse(json);
            cachingObject.myLastMovie = req.body.movie;
            cachingObject.myResponseJSON = responseJSON;
            res.send(responseJSON['Search']);
        }).then(null, console.error).done();
    } else {

        console.log("got this: " + cachingObject.myResponseJSON['Search']);
        res.send(cachingObject.myResponseJSON['Search']);
    }

});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});




// daca scriu abc, dup-aia scriu repede si d si il sterg
// sa nu caute iar dupa abc, daca a cautat prima data
// pe server la fiecare raspuns primit de la omdb, 
//sa cache-uiasca search string-ul si raspunsul intr-o 
//variabila globala
// si apoi, daca are deja raspunsul la search-ul cerut, 
//backend-ul sa il dea direct fara sa mai mearga 
//pana la omdb