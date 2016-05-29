import moment from 'moment';

import episodeReducer from './episodeReducer';

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

let initialState = {
	title: 'demo',
	airingDateTime: 'huat ah',
	daysUntil: null,
	hoursUntil: null,
	minutesUntil: null,
	episodes: []
};

const anime = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_COUNTDOWN':
			return Object.assign({}, state,
				getCountdownFields(state.airingDateTime, state.lastAiredDate)
			);
		case 'RATE_SERIES_EPISODE':
			return Object.assign({}, state, {
				episodes: state.episodes.map((episode) => {
					if (episode.id == action.episodeId) {
						return episodeReducer(episode, action);
					}
					return episode;
				}
			)});
		default:
			return state;
	}
};

export default anime;