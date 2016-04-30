import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {AnimeContainer} from './AnimeContainer'

const mapStateToProps = (state) => {
	return {
		//pair: state.getIn(['vote', 'pair']),
		// hasVoted: state.get('hasVoted'),
		// winner: state.get(['winner'])
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// onOptionClick: (index, status) => {
		// 	if (!status) {
		// 		dispatch(selectOption(index));
		// 	}
		// }
	};
}

//dumb / pure component
export class MyApplication extends React.Component {
	submit(event) {
		//TODO
	}

	render() {
		return (
			<AnimeListing />
		);
	}
}

class AnimeListing extends React.Component {
	render() {
		return (
			<div>
				<AnimeContainer />
			</div>
		);
	}
}

//smart / connected component
export const MyApplicationContainer = connect(
	mapStateToProps
)(MyApplication);