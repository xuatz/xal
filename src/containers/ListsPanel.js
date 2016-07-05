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
};

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
};

const UserWatchList = (props) => {
	return (
		<div>
			<div style={{fontFamily:'serif', fontSize:'28px', fontWeight:'700'}} >
				My Watchlist
			</div>
			<hr/>
			{props.recentlyAired.map(function(item, index) {
				return <Anime key={index} type="RECENTLY_AIRED" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
			})}

			{props.upcomingSeries.length > 0 ?
				props.upcomingSeries.map(function(item, index) {
					return <Anime key={index} type="NORMAL" item={item} unixTimeStampMs={props.unixTimeStampMs} />;
				}) :
				"Your watchlist is empty!"
			}
		</div>
	);
};

const RemainingList = (props) => {
	return (
		<div>
			<div style={{fontFamily:'serif', fontSize:'28px', fontWeight:'700'}} >
				Remaining Series of this season
			</div>
			<hr/>

			{props.list.map(function(item, index) {
				return <Anime key={index} type="NORMAL" item={item} />;
			})}
		</div>
	);
};

class ListsPanel extends React.Component {
	constructor(props) {
		super();
		this.state = {
			unixTimeStampMs: moment().valueOf()
		};
		this.updateUnixTimestamp = this.updateUnixTimestamp.bind(this);
	}

	componentDidMount() {
		this.timer = setInterval(this.updateUnixTimestamp, 100); //60000 1min
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	updateUnixTimestamp() {
		this.setState({
			unixTimeStampMs: moment().valueOf()
		});
	}

	render() {
		return (
			<div>
				<UserWatchList unixTimeStampMs={this.state.unixTimeStampMs} recentlyAired={this.props.recentlyAired} upcomingSeries={this.props.upcomingSeries} />
				<br/>
				<RemainingList unixTimeStampMs={this.state.unixTimeStampMs} list={this.props.remainingSeries} />
			</div>
		);
	}
}

export const ListsPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsPanel);