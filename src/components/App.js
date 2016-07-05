import React from 'react';
import { connect } from 'react-redux';

import Header from './common/Header';
import {MyApplicationContainer} from '../containers/MyApplication';

import '../styles/main.css';

class App extends React.Component {
	render() {
		return (
			<div style={{background:'#1E2124'}} >
				<Header />
				<div className="AppBody" style={{width: '980px', margin:'10px auto'}}>
					<MyApplicationContainer  />
				</div>				
			</div>
		);
	}
}

export default App;