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
		fetchCurrentSeasonAnime: (callback) => {
			db.getAnimeList((err, res) => {
				dispatch(actions.fetchCurrentSeasonAnime(res));
				return callback();
			});
		},
		getUserWatchList: () => {
			dispatch({
				type: 'GET_USER_WATCH_LIST'
			});
		},
		hydrateStore: () => {
			db.getUserWatchList((err, res) => {
				if (res) {
					let state = {
						watchList: res
					};
					dispatch(actions.hydrateStore(state));
				}
			});
		}
	};
}

//dumb / pure component
export class MyApplication extends React.Component {
	componentDidMount() {
		this.props.fetchCurrentSeasonAnime(() => {
			this.props.updateNextEpisodeDttm();
			this.props.hydrateStore();
		});
		this.timer = setInterval(this.props.updateNextEpisodeDttm, 50000); //50000
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