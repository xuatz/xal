import React from 'react';
import { connect } from 'react-redux';
import Parse from 'parse';

import {ListsPanelContainer} from './ListsPanel';
import {StatsPanelContainer} from './StatsPanel';

import * as actions from '../actions';
import * as db from '../lib/db';

const mapStateToProps = (state) => {
	return {
		
	};
};

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
				return callback && callback();
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
};

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
			<div style={{display:'inline-block', background:'#1E2124'}} >
				<div style={{width:'35%', float:'left', background:'#1E2124'}} >
					<div style={{margin:'0px 10px 0px 0px', padding:'20px'}} >
						<ListsPanelContainer />
					</div>
				</div>
				<div style={{width:'65%', float:'left'}} >
					<div style={{margin:'0px 0px 0px 5px', padding:'20px'}} >
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