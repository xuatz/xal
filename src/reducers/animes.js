import moment from 'moment';

import anime from './anime';
import episodeReducer from './episodeReducer';

import * as db from '../lib/db.js';

const animes = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_CURRENT_SEASON_SERIES':
			return action.animeList || state;
		case 'UPDATE_NEXT_EPISODE_DTTM':
			return state.map((anAnime) => {
				return anime(anAnime, action);
			});
		case 'RATE_SERIES_EPISODE':
			return state.map((anAnime) => {
				if (anAnime.id == action.animeId) {
					return anime(anAnime, action);
				}
				return anAnime;
			});
		default:
			return state;
	}
};

export default animes;