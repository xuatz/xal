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

class Anime extends React.Component {

	demo(type) {
		switch(this.props.type) {
			//TODO rename this key??
			case 'GLOBAL_STATS':
				return (
					<div>
						<p>
							#TODO put some exciting stats here
						</p>
						<p>
							85% of the watchers liked the latest episode!
						</p>
						<p>
							Ranked #3
						</p>
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
							until next episode!
						</span>
					</div>
				);
		}
	}

	render() {
		return (
			<div>
				<div>
					<h4>
						{this.props.item.title}
					</h4>
				</div>
				<div>
					{ this.demo(this.props.type) }
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