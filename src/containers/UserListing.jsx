import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'
import * as MyUtil from '../lib/util.js'

const mapStateToProps = (state) => {
	let { recentlyAired, upcomingSeries } = MyUtil.xuatzSeriesSortAndExtract(state.globalList);

	return {
		recentlyAired: recentlyAired,
		upcomingSeries: upcomingSeries
	};
}

const mapDispatchToProps = (dispatch) => {
	return {

	};
}

class UserListing extends React.Component {
	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div>
				<h2>My Watching List *WIP*</h2>
				<hr/>
				{this.props.recentlyAired.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="RECENTLY_AIRED" />;
					}
				)}
				{this.props.upcomingSeries.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="DEFAULT" />;
					}
				)}
			</div>
		);
	}
}

export const UserListingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListing);