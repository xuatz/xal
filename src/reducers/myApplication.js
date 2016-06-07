import _ from 'lodash';

//TODO should be hydrated somewehre else
const getUserWatchList = () => {
	//TODO can reuse this method to be more real
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
		case 'FLUSH_STORE':
			return Object.assign({}, state, {
				watchList: []
			});
		case 'HYDRATE_STORE':
			let res = Object.assign({}, state, {
				watchList: action.state.myApplication.watchList
			});
			return res;
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