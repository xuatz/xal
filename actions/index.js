export const FETCH_CURRENT_SEASON_SERIES = 'FETCH_CURRENT_SEASON_SERIES';

export const fetchCurrentSeasonAnime = () => {
	return {type: 'FETCH_CURRENT_SEASON_SERIES'}
}

//sample code
// export function addTodo(text) {
//   // This form is allowed by Redux Thunk middleware
//   // described below in “Async Action Creators” section.
//   return function (dispatch, getState) {
//     if (getState().todos.length === 3) {
//       // Exit early
//       return
//     }

//     dispatch(addTodoWithoutCheck(text))
//   }
// }