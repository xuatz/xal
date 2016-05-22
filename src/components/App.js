import React from 'react';
import { connect } from 'react-redux';

import {MyApplicationContainer} from '../containers/MyApplication';
import Header from './common/Header';

import '../styles/main.css';

class App extends React.Component {
	render() {
		return (
			<div style={{margin:'20px'}} >
				<Header />
				<MyApplicationContainer  />
			</div>
		);
	}
}

export default App;