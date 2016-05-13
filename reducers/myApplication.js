import {getCurrentSeasonSeries} from '../lib/util.js'

const myApplication = (state= {currentSeasonSeries: []}, action) => {
	switch (action.type) {
		case 'FETCH_CURRENT_SEASON_SERIES':
			return Object.assign({}, state, {
				currentSeasonSeries: getCurrentSeasonSeries()
			});
		default:
			return state;
	}
}

export default myApplication