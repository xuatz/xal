import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ToolTip from 'react-portal-tooltip'

import * as MyUtil from '../lib/util.js';

import {EpisodesPanelContainer} from './EpisodesPanel'

const upArrow = <img src='https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Up.png' width='12px' />;
const downArrow = <img src='https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Down.png' width='12px' />

const mapStateToProps = (state) => {
	return {

	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
}

class AnimeCardBody extends React.Component {
	constructor(props) {
		super();
		this.state = {
			duration: props.item.duration
		};
		this.updateCountdown = this.updateCountdown.bind(this);
	}

	componentWillMount() {
		this.updateCountdown();
		this.timer = setInterval(this.updateCountdown, 1000); //1000 => 1s
	}
	updateCountdown() {
		if (this.state.duration) {
			let duration = moment.duration(this.state.duration).subtract(1, 's');

			if (duration && Math.floor(duration.asDays()) < 0) {
				duration = this.props.item.duration
			}

			this.setState({
				duration: duration,
				daysUntil: Math.floor(duration.asDays()),
				hoursUntil: Math.floor(duration.hours()),
				minutesUntil: Math.floor(duration.minutes()),
				secsUntil: Math.floor(duration.seconds())
			});
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	itemTypeRenderer(type) {
		switch(this.props.type) {
			case 'GLOBAL_STATS':
				return (
					<div style={{background:'orange'}} >
						<div style={{display:'inline-block'}} >
							<div style={{float: 'left', width:'50%'}}>
								<div style={{margin:'10px'}} >
									<img src={this.props.item.thumbnail} style={{width:'100%'}} alt="thumbnail" />
								</div>
							</div>
							<div style={{float: 'left', width:'50%'}}>
								<p>
									<b>#TODO needz help on designing what stats to show and how to present them</b>
								</p>
								<p>*sample*85% of the people who watched this liked the latest episode!</p>
								<p>*sample*Watched by 23957 people!</p>
								<p>
									*sample* Rank {upArrow}3(5)
								</p>
							</div>
						</div>
					</div>
				);
			case 'RECENTLY_AIRED':
				return (
					<div>
						<span>
							Aired {moment(this.props.item.lastAiredDate).fromNow()}.
						</span>

						<div style={{padding: '5px 20px'}} >
							<EpisodesPanelContainer animeId={this.props.item.id} episodes={MyUtil.sortEpisodesByEpisodeNumber(this.props.item.episodes, true)} />
						</div>
					</div>
				);
			default:
				return (
					<div>
						<span style={{padding:'0px 2px 0px'}}>
							{this.state.daysUntil} {(this.props.item.daysUntil == '1' || this.props.item.daysUntil == '0') ? 'day' : 'days'}
						</span>
						<span style={{padding:'0px 2px 0px'}}>
							{this.state.hoursUntil} {(this.props.item.hoursUntil == '1' || this.props.item.hoursUntil == '0') ? 'hr' : 'hrs'}
						</span>
						<span style={{padding:'0px 2px 0px'}}>
							{this.state.minutesUntil} {(this.props.item.minutesUntil == '1' || this.props.item.minutesUntil == '0') ? 'min' : 'mins'}
						</span>
						<span style={{padding:'0px 2px 0px'}}>
							{this.state.secsUntil} {(this.props.item.secsUntil == '1' || this.props.item.secsUntil == '0') ? 'sec' : 'secs'}
						</span>
						<span style={{padding:'0px 2px 0px'}}>
							until episode 5!
						</span>
					</div>
				);
		}
	}

	render() {
		return (
			<div>
				{this.itemTypeRenderer(this.props.type)}
			</div>
		);
	}
}

//smart / connected component
export const AnimeCardBodyContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnimeCardBody);