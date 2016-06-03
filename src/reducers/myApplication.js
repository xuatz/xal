import _ from 'lodash';

//TODO should be hydrated somewehre else
const getUserWatchList = () => {
	return [101, 102];
};

const addItemToWatchList = (watchList = [], addId) => {
	let exist = _.find(watchList, (itemId) => {
		return itemId == addId;
	});

	if (!exist) {
		return watchList.concat(addId);
	}

	return watchList;
};

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
};

const myApplication = (state = {watchList: []}, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default myApplication;