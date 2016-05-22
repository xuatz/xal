import React from 'react';
import { connect } from 'react-redux';

import {MyApplicationContainer} from '../containers/MyApplication';

class App extends React.Component {
	render() {
		return (
			<MyApplicationContainer  />
		);
	}
}

export default App;