import anime from './anime';
import episodeReducer from './episodeReducer';

import moment from 'moment';
import {getCurrentSeasonSeries} from '../lib/util.js';

//xz: this is very bad, because this reducer is not pure
//TODO need to change the code to make the reducer pure
function getCountdownFields(airingDateTime, lastAiredDate) {
	const now = moment();

	let airingDateTimeMoment = moment(airingDateTime), lastAiredDateMoment;

	if (airingDateTime == undefined || moment(airingDateTime).isBefore(now)) {
		console.log('shouldn run so often');
		airingDateTimeMoment = moment(airingDateTime);
		let dayDiff = airingDateTimeMoment.diff(now, 'days');

		while(dayDiff < 0) {
			airingDateTimeMoment.add(7, 'days');
			dayDiff = airingDateTimeMoment.diff(now, 'days');

			while (airingDateTimeMoment.diff(now, 'minutes') < 0) {
				airingDateTimeMoment.add(7, 'days');
				dayDiff = airingDateTimeMoment.diff(now, 'days');
			}
		}

		lastAiredDateMoment = moment(airingDateTimeMoment);
		lastAiredDateMoment.subtract(7, 'days');	
	}
	
	const duration = moment.duration(airingDateTimeMoment.diff(now));

	return {
		daysUntil: Math.floor(duration.asDays()),
		hoursUntil: Math.floor(duration.hours()),
		minutesUntil: Math.floor(duration.minutes()),
		secsUntil: Math.floor(duration.seconds()),
		lastAiredDate: lastAiredDateMoment || lastAiredDate,
		duration: duration
	};
}

const animes = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_CURRENT_SEASON_SERIES':
			return getCurrentSeasonSeries();
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