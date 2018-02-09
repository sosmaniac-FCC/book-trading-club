require('dotenv').config();

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bluebird = require('bluebird');

var app = express();

mongoose.connect(process.env.MONGO_URI, {
	useMongoClient: true
});
mongoose.Promise = bluebird.Promise;

app.use(session({
	secret: 'secretBook',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});
