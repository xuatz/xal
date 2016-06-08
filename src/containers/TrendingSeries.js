import React from 'react';
import { connect } from 'react-redux';

import Anime from '../components/Anime';

const mapStateToProps = (state) => {
	return {

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

export const TrendingSeriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrendingSeries);