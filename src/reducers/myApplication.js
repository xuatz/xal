import _ from 'lodash';
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

const addItemToWatchList = (watchList = [], addId) => {
	let exist = _.find(watchList, (itemId) => {
		return itemId == addId;
	});

	if (!exist) {
		return watchList.concat(addId);
	}

	return watchList;
}

const removeItemFromWatchList = (watchList = [], removeId) => {
	let removeIndex;

	_.find(watchList, (itemId, index) => {
		if (itemId == removeId) {
			removeIndex = index;
			return true;
		}
	});

	if (removeIndex !== undefined) {
		return watchList.slice(0, removeIndex).concat(watchList.slice(removeIndex+1));
	}

	return watchList;
}

const myApplication = (state = {watchList: []}, action) => {
	switch (action.type) {
		case 'FETCH_CURRENT_SEASON_SERIES':
			return Object.assign({}, state, {
				currentSeasonSeries: getCurrentSeasonSeries()
			});
		case 'GET_USER_WATCH_LIST':
			return Object.assign({}, state, {
				watchList: getUserWatchList()
			});
		case 'WATCH_LIST_ADD_ITEM':
			return Object.assign({}, state, {
				watchList: addItemToWatchList(state.watchList, action.id)
			});
		case 'WATCH_LIST_REMOVE_ITEM':
			return Object.assign({}, state, {
				watchList: removeItemFromWatchList(state.watchList, action.id)
			});
		case 'UPDATE_COUNTDOWN':
			return Object.assign({}, state, {
				currentSeasonSeries: currentSeasonSeries(state.currentSeasonSeries, action)
			});
		case 'RATE_SERIES_EPISODE':
			return Object.assign({}, state, {
				currentSeasonSeries: animes(state.currentSeasonSeries, action)
			});
		default:
			return state;
	}
}

function animes(state, action) {
	switch(action.type) {
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
}

//TODO should be hydrated somewehre else
const getUserWatchList = () => {
	return [101, 102];
}

export default myApplication