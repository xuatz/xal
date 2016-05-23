import moment from 'moment';

import episodeReducer from './episodeReducer';

//xz: this is very bad, because this reducer is not pure
//TODO need to change the code to make the reducer pure
function getCountdownFields(airingDateTime, log) {
	const now = moment();

	let airingDateTimeMoment = moment(airingDateTime);
	let dayDiff = airingDateTimeMoment.diff(now, 'days');

	while(dayDiff < 0) {
		airingDateTimeMoment.add(7, 'days');
		dayDiff = airingDateTimeMoment.diff(now, 'days');

		if (log) {
			console.log(airingDateTimeMoment.format());
			console.log(dayDiff);
		}

		while (airingDateTimeMoment.diff(now, 'minutes') < 0) {
			airingDateTimeMoment.add(7, 'days');
			dayDiff = airingDateTimeMoment.diff(now, 'days');
		}
	}
	if (log) {
		console.log('xz: dayDiff.format()', dayDiff);
		console.log('xz: airingDateTimeMoment.format()', airingDateTimeMoment.format());
	}

	const duration = moment.duration(airingDateTimeMoment.diff(now));

	let res = {
		daysUntil: Math.floor(duration.asDays()),
		hoursUntil: Math.floor(duration.hours()),
		minutesUntil: Math.floor(duration.minutes()),
		secsUntil: Math.floor(duration.seconds())
	};

	// if (Math.random() > 0.5) {
	// 	res.daysUntil = 6;
	// }

	if (log) {
		console.log('xz: duration', duration);
		console.log(res);
	}

	return res;
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
				getCountdownFields(state.airingDateTime, false)
			);
		case 'RATE_SERIES_EPISODE':
			return Object.assign({}, state, {
				episodes: state.episodes.map(
					(episode) => {
						if (episode.id == action.episodeId) {
							return episodeReducer(episode, action);
						}

						return episode;
					}
				)
			});
		default:
			return state;
	}
};

export default anime;