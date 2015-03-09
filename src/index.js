let path = require('path');

let express = require('express');
let helmet  = require('helmet');
let bodyParser = require('body-parser');
let multer = require('multer');

let app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer());

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../views'));

app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/setting', require('./routes/setting'));

let routes = {
  items: require('./routes/api/items'),
  urls: require('./routes/api/urls')
};

app.get('/api/login', require('./routes/api/login'));
app.get('/api/items', routes.items.get);
app.get('/api/urls', routes.urls.get);
app.post('/api/urls', routes.urls.post);
app.put('/api/urls', routes.urls.put);
app.delete('/api/urls', routes.urls.delete);

let port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
