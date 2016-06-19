import React from 'react';
import { connect } from 'react-redux';

import Header from './common/Header';
import {MyApplicationContainer} from '../containers/MyApplication';

import '../styles/main.css';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<MyApplicationContainer  />
			</div>
		);
	}
}

export default App;