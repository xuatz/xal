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
		rateEpisode: (animeId, episodeId, review) => {
			dispatch(
				actions.rateEpisode(animeId, episodeId, review)
			);
		}
	};
};

class EpisodesPanel extends React.Component {
	constructor() {
		super();
		// console.log('this.props.animeId', this.props.animeId);
	}

	render() {
		let self = this;
		return (
			<div>
				{this.props.episodes ?
					this.props.episodes.map(function(item, index) {
						return <Episode animeId={self.props.animeId} episode={item} key={index} rateEpisode={self.props.rateEpisode} />;
					})
					: <span>Episode 1</span>
				}
			</div>
		);
	}
}

class Episode extends React.Component {
	constructor() {
		super();
		this.handleOnClickEpisode = this.handleOnClickEpisode.bind(this);
	}

	handleOnClickEpisode(type) {
		if (type == undefined) {
			console.log('type is undefined');
		}
		return this.props.rateEpisode(this.props.animeId, this.props.episode.id, type);
	}
	render() {
		return (
			<div>
				<span>Episode {this.props.episode.title}</span>
				<span style={{float:'right'}} >
					{this.props.episode.review
						? "Already rated"
						:
						<div>
							<ThumbsDown 	handleOnClick={this.handleOnClickEpisode} />
							<Meh 			handleOnClick={this.handleOnClickEpisode} />
							<ThumbsUp 		handleOnClick={this.handleOnClickEpisode} />
						</div>
					}
				</span>
			</div>
		);
	}
}

const ThumbsDown = (props) => {
	const handleOnClick = () => {
		props.handleOnClick(EPISODE_REVIEW_TYPE_DOWN);
	}

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			ThumbsDown
		</span>
	);
}

const Meh = (props) => {
	const handleOnClick = () => {
		props.handleOnClick(EPISODE_REVIEW_TYPE_MEH);
	}

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			Meh
		</span>
	);
}

const ThumbsUp = (props) => {
	const handleOnClick = () => {
		props.handleOnClick(EPISODE_REVIEW_TYPE_UP);
	}

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			ThumbsUp
		</span>
	);
}

//smart / connected component
export const EpisodesPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EpisodesPanel);