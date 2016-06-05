import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Anime from '../components/Anime';
import * as MyUtil from '../lib/util.js';

const mapStateToProps = (state) => {
	return {
		currentSeasonSeries: state.animes, //actual anime full details
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
				return <Anime key={index} type="RECENTLY_AIRED" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
			})}

			{upcomingSeries.map(function(item, index) {
				return <Anime key={index} type="NORMAL" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
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
	constructor(props) {
		super();
		this.state = {
			unixTimeStampMs: moment().valueOf()
		}
		this.updateUnixTimestamp = this.updateUnixTimestamp.bind(this);
	}

	getWatchList(watchList, currentSeasonSeries) {
		return MyUtil.getSeriesByIds(watchList, currentSeasonSeries);
	}
	getRemainingSeries(watchList, currentSeasonSeries) {
		return MyUtil.getRemainingSeries(watchList, currentSeasonSeries);
	}

	updateUnixTimestamp() {
		this.setState({
			unixTimeStampMs: moment().valueOf()
		});
	}

	componentDidMount() {
		this.timer = setInterval(this.updateUnixTimestamp, 100); //60000 1min

		// var TestObject = Parse.Object.extend("TestObject");
		// var testObject = new TestObject();
		// testObject.save({foo: "bar"}).then(function(object) {
		// 	alert("yay! it worked");
		// });
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<div>
				<UserWatchList list={this.getWatchList(this.props.watchList, this.props.currentSeasonSeries)} unixTimeStampMs={this.state.unixTimeStampMs}  />
				<RemainingList list={this.getRemainingSeries(this.props.watchList, this.props.currentSeasonSeries)} unixTimeStampMs={this.state.unixTimeStampMs} />
			</div>
		);
	}
}

export const ListsPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsPanel);