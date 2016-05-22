import express from 'express'
import webpack from 'webpack';
import path from 'path';
import http from 'http';

var PORT = process.env.PORT || 8080;
var app = express();
var httpServer = http.createServer(app);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

httpServer.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});