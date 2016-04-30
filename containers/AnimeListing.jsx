import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'

class AnimeListing extends React.Component {
	render() {
		return (
			<div>
				{this.props.series.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} />;
					}
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		_updateCountdown: (airingDateTime) => {
			//TODO update all the children
			//dispatch(updateCountdown(moment(airingDateTime)));
		}
	};
}

export const AnimeListingContainer = connect(
    mapDispatchToProps
)(AnimeListing);