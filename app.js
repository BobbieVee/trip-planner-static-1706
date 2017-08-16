'use strict';
const express = require('express');
const app = express();
const swig = require('swig');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/index');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

swig.setDefaults({cache: false});
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
	res.render('index', {});
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log('db = ', db);

app.use((err, req, res, next) => {
	res.render('error');
});

db.sync()
.then(() => db.seed())
.catch(err => console.error(err))
;
 

app.listen(port, () => console.log(`Listening intently on port ${port}`))