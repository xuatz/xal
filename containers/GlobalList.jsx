import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'
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

class GlobalList extends React.Component {
	render() {
		return (
			<div>
				<div style={{background: 'pink'}}>
					<h3>Trending Series (past 7 days)</h3>
					<div style={{display:'inline-block'}}>
						{this.props.recentlyAired.map(
							function(item, index) {
								return (
									<div key={index} style={{float:'left', margin:'0px 20px', background:'blue'}} >
										<AnimeContainer item={item} key={index} type="GLOBAL_STATS" />
									</div>
								);
							}
						)}
					</div>
				</div>
				<div>
					<hr/>
				</div>
				<div style={{background: 'orange'}}>
					<h3>Top Rated Series of the Season (reset every quarter/season)</h3>
					{this.props.upcomingSeries.map(
						function(item, index) {
							return <AnimeContainer item={item} key={index} type="DEFAULT" />;
						}
					)}
				</div>
			</div>
		);
	}
}

export const GlobalListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalList);