import React from 'react';
import { connect } from 'react-redux';

import Parse from 'parse';

import * as actions from '../actions';
import * as db from '../lib/db';

const mapStateToProps = (state) => {
	return {

	};
};

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
};

const Logout = (props) => {
	console.log();

	const handleOnClick = (event) => {
		console.log('Logout:handleOnClick');
		console.log(event);
		Parse.User.logOut().then(() => {
			props.updateLoginStatus();
			props.flushStore();
		});
	};
	return (
		<div style={{float:'right'}} >
			<span>Welcome {Parse.User.current().toJSON().username}!</span>
			<div onClick={handleOnClick} style={{cursor:'pointer', color:'blue', textDecoration:'underline', textAlign:'right'}} >
				logout
			</div>
		</div>
	);
};

const Login = (props) => {
	const handleOnClick = (event) => {
		console.log('Login:handleOnClick');
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();
		console.log('Login:handeOnSubmit');
		if (props.isLogin) {
			Parse.User.logIn(event.target.username.value, event.target.password.value, {
				success: function(user) {
					props.updateLoginStatus();
					props.hydrateStore();
				},
				error: function(user, error) {
					console.log('login failed!');
					alert("Error: " + error.code + " " + error.message);
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
	};

	return (
		<form style={{float:'right'}} onSubmit={handleOnSubmit}>
			<div style={{display:'inline-block', margin:'5px 10px 5px 0px'}} >
				<div>
					Username
				</div>
				<div>
					<input id="username" name="username" placeholder="username" type="text" />	
				</div>
			</div>
			<div style={{display:'inline-block', margin:'5px 10px 5px 0px'}} >
				<div>
					Password
				</div>
				<div>
					<input id="password" name="password" placeholder="password" type="password" />
				</div>
			</div>
			<div style={{display:'inline-block', margin:'5px 10px 5px 0px'}} >
				<button type="submit" style={{width:'60px'}}>
					<b>
					{props.isLogin ?
						"Login" :
						"Create"
					}
					</b>
				</button>
			</div>

			<div>
				<span onClick={props.handleOnClick} style={{cursor:'pointer', color:'blue', textDecoration:'underline'}} >
					{props.isLogin ?
						"Don't have an account? Create one now!" :
						"Have an account? Log here!"
					}
				</span>
			</div>
		</form>
	);
};

class AccountPanel extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isLogin: true
			// action: '/placeholder',
			// loggedIn: Parse.User.current() ? true : false
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		// this.updateLoginStatus = this.updateLoginStatus.bind(this);
	}

	handleOnClick(event) {
		console.log('AccountPanel:handleOnClick');
		this.setState({
			isLogin: !this.state.isLogin
		});
	}

	render() {
		return (
			<div>
				{this.props.isLoggedIn ? 
					<Logout updateLoginStatus={this.props.updateLoginStatus} flushStore={this.props.flushStore} /> :
					<Login 	updateLoginStatus={this.props.updateLoginStatus} isLogin={this.state.isLogin} handleOnClick={this.handleOnClick}  hydrateStore={this.props.hydrateStore} />
				}
			</div>
		);
	}
}

//smart / connected component
export const AccountPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPanel);