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
		updateCountdown: () => {
			dispatch(
				{ type: 'UPDATE_COUNTDOWN' }
			);
		}
	};
}

class UserListing extends React.Component {
	componentDidMount() {
		this.props.updateCountdown();
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.props.updateCountdown, 60000); //60000
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	render() {
		return (
			<div>
				{this.props.recentlyAired.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="RECENTLY_AIRED" />;
					}
				)}
				{this.props.upcomingSeries.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} />;
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