require('dotenv').config();

const logger = require('morgan');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const config = require('./server.config.js');
const routes = require('./src_server/routes.js');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
	extended: false 
}));

mongoose.connect(config.database, {
	useMongoClient: true
});
mongoose.Promise = require('bluebird').Promise;

app.use(express.static(path.join(__dirname, 'src_client')));

app.use(passport.initialize());

app.use('/', routes);

app.get('*', (req, res) => {
    console.log('*', __dirname, '*');
    res.sendFile(path.join(__dirname, 'src_client/html/main.html'));
});

const port = config.port || 8080;
app.listen(port, () => {
    console.log('Node.js listening...');
});