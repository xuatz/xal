
let initialState = {
	'review': null // UP, DOWN, MEH
}

function episodeReducer(state = initialState, action) {
	console.log('action', action);
	switch (action.type) {
		case 'RATE_SERIES_EPISODE':
			return Object.assign({}, state, {
				'review': action.review
			});
		default:
			return state
	}
}

export default episodeReducer;