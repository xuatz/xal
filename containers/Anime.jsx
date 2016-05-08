import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => {
	return {
		// daysUntil: state.animeListing.daysUntil,
		// hoursUntil: state.animeContainer.hoursUntil,
		// minutesUntil: state.animeContainer.minutesUntil
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// _updateCountdown: (airingDateTime) => {
		// 	dispatch(updateCountdown(moment(airingDateTime)));
		// }
	};
}

const trendingPanelWidth = '400px';
const trendingPanelHeight = '360px';

class Anime extends React.Component {

	itemTypeRenderer(type) {
		switch(this.props.type) {
			//TODO rename this key??
			case 'GLOBAL_STATS':
				return (
					<div style={{width: trendingPanelWidth, height: trendingPanelHeight, background:'purple'}} >
						<div style={{display:'inline-block', background:'lightgreen'}} >
							<div style={{float: 'left', background:'orange', width:'50%'}}>
								<div style={{margin:'10px'}} >
									<img src={this.props.item.thumbnail} style={{width:'100%'}} alt="thumbnail" />
								</div>
							</div>
							<div style={{float: 'left', background:'lightblue' , width:'50%'}}>
								<p style={{background:'lightyellow'}}>
									<b>#TODO needz help on designing what stats to show and how to present them</b>
								</p>
								<p>*sample*85% of the people who watched this liked the latest episode!</p>
								<p>*sample*Watched by 23957 people!</p>
								<p>*sample*Ranked #3</p>
								<p>*sample*Moved up 2 places from last week (#5)</p>
							</div>
						</div>
						{/*<div style={{background:'grey'}}>
							<p>
								#TODO placeholder area
							</p>
						</div>*/}
					</div>
				);
			case 'RECENTLY_AIRED':
				return (
					<div>
						<p>
							Aired {7 - this.props.item.daysUntil} days ago.
						</p>
					</div>
				);
			default:
				return (
					<div>
						<span style={{padding:'4px'}}>
							{this.props.item.daysUntil} {(this.props.item.daysUntil == '1' || this.props.item.daysUntil == '0') ? 'day' : 'days'}
						</span>
						<span style={{padding:'4px'}}>
							{this.props.item.hoursUntil} {(this.props.item.hoursUntil == '1' || this.props.item.hoursUntil == '0') ? 'hr' : 'hrs'}
						</span>
						<span style={{padding:'4px'}}>
							{this.props.item.minutesUntil} {(this.props.item.minutesUntil == '1' || this.props.item.minutesUntil == '0') ? 'min' : 'mins'}
						</span>
						<span style={{padding:'4px'}}>
							until episode 5!
						</span>
					</div>
				);
		}
	}

	render() {
		return (
			<div style={{width: trendingPanelWidth, maxHeight: trendingPanelHeight}}>
				<div>
					<h4>{this.props.item.title}</h4>
				</div>
				<div>
					{this.itemTypeRenderer(this.props.type)}
				</div>
			</div>
		);
	}
}

//smart / connected component
export const AnimeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Anime);