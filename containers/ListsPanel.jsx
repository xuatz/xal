import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'
import * as MyUtil from '../lib/util.js'

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

class ListsPanel extends React.Component {
    getRemainingSeries(watchList, currentSeasonSeries) {
    	let res = MyUtil.getRemainingSeries(watchList, currentSeasonSeries);
    	return res || [];
    }

    getWatchList(watchList, currentSeasonSeries) {
    	return MyUtil.getSeriesByIds(watchList, currentSeasonSeries) || [];
    }

	render() {
		return (
			<div>
				<UserWatchList list={this.getWatchList(this.props.watchList, this.props.currentSeasonSeries)} />
				<RemainingList list={this.getRemainingSeries(this.props.watchList, this.props.currentSeasonSeries)} />
			</div>
		);
	}
}

class UserWatchList extends React.Component {
	render() {
		let { recentlyAired, upcomingSeries } = MyUtil.xuatzSeriesSortAndExtract(this.props.list);

		return (
			<div>
				<h2>My Watching List *WIP*</h2>
				<hr/>

				{recentlyAired.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="RECENTLY_AIRED" />; //RECENTLY_AIRED
					}
				)}

				{upcomingSeries.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="NORMAL" />; //RECENTLY_AIRED
					}
				)}
			</div>
		)
	}
}


/*


{this.props.upcomingSeries.map(
	function(item, index) {
		return <AnimeContainer item={item} key={index} type="DEFAULT" />;
	}
)}

*/

class RemainingList extends React.Component {
	render() {
		let remaining = MyUtil.sortSeriesByAiringDateTime(this.props.list);

		return (
			<div>
				<h2>Remaining Series of this season</h2>
				<hr/>

				{remaining.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} type="NORMAL" />; //RECENTLY_AIRED
					}
				)}


			</div>
		)
	}
}

export const ListsPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListsPanel);