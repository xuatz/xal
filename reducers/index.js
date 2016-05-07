import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import globalList from './globalList'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  globalList
})

export default todoApp