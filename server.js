var path = require('path');
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// var Parse = require('parse/node');
// var parseExpressHttpsRedirect = require('parse-express-https-redirect');
// var parseExpressCookieSession = require('parse-express-cookie-session');
// var PARSE_APP_ID = "Uclorbou8YGlgHjBg67zYockeUkH67KPovdjZ30D";
// var JAVASCRIPT_KEY = "HQYLuwBlmnLs9QudSWcRgLZT9nAp47kluHvMVPNn";
// var COOKIE_SECRET = 'placeholderCookieSecret';

var PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// //https://dashboard.back4app.com/apps#/wizard/app-details/d13c136a-4390-4b84-82f8-d611c1176417
// Parse.initialize(PARSE_APP_ID, JAVASCRIPT_KEY);
// Parse.serverURL = 'https://parseapi.back4app.com';
// app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});