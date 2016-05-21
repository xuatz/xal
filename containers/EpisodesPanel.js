import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {

	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
}

class EpisodesPanel extends React.Component {
	constructor() {
		super();
		// this.state = {
		// 	isTooltipActive: false
		// }
	}

	render() {
		return (
			<div>
				{this.props.episodes ?
					this.props.episodes.map(function(item, index) {
						return <Episode episode={item} />;
					})
					: <span>Episode 1</span>
				}
			</div>
		);
	}
}

class Episode extends React.Component {
	render() {
		return (
			<div>
				<span>Episode {this.props.episode.title}</span>
			</div>
		);
	}
}

//smart / connected component
export const EpisodesPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EpisodesPanel);