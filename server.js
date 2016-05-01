var path = require('path');
var express = require('express');
var http = require('http');
var PORT = process.env.PORT || 8080

var app = express();
var httpServer = http.createServer(app);

console.log('xz: __dirname', __dirname);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
	//console.log('xz: __dirname', __dirname);
	res.sendFile('/dist/index.html')
});

httpServer.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});