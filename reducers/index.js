import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import animeListing from './animeListing'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  animeListing
})

export default todoApp