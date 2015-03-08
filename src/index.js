var path = require('path');

var express = require('express');
var helmet  = require('helmet');
var bodyParser = require('body-parser');

var app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../views'));

app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));

app.get('/', require('./routes/index'));
app.get('/api/rss', require('./routes/api/rss'));

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
