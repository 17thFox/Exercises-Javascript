var express = require('express');
var app = express();
var qhttp = require('q-io/http');
var hbs = require('hbs');

var cache = require('lru-cache')({
    max: 100, // The maximum number of items allowed in the cache
    max_age: 1000 * 60 * 60 // The maximum life of a cached item in milliseconds
});


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.set('view engine', 'hbs');

app.set('views', './views');

app.use('/', express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/cache', function(req, res) {
    res.render('cache')
});

app.post('/cache/information', function(req, res) {
    res.send(cache.keys());
});


app.delete('/cache/information', function(req, res) {
    res.send(cache.reset());
});

app.post('/search/movie', function(req, res) {
    if (!(cache.has(req.body.movie))) {

        var omdbapiURL = 'https://www.omdbapi.com/?s=' + encodeURIComponent(req.body.movie).replace(/%20/g, "+");

        qhttp.read(omdbapiURL).then(function(json) {
            var responseJSON = JSON.parse(json);
            cache.set(req.body.movie, responseJSON);
            console.log(cache);
            res.send(responseJSON);
        }).then(null, console.error).done();
    } else {
        res.send(cache.get(req.body.movie));
    }
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});





// e neplacut sa mentii navbarul intre doua pagini
// next step o sa fie sa folosim un template si 
// pentru paginile web servite
// De preferat tot handlebars momentan 
// Asa ca instalează https://github.com/pillarjs/hbs 
// Si fa un folder "views" in care sa pui index.hbs 
// si cache.hbs in care momentan doar muti ce ai 
// in paginile existente
// Wire up hbs (dupa modelul din readme)
// Si leaga app.get('/cache',... de noul cache.hbs 
// (vezi ca nu e serveStatic,  e res.render ce vrei 
// acum,  check view engines in express documentation)
// (la pagina asta din express docs 
// https://expressjs.com/en/guide/using-template-engines.html ma refeream)
// (pe care cred ca ar fi mai bine sa o citești 
//     înainte de hbs docs)

// fii atenta cum e cu template-urile la Express
// ai mai multe layouts
// (in general doar unul totusi)
// si in layout.(ce-o fi) asta
// o sa ai o sectiune unde express o sa puna view-ul 
// curent
// intr-un template handlebars o sa fie in layout.hbs 
// ceva gen `{{{body}}}` (cu trei acolade ca sa 
//     nu faca escaping la HTML)
// deci ar trebui sa ai ceva gen
// layout.hbs pentru tot cardul paginii
// si index.hbs respectiv cache.hbs pentru paginile 
// individuale (doar partea de content)
// nu ai nevoie inca de partiale caci daca zici 
// res.render('index', {...view model...})
// o sa stie sa randeze intai layout.hbs si sa mute 
// rezultatul randarii lui index.hbs unde gaseste {{{body}}} in layout.hbs
// e fain si exemplul asta: 
// https://github.com/pillarjs/hbs/tree/master/examples/extend
// plus ca o sa avem nevoie de extend ca sa incarcam 
// js-ul corect in pagina corecta, dar pe moment 
// lucram si cu chestii facute mai "ad-hoc" pana e 
// totul in place