import React from 'react';
import { connect } from 'react-redux';

import Anime from '../components/Anime';
import * as MyUtil from '../lib/util.js';

import {TrendingSeriesContainer} from './TrendingSeries';

const mapStateToProps = (state) => {
	//TODO do i need to mapStateToProps? why not just state directly
	//but considering i need to do some manipulation, is this justified?
	//honestly tho, i can do it in the component render() function, is that better?
	let { recentlyAired, upcomingSeries } = MyUtil.xuatzSeriesSortAndExtract(state.animes);

	return {
		recentlyAired: recentlyAired,
		upcomingSeries: upcomingSeries
	};
}

const mapDispatchToProps = (dispatch) => {
	return {

	};
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
				<div style={{display:'inline-block', width:'100%'}} >
					<TrendingSeriesContainer list={this.props.recentlyAired} />
				</div>
				<div style={{display:'inline-block', width:'100%'}} >
					<SeasonalPerformers list={this.props.upcomingSeries} />
				</div>
			</div>
		);
	}
}

export const StatsPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatsPanel);