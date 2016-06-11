import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Anime from '../components/Anime';
import * as MyUtil from '../lib/util.js';

const mapStateToProps = (state) => {
	let { recentlyAired, upcomingSeries } = MyUtil.xuatzSeriesSortAndExtract(MyUtil.getSeriesByIds(state.watchList, state.animes));
	let remainingSeries = MyUtil.getRemainingSeries(state.watchList, state.animes);

	return {
		recentlyAired: recentlyAired,
		upcomingSeries: upcomingSeries,
		remainingSeries: MyUtil.sortSeriesByAiringDateTime(remainingSeries)
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
}

const UserWatchList = (props) => {
	return (
		<div>
			<h2>My Watching List *WIP*</h2>
			<hr/>
			{props.recentlyAired.map(function(item, index) {
				return <Anime key={index} type="RECENTLY_AIRED" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
			})}

			{props.upcomingSeries.map(function(item, index) {
				return <Anime key={index} type="NORMAL" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
			})}
		</div>
	);
}

const RemainingList = (props) => {
	return (
		<div>
			<h2>Remaining Series of this season</h2>
			<hr/>

			{props.list.map(function(item, index) {
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

	updateUnixTimestamp() {
		this.setState({
			unixTimeStampMs: moment().valueOf()
		});
	}

	componentDidMount() {
		this.timer = setInterval(this.updateUnixTimestamp, 100); //60000 1min
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<div>
				<UserWatchList unixTimeStampMs={this.state.unixTimeStampMs} recentlyAired={this.props.recentlyAired} upcomingSeries={this.props.upcomingSeries} />
				<RemainingList unixTimeStampMs={this.state.unixTimeStampMs} list={this.props.remainingSeries} />
			</div>
		);
	}
}

export const ListsPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsPanel);