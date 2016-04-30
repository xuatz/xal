import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		//pair: state.getIn(['vote', 'pair']),
		// hasVoted: state.get('hasVoted'),
		// winner: state.get(['winner'])
	};
}

//dumb / pure component
export class MyApplication extends React.Component {
	submit(event) {
		//TODO
	}

	render() {
		return (
			<div>
				<span>huat ah</span>
			</div>
		);
	}
}

//smart / connected component
export const MyApplicationContainer = connect(
	mapStateToProps
)(MyApplication);