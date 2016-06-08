import React from 'react';
import { connect } from 'react-redux';

import Parse from 'parse';

import * as actions from '../../actions'
import * as db from '../../lib/db';

const mapDispatchToProps = (dispatch) => {
	return {
		hydrateStore: () => {
			db.getUserWatchList((err, res) => {
				if (res) {
					let state = {
						watchList: res
					};
					dispatch(actions.hydrateStore(state));
				}
			});
		},
		flushStore: () => {
			dispatch({
				type: 'FLUSH_STORE'
			});	
		}
	};
}

const Logout = (props) => {
	const handleOnClick = (event) => {
		console.log('Logout:handleOnClick');
		console.log(event);
		Parse.User.logOut().then(() => {
			props.updateLoginStatus();
			props.flushStore();
		});
	}
	return (
		<div>
			<button onClick={handleOnClick} >
				Logout
			</button>
		</div>
	);
};

const Login = (props) => {
	const handleOnClick = (event) => {
		console.log('Login:handleOnClick');
	}

	const handleOnSubmit = (event) => {
		event.preventDefault();

		console.log('Login:handeOnSubmit');
		// console.log(event.target.username.value);
		// console.log(event.target.password.value);

		if (props.isLogin) {
			Parse.User.logIn(event.target.username.value, event.target.password.value, {
				success: function(user) {
					props.updateLoginStatus();
					//props.hydrateStore();
				},
				error: function(user, error) {
					console.log('login failed!');
					// The login failed. Check error to see why.
				}
			});
		} else {
			let user = new Parse.User();
			user.set("username", event.target.username.value);
			user.set("password", event.target.password.value);
			user.signUp(null, {
				success: function(user) {
					// Hooray! Let them use the app now.
					props.updateLoginStatus();
				},
				error: function(user, error) {
					// Show the error message somewhere and let the user try again.
					alert("Error: " + error.code + " " + error.message);
				}
			});	
		}
	}

	return (
		<form style={{float:'right'}} onSubmit={handleOnSubmit}>
			<span style={{margin:'0px 10px', float:'left'}} onClick={props.handleOnClick} >
				{props.isLogin ?
					"Don't have an account? Create one now!" :
					"Have an account? Log here!"
				}
			</span>
			<span style={{float:'right'}}>
				<input id="username" name="username" placeholder="username" type="text" />
				<input id="password" name="password" placeholder="password" type="password" />
				<button type="submit">
					{props.isLogin ?
						"Login" :
						"Create"
					}
				</button>
			</span>
		</form>
	);
};

class Header extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isLogin: true,
			action: '/placeholder',
			loggedIn: Parse.User.current() ? true : false
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.updateLoginStatus = this.updateLoginStatus.bind(this);
	}

	handleOnClick(event) {
		console.log('Header:handleOnClick');
		console.log(event);
		this.setState({
			isLogin: !this.state.isLogin
		})
	}

	updateLoginStatus() {
		console.log('Header:updateLoginStatus');
		console.log('loggedIn', this.state.loggedIn);

		let loggedIn = Parse.User.current() ? true : false;
		console.log(loggedIn);

		this.setState({
			loggedIn: loggedIn
		});
	}

	render() {
		return (
			<div style={{display:'inline-block', width:'100%'}} >
				<span>
					{"*Placeholder Header* testing1 | testing2"}
				</span>
				<span style={{width:'40%', float:'right', margin:'20px'}} >
					{this.state.loggedIn ? 
						<Logout updateLoginStatus={this.updateLoginStatus} flushStore={this.props.flushStore} /> :
						<Login isLogin={this.state.isLogin} handleOnClick={this.handleOnClick} updateLoginStatus={this.updateLoginStatus} hydrateStore={this.props.hydrateStore} />
					}
				</span>
			</div>
		);
	}
}

export const HeaderContainer = connect(
	null,
	mapDispatchToProps
)(Header);