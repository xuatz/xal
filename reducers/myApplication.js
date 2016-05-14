import {getCurrentSeasonSeries} from '../lib/util.js'

import anime from './anime';
const currentSeasonSeries = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE_COUNTDOWN':
			return state.map(function(item){
				return anime(item, action);
			});
	}
}

const myApplication = (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_CURRENT_SEASON_SERIES':
			return Object.assign({}, state, {
				currentSeasonSeries: getCurrentSeasonSeries()
			});
		case 'GET_USER_WATCH_LIST':
			return Object.assign({}, state, {
				watchList: getUserWatchList()
			});
		case 'UPDATE_COUNTDOWN':
			return Object.assign({}, state, {
				currentSeasonSeries: currentSeasonSeries(state.currentSeasonSeries, action)
			});
		default:
			return state;
	}
}

//TODO should be hydrated somewehre else
const getUserWatchList = () => {
	return [101, 102];
}

export default myApplication