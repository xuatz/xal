import React from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

import {MyApplication, MyApplicationContainer} from '../containers/MyApplication'

class App extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }
	
	render() {
		return (
			<div>
				<AddTodo />
				<VisibleTodoList />
				<Footer />

				<MyApplication />
				<MyApplicationContainer />
			</div>
		);
	}
}

export default App
// export const MyQuestionContainer = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(MyQuestion);