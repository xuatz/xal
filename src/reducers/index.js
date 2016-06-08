import { combineReducers } from 'redux';
// import globalList from './globalList'; //TODO XZ: deprecating soon
// import myApplication from './myApplication';
import animes from './animes';
import watchList from './watchList';

const xal = combineReducers({
	animes,
	watchList
});

export default xal;