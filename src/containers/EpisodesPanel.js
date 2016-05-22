import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions'

const EPISODE_REVIEW_TYPE_UP = 'UP';
const EPISODE_REVIEW_TYPE_DOWN = 'DOWN';
const EPISODE_REVIEW_TYPE_MEH = 'MEH';

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		rateEpisode: (episodeId, review) => {
			dispatch(
				actions.rateEpisode(episodeId, review)
			);
		}
	};
};

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
						return <Episode episode={item} key={index} />;
					})
					: <span>Episode 1</span>
				}
			</div>
		);
	}
}

class Episode extends React.Component {
	handleOnClickEpisode(type) {
		console.log('handleOnClickEpisode');
		console.log('type', type);
		switch(type) {
			case 'DOWN':

				break;
			case 'UP':
				break;
			case 'MEH':
				break;
			default:
				console.log('type is undefined');
				break;
		}
	}
	render() {
		return (
			<div>
				<span>Episode {this.props.episode.title}</span>
				<span style={{float:'right'}} >
					<ThumbsDown 	handleOnClick={this.handleOnClickEpisode} />
					<Meh 				handleOnClick={this.handleOnClickEpisode} />
					<ThumbsUp 		handleOnClick={this.handleOnClickEpisode} />
				</span>
			</div>
		);
	}
}

const ThumbsDown = (props) => {
	return (
		<span style={{padding:'5px'}}
			onClick={props.handleOnClick.bind(this, EPISODE_REVIEW_TYPE_DOWN)} >
			ThumbsDown
		</span>
	);
}

const Meh = (props) => {
	return (
		<span style={{padding:'5px'}}
			onClick={props.handleOnClick.bind(this, EPISODE_REVIEW_TYPE_MEH)} >
			Meh
		</span>
	);
}

const ThumbsUp = (props) => {
	return (
		<span style={{padding:'5px'}}
			onClick={props.handleOnClick.bind(this, EPISODE_REVIEW_TYPE_UP)} >
			ThumbsUp
		</span>
	);
}

//smart / connected component
export const EpisodesPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EpisodesPanel);