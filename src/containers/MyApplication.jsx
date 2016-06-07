import React from 'react';
import { connect } from 'react-redux';
import Parse from 'parse';

import {ListsPanelContainer} from './ListsPanel'
import {StatsPanelContainer} from './StatsPanel'

import * as actions from '../actions'
import * as db from '../lib/db';

const mapStateToProps = (state) => {
	return {
		
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateNextEpisodeDttm: () => {
			dispatch(
				{ type: 'UPDATE_NEXT_EPISODE_DTTM' }
			);
		},
		fetchCurrentSeasonAnime: () => {
			dispatch(actions.fetchCurrentSeasonAnime());
		},
		getUserWatchList: () => {
			dispatch({
				type: 'GET_USER_WATCH_LIST'
			});
		},
		hydrateStore: () => {
			db.getUserWatchList((err, res) => {
				if (res) {
					dispatch({
						type: 'HYDRATE_STORE',
						state: {
							myApplication: {
								watchList: res || []
							}
						}
					});
				}
			});
		}
	};
}

//dumb / pure component
export class MyApplication extends React.Component {
	componentDidMount() {
		this.props.fetchCurrentSeasonAnime();
		this.props.updateNextEpisodeDttm();
		this.timer = setInterval(this.props.updateNextEpisodeDttm, 50000); //60000 1min

		// var TestObject = Parse.Object.extend("TestObject");
		// var testObject = new TestObject();
		// testObject.save({foo: "bar"}).then(function(object) {
		// 	alert("yay! it worked");
		// });

		if (Parse.User.current()) {
			console.log('logged in!');
			this.props.hydrateStore();
		} else {
			//XZ: currently the operation of getUserWatchList() is being done by
			// `hydrateStore()` with not code sharing.
			// this.props.getUserWatchList();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<div>
				<div style={{width:'35%', float:'left', background:'yellow'}} >
					<div style={{padding:'0px 20px'}} >
						<ListsPanelContainer />
					</div>
				</div>
				<div style={{width:'65%', float:'left', background:'teal'}} >
					<div style={{padding:'0px 20px'}} >
						<StatsPanelContainer />
					</div>
				</div>
			</div>
		);
	}
}

//smart / connected component
export const MyApplicationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyApplication);