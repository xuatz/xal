import React from 'react';
import { connect } from 'react-redux';

import {GlobalListContainer} from './GlobalList' //TODO rename to GlobalAnimeListing soon
import {UserListingContainer} from './UserListing'
import {ListsPanelContainer} from './ListsPanel'

import * as actions from '../actions'

const mapStateToProps = (state) => {
	return {
		// currentlyAiringSeries: state.myApplication.currentlyAiringSeries
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCountdown: () => {
			dispatch(
				{ type: 'UPDATE_COUNTDOWN' }
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

let count = 0;
//dumb / pure component
export class MyApplication extends React.Component {
	componentDidMount() {
		console.log('keeping track of this! Should only run once.', count++);
		this.props.fetchCurrentSeasonAnime();
		this.props.getUserWatchList();
		this.props.updateCountdown();
		this.timer = setInterval(this.props.updateCountdown, 60000); //60000 1min
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
						<h2>
							<strike>
								Currently Airing Series
							</strike>
							(Deprecated)
						</h2>
						<hr/>
						<GlobalListContainer />
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