import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'
import * as MyUtil from '../lib/util.js'

const mapStateToProps = (state) => {
	return {
		currentSeasonSeries: state.myApplication.currentSeasonSeries,
		watchList: state.myApplication.watchList
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
    getRemainingSeries(watchList) {
    	//TODO STUB
    }

    getWatchList(watchList, currentSeasonSeries) {
    	return MyUtil.getSeriesByIds(watchList, currentSeasonSeries) || [];
    }

	render() {
		return (
			<div>
				<UserWatchList list={this.getWatchList(this.props.watchList, this.props.currentSeasonSeries)} />
				<RemainingList list={this.getRemainingSeries(this.props.watchList)} />
			</div>
		);
	}
}

class UserWatchList extends React.Component {
	render() {
		return (
			<div>
				<h2>My Watching List *WIP*</h2>
				<hr/>

				{this.props.list.map(
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
		return (
			<div>


			</div>
		)
	}
}

export const ListsPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListsPanel);