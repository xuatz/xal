import React from 'react';
import { connect } from 'react-redux';

import {AnimeListingContainer} from './AnimeListing' //TODO rename to GlobalAnimeListing soon
import {UserListingContainer} from './UserListing'

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

//dumb / pure component
export class MyApplication extends React.Component {
	render() {
		return (
			<div>
				<div style={{width:'50%', float:'left', background:'yellow'}} >
					<div style={{padding:'0px 20px'}} >
						<h2>
							My Watching List *WIP*
						</h2>
						<hr/>

						<UserListingContainer />
					</div>
				</div>
				<div style={{width:'50%', float:'left', background:'teal'}} >
					<div style={{padding:'0px 20px'}} >
						<h2>
							Currently Airing Series
						</h2>
						<hr/>
						<AnimeListingContainer />
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