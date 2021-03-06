var express = require('express')

var app = express();

// SET UP HANDLEBARS VIEW ENGINE
var handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var fortune = require('./lib/fortune.js')

app.set('port', process.env.PORT || 3000);


// STATIC FILES
app.use(express.static(__dirname + '/public'))


// ROUTES
app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

// CUSTOM 404 PAGE
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// CUSTOM 500 PAGE
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.');
});
