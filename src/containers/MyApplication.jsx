import React from 'react';
import { connect } from 'react-redux';
import Parse from 'parse';

import {ListsPanelContainer} from './ListsPanel'
import {StatsPanelContainer} from './StatsPanel'

import * as actions from '../actions'

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
		}
	};
}

//dumb / pure component
export class MyApplication extends React.Component {
	componentDidMount() {
		this.props.fetchCurrentSeasonAnime();
		this.props.getUserWatchList();
		this.props.updateNextEpisodeDttm();
		this.timer = setInterval(this.props.updateNextEpisodeDttm, 50000); //60000 1min

		// var TestObject = Parse.Object.extend("TestObject");
		// var testObject = new TestObject();
		// testObject.save({foo: "bar"}).then(function(object) {
		// 	alert("yay! it worked");
		// });
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