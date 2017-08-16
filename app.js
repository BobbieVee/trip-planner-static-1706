'use strict';
const express = require('express');
const app = express();
const swig = require('swig');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

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

app.use((err, req, res, next) => {
	res.render('/error.html');
});

app.listen(port, () => console.log(`Listening intently on port ${port}`))