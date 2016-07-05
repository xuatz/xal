require('dotenv').config();

var path = require('path');
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var Parse = require('parse/node');
var axios = require('axios');
var _ = require('lodash');

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY);
Parse.serverURL = 'https://parseapi.back4app.com';

var PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ================================================

var baseURL = 'https://anilist.co/api/';
axios.post(baseURL + 'auth/access_token', {
	grant_type: "client_credentials",
	client_id: process.env.ANILIST_CLIENT_ID,
	client_secret: process.env.ANILIST_CLIENT_SECRET,
})
.then(function (response) {
	var access_token = response.data.access_token;
	axios.get(baseURL + 'browse/anime', {
		params: {
			access_token: access_token,
			status: "Currently Airing",
			airing_data: "airing_data=true",
			full_page: "full_page=true"
		}
	})
	.then(function (response) {
		let currentlyAiringSeries = response.data;

		let Anime = Parse.Object.extend("Anime");
		let animeACL = new Parse.ACL();
		animeACL.setPublicReadAccess(true);
		animeACL.setPublicWriteAccess(false);

		let filtered = _.filter(currentlyAiringSeries, (item) => {
			if (item.adult === false && item.type === 'TV') {
				return true;
			}
			return false;
		});

		// console.log(filtered);

		console.log('pika1');
		let query = new Parse.Query(Anime);
		console.log('pika2');
	    query.find().then((animeList) => {
	        if (animeList) {
	            _.forEach(filtered, (newAnime) => {
	            	let existingRecord = _.find(animeList, function(anime) {
	            		return newAnime.title_romaji === anime.get('titleRomaji');
	    			});

	    			if (existingRecord) {
	    				// console.log('this anime is already in our database, update it maybe?');
	    				//TODO update record???
	    			} else {

	    				//TODO XZ: 	even tho the code below is already functional, 
	    				// 			i will comment it out just in case
	    				
	    				// obj = new Anime();
	    				// let nextEpisodeDttm = null;
	    				// let nextEpisodeNo = null;
	    				// if (newAnime.airing) {
	    				// 	nextEpisodeDttm: newAnime.airing.time;
	    				// 	nextEpisodeNo: newAnime.airing.next_episode;
	    				// }

	    				// obj.save({
	    				// 	titleRomaji: newAnime.title_romaji,
	    				// 	titleEng: newAnime.title_english,
	    				// 	titleJap: newAnime.title_japanese,
	    				// 	imageUrlSml: newAnime.image_url_sml,
	    				// 	imageUrlMed: newAnime.image_url_med,
	    				// 	imageUrlLge: newAnime.image_url_lge,
	    				// 	airingStatus: newAnime.airing_status,
	    				// 	totalEpisode: newAnime.total_episodes,
	    				// 	nextEpisodeDttm: nextEpisodeDttm,
	    				// 	nextEpisodeNo: nextEpisodeNo,
	    				// 	ACL: animeACL
	    				// });
	    			}
	            });
	        }
	    })
	    .catch(function (error) {
			console.log(error);
		});
	})
	.catch(function (error) {
		console.log(error);
	});
})
.catch(function (error) {
	console.log(error);
});

// ================================================

app.listen(PORT, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});