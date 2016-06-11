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
	constructor(props) {
		super();
		this.state = {
			activeStatsTab: 'overview'
		};
		this.handleOnClickTab = this.handleOnClickTab.bind(this);
	}

	handleOnClickTab(event) {
		this.setState({
			activeStatsTab: event.target.id
		});
	}

	renderStatsComponent(activeStatsTab) {
		switch(activeStatsTab) {
			case 'overview':
				return (
					<div>
						{this.props.list.map((item, index) => {
							return <Anime key={index} type="GLOBAL_STATS" item={item} />;
						})}
					</div>
				);
			case 'page2':
				return (
					<div style={{background:'pink', padding:'10px'}} >
						<div style={{background:'red'}}>
							<div>
								Most watched Animes
							</div>
							<div>
								*insert stats here*
							</div>
						</div>
						<div style={{background:'red'}}>
							<div>
								Most watched Animes
							</div>
							<div>
								*insert stats here*
							</div>
						</div>
					</div>
				);
		}
	}

	render() {
		return (
			<div>
				<div>
					<nav id='overview' onClick={this.handleOnClickTab}
						style={{display:'inline-block', padding:'10px 20px', margin:'10px 5px', background:'red'}}>
						Overview
					</nav>
					<nav id='page2' onClick={this.handleOnClickTab}
						style={{display:'inline-block', padding:'10px 20px', margin:'10px 5px', background:'red'}}>
						Stats Page Two
					</nav>
					<nav id='page3' onClick={this.handleOnClickTab}
						style={{display:'inline-block', padding:'10px 20px', margin:'10px 5px', background:'red'}}>
						Stats Page Three
					</nav>
				</div>

				<h2>Trending Series (past 7 days) *WIP* </h2>
				<hr/>

				<div style={{margin:'20px 0px', width:'100%', background:'pink'}} >
					{this.renderStatsComponent(this.state.activeStatsTab)}
				</div>
			</div>
		);
	}
}

export const TrendingSeriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrendingSeries);