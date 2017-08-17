'use strict';
const express = require('express');
const app = express();
const swig = require('swig');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/index');

var Place = db.models.Place;
var Hotel = db.models.Hotel;
var Restaurant = db.models.Restaurant;
var Activity = db.models.Activity;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


swig.setDefaults({cache: false});
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
	Promise.all([
		Place.findAll(),
		Hotel.findAll(),
		Restaurant.findAll(),
		Activity.findAll()
	])
	.then(([places, hotels, restaurants, activities]) => {
			res.render('index', {places, hotels, restaurants, activities});
	})
	.catch(next);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


db.sync()
// .then(() => db.seed())
.catch(err => console.error(err))
;
 

app.listen(port, () => console.log(`Listening intently on port ${port}`))