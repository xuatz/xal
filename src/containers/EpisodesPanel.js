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
		switch(type) {
			case 'DOWN':
				return this.props.rateEpisode(this.props.animeId, this.props.episode.id, type);
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
					{this.props.episode.review
						? "Already rated"
						:
						<div>
							<ThumbsDown 	handleOnClick={this.handleOnClickEpisode} />
							<Meh 				handleOnClick={this.handleOnClickEpisode} />
							<ThumbsUp 		handleOnClick={this.handleOnClickEpisode} />
						</div>
					}
				</span>
			</div>
		);
	}
}

const ThumbsDown = (props) => {
	const onClickThumbsDown = () => {
		props.handleOnClick(EPISODE_REVIEW_TYPE_DOWN);
	}

	return (
		<span style={{padding:'5px'}}
			onClick={onClickThumbsDown} >
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