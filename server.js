process.env.NODE_ENV ? null : require('dotenv').config();

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
		var currentlyAiringSeries = response.data;

		var Anime = Parse.Object.extend("Anime");
		var animeACL = new Parse.ACL();
		animeACL.setPublicReadAccess(true);
		animeACL.setPublicWriteAccess(false);

		var filtered = _.filter(currentlyAiringSeries, (item) => {
			if (item.adult === false && item.type === 'TV') {
				return true;
			}
			return false;
		});

		var query = new Parse.Query(Anime);
	    query.find().then((animeList) => {
	        if (animeList) {
	            _.forEach(filtered, (newAnime) => {
	            	var existingRecord = _.find(animeList, function(anime) {
	            		return newAnime.title_romaji === anime.get('titleRomaji');
	    			});

	            	// axios.get('https://anilist.co/api/anime/21355?access_token='+access_token)
	            	axios.get(baseURL + 'anime/' + newAnime.id, {
						params: {
							access_token: access_token
						}
					})
	            	.then(function (response) {
						newAnime = response.data;

						var obj = new Anime();
						if (existingRecord) {
							obj = existingRecord;
						}

						var nextEpisodeDttm = null;
						var nextEpisodeNo = null;

						
						if (newAnime.airing) {
							nextEpisodeDttm = newAnime.airing.time;
							nextEpisodeNo = newAnime.airing.next_episode;
						}

						obj.save({
							titleRomaji: newAnime.title_romaji,
							titleEng: newAnime.title_english,
							titleJap: newAnime.title_japanese,
							description: newAnime.description,
							imageUrlSml: newAnime.image_url_sml,
							imageUrlMed: newAnime.image_url_med,
							imageUrlLge: newAnime.image_url_lge,
							totalEpisode: newAnime.total_episodes,
							startDate: newAnime.start_date,
							endDate: newAnime.end_date,
							airingStatus: newAnime.airing_status,
							nextEpisodeDttm: nextEpisodeDttm,
							nextEpisodeNo: nextEpisodeNo,
							anilistPopularity: newAnime.popularity,
							anilistAvgScore: newAnime.average_score,
							ACL: animeACL
						}, { useMasterKey: true })
						.catch(function (error) {
		            		console.log(newAnime.title_romaji, error);
		            	});
	            	})
	            	.catch(function (error) {
	            		console.log(error);
	            	});
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