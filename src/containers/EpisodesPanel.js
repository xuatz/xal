import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const EPISODE_REVIEW_TYPE_UP = 'UP';
const EPISODE_REVIEW_TYPE_DOWN = 'DOWN';
const EPISODE_REVIEW_TYPE_MEH = 'MEH';

const mapStateToProps = (state) => {
	return {

	};
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



const Episode = (props) => {
	const handleOnClickEpisode = (type) => {
		if (type == undefined) {
			console.log('type is undefined');
		}
		return props.rateEpisode(props.animeId, props.episode.id, type);
	};

	return (
		<div>
			<span>Episode {props.episode.title}</span>
			<span style={{float:'right'}} >
				{props.episode.review
					? "Already rated"
					:
					<div>
						<ThumbsDown 	onClick={handleOnClickEpisode} />
						<Meh 			onClick={handleOnClickEpisode} />
						<ThumbsUp 		onClick={handleOnClickEpisode} />
					</div>
				}
			</span>
		</div>
	);
};

const ThumbsDown = (props) => {
	const handleOnClick = () => {
		props.onClick(EPISODE_REVIEW_TYPE_DOWN);
	};

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			ThumbsDown
		</span>
	);
};

const Meh = (props) => {
	const handleOnClick = () => {
		props.onClick(EPISODE_REVIEW_TYPE_MEH);
	};

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			Meh
		</span>
	);
};

const ThumbsUp = (props) => {
	const handleOnClick = () => {
		props.onClick(EPISODE_REVIEW_TYPE_UP);
	};

	return (
		<span style={{padding:'5px'}} onClick={handleOnClick} >
			ThumbsUp
		</span>
	);
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

//smart / connected component
export const EpisodesPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EpisodesPanel);