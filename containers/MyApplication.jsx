import React from 'react';
import { connect } from 'react-redux';

import {AnimeListingContainer} from './AnimeListing'

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
			<AnimeListingContainer />
		);
	}
}

//smart / connected component
export const MyApplicationContainer = connect(
	mapStateToProps
)(MyApplication);