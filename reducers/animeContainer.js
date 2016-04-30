import moment from 'moment';

//xz: this is very bad, because this reducer is not pure

//TODO need to change the code to make the reducer pure
function getCountdownFields(airingDateTime) {
	const now = moment();

	let dayDiff = airingDateTime.diff(now, 'days');

	while(dayDiff < 0) {
		airingDateTime.add(7, 'days');
		dayDiff = airingDateTime.diff(now, 'days');
	}

	const duration = moment.duration(airingDateTime.diff(now));

	return {
		daysUntil: Math.floor(duration.asDays()),
		hoursUntil: Math.floor(duration.hours()),
		minutesUntil: Math.floor(duration.minutes())
	};
}

const animeContainer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_COUNTDOWN':
			return Object.assign({}, state, 
				getCountdownFields(action.airingDateTime)
			);
	default:
		return state
	}
}

export default animeContainer
		