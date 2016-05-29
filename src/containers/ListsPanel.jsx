import React from 'react';
import { connect } from 'react-redux';

import Anime from '../components/Anime';
import * as MyUtil from '../lib/util.js';

const mapStateToProps = (state) => {
	return {
		currentSeasonSeries: state.myApplication.currentSeasonSeries, //actual anime full details
		watchList: state.myApplication.watchList //arr of ids
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getRemainingSeries: (watchList) => {
			dispatch(
				{ type: 'GET_REMAINING_SERIES' }
			);
		}
	};
}

const UserWatchList = (props) => {
	let { recentlyAired, upcomingSeries } = MyUtil.xuatzSeriesSortAndExtract(props.list);

	return (
		<div>
			<h2>My Watching List *WIP*</h2>
			<hr/>
			{recentlyAired.map(function(item, index) {
				return <Anime key={index} type="RECENTLY_AIRED" item={item} />;
			})}

			{upcomingSeries.map(function(item, index) {
				return <Anime key={index} type="NORMAL" item={item} />;
			})}
		</div>
	);
}

const RemainingList = (props) => {
	let remaining = MyUtil.sortSeriesByAiringDateTime(props.list);
	return (
		<div>
			<h2>Remaining Series of this season</h2>
			<hr/>

			{remaining.map(function(item, index) {
				return <Anime key={index} type="NORMAL" item={item} />;
			})}
		</div>
	);
}

class ListsPanel extends React.Component {
    getRemainingSeries(watchList, currentSeasonSeries) {
    	return MyUtil.getRemainingSeries(watchList, currentSeasonSeries);
    }

    getWatchList(watchList, currentSeasonSeries) {
    	return MyUtil.getSeriesByIds(watchList, currentSeasonSeries);
    }

	render() {
		return (
			<div>
				<UserWatchList list={this.getWatchList(this.props.watchList, this.props.currentSeasonSeries)} addToWatchList={this.props.addToWatchList} removeFromWatchList={this.props.removeFromWatchList} />
				<RemainingList list={this.getRemainingSeries(this.props.watchList, this.props.currentSeasonSeries)} addToWatchList={this.props.addToWatchList} removeFromWatchList={this.props.removeFromWatchList} />
			</div>
		);
	}
}

export const ListsPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListsPanel);