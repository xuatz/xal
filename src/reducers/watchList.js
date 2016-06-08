import _ from 'lodash';
import moment from 'moment';
import {getCurrentSeasonSeries} from '../lib/util.js';

const watchListAddItem = (watchList = [], addId) => {
	let exist = _.find(watchList, (itemId) => {
		return itemId == addId;
	});

	if (!exist) {
		return watchList.concat(addId);
	}

	return watchList;
};

const watchListRemoveItem = (watchList = [], removeId) => {
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
};

const watchList = (state = [], action) => {
	switch (action.type) {
		case 'FLUSH_STORE':
			return [];
		case 'HYDRATE_STORE':
			return action.state.watchList || [];
		case 'WATCH_LIST_ADD_ITEM':
			return watchListAddItem(state, action.id);
		case 'WATCH_LIST_REMOVE_ITEM':
			return watchListRemoveItem(state, action.id);
		default:
			return state;
	}
};

export default watchList;