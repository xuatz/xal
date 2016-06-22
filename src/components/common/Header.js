import React from 'react';
import { connect } from 'react-redux';

import Parse from 'parse';
import {AccountPanelContainer} from '../../containers/AccountPanel';

class Header extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isLoggedIn: Parse.User.current() ? true : false
		};
		this.updateLoginStatus = this.updateLoginStatus.bind(this);
	}

	updateLoginStatus() {
		this.setState({
			isLoggedIn: Parse.User.current() ? true : false
		});
	}

	render() {
		return (
			<div style={{display:'inline-block', width:'100%'}} >
				<div style={{display:'inline-block', fontSize:'48px'}}>
					Xuatz Anime List v2
				</div>
				<span style={{width:'40%', float:'right'}} >
					<AccountPanelContainer 
						isLoggedIn={this.state.isLoggedIn} 
						updateLoginStatus={this.updateLoginStatus} />
				</span>
			</div>
		);
	}
}

export default Header;