import { combineReducers } from 'redux';
import globalList from './globalList'; //TODO XZ: deprecating soon
import myApplication from './myApplication';
import animes from './animes';

const xal = combineReducers({
	myApplication,
	globalList,
	animes
});

export default xal;