import React from 'react';
import { connect } from 'react-redux';

import Anime from '../components/Anime';
import * as MyUtil from '../lib/util.js'

const mapStateToProps = (state) => {
	//TODO do i need to mapStateToProps? why not just state directly
	//but considering i need to do some manipulation, is this justified?
	//honestly tho, i can do it in the component render() function, is that better?
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

class TrendingSeries extends React.Component {
	render() {
		return (
			<div>
				<h2>Trending Series (past 7 days) - (*WIP* Outdated data source!! pending update)</h2>
				<hr/>
				{this.props.list.map((item, index) => {
					return <Anime key={index} type="GLOBAL_STATS" item={item} />;
				})}
			</div>
		);
	}
}

class SeasonalPerformers extends React.Component {
	render() {
		return (
			<div>
				<h2>Top Rated Series of the Season (reset every quarter/season)</h2>
				<hr />
				{this.props.list.map((item, index) => {
					return <Anime key={index} type="DEFAULT" item={item} />;
				})}
			</div>
		);
	}
}

class StatsPanel extends React.Component {
	render() {
		return (
			<div>
				<TrendingSeries list={this.props.recentlyAired} />
				<SeasonalPerformers list={this.props.upcomingSeries} />
			</div>
		);
	}
}

export const StatsPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatsPanel);