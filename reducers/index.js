import { combineReducers } from 'redux'
import globalList from './globalList'
import myApplication from './myApplication'

const xal = combineReducers({
	myApplication,
	globalList
})

export default xal