import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import animeContainer from './animeContainer'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  animeContainer
})

export default todoApp