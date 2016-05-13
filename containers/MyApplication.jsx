import React from 'react';
import { connect } from 'react-redux';

import {GlobalListContainer} from './GlobalList' //TODO rename to GlobalAnimeListing soon
import {UserListingContainer} from './UserListing'
import {ListsPanelContainer} from './ListsPanel'

const mapStateToProps = (state) => {
	return {
		// currentlyAiringSeries: state.myApplication.currentlyAiringSeries
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// _updateCountdown: (airingDateTime) => {
		// 	dispatch(updateCountdown(moment(airingDateTime)));
		// }
	};
}

const getUserWatchList = () => {
	console.log('huat ah');

	return [101, 102];
}



//dumb / pure component
export class MyApplication extends React.Component {
	render() {
		return (
			<div>
				<div style={{width:'35%', float:'left', background:'yellow'}} >
					<div style={{padding:'0px 20px'}} >
						<ListsPanelContainer watchList={getUserWatchList()} />
						<UserListingContainer />
					</div>
				</div>
				<div style={{width:'65%', float:'left', background:'teal'}} >
					<div style={{padding:'0px 20px'}} >
						<h2>
							Currently Airing Series
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
	mapStateToProps
)(MyApplication);