import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => {
	return {
		daysUntil: state.animeContainer.daysUntil,
		hoursUntil: state.animeContainer.hoursUntil,
		minutesUntil: state.animeContainer.minutesUntil
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		_updateCountdown: (airingDateTime) => {
			dispatch(updateCountdown(moment(airingDateTime)));
		}
	};
}

//xz: an action creator
function updateCountdown(airingDateTime) {
	return {
		type: 'UPDATE_COUNTDOWN',
		airingDateTime: airingDateTime
	}
}

class Anime extends React.Component {
	componentDidMount() {
		const update = this.props._updateCountdown(this.props.item.airingDateTime);
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(update, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	render() {
		return (
			<div>
				<h4>
					{this.props.item.title}
				</h4>
				<div>
					<span style={{padding:'4px'}}>
						{this.props.daysUntil} {(this.props.daysUntil == '1' || this.props.daysUntil == '0') ? 'day' : 'days'}
					</span>
					<span style={{padding:'4px'}}>
						{this.props.hoursUntil} {(this.props.hoursUntil == '1' || this.props.hoursUntil == '0') ? 'hr' : 'hrs'}
					</span>
					<span style={{padding:'4px'}}>
						{this.props.minutesUntil} {(this.props.minutesUntil == '1' || this.props.minutesUntil == '0') ? 'min' : 'mins'}
					</span>
					<span style={{padding:'4px'}}>
						until next episode!
					</span>
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