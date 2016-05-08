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
		updateCountdown: () => {
			dispatch(
				{ type: 'UPDATE_COUNTDOWN' }
			);
		}
	};
}

class GlobalList extends React.Component {
	componentDidMount() {
		this.props.updateCountdown();
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.props.updateCountdown, 60000); //60000
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	render() {
		return (
			<div>
				<div style={{background:'red'}} >
					<h3>Trending Series (past 7 days)</h3>
					<div style={{display:'inline-block', background:'pink'}}>
						{this.props.recentlyAired.map(
							function(item, index) {
								return (
									<div style={{float:'left', margin:'0px 20px', background:'BLUE'}} >
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
				<div style={{background:'orange'}} >
					<h3>Top Rated Series of the Season (reset every quarter/season)</h3>
					{this.props.upcomingSeries.map(
						function(item, index) {
							return <AnimeContainer item={item} key={index} />;
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