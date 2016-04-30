import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
	componentDidMount() {
		console.log('xz: MyApplication: componentDidMount()');
	}

	render() {
		const currentlyAiringSeries = fetchCurrentlyAiringSeries();

		return (
			<AnimeListingContainer series={currentlyAiringSeries} />
		);
	}
}

//smart / connected component
export const MyApplicationContainer = connect(
	mapStateToProps
)(MyApplication);

function fetchCurrentlyAiringSeries() {
	//TODO query from database where airing = true
	
	return [
		{
			title: 'Re:Zero kara Hajimeru Isekai Seikatsu',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Assassination Classroom S2',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Big Order',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Boku no Hero Academia',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Joker Game',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Kabaneri of the Iron Fortress',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Kiznaiver',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Netoge no Yome wa Onnanoko ja Nai to Omotta',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Sakamoto desu ga',
			airingDateTime: '2016-04-03T16:05:00Z'
		},
		{
			title: 'Sousei no Onmyouji',
			airingDateTime: '2016-04-03T16:05:00Z'
		}
	];
}