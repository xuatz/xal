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
		tick: () => {
			console.log('xz: ticked!!');
			let airingDateTime = moment("2016-04-04 0105 +09:00", "YYYY-MM-DD hmm Z");

	  		// let now = moment();
			// let dayDiff = airingDateTime.diff(now, 'days');

			// while(dayDiff < 0) {
			// 	airingDateTime.add(7, 'days');
			// 	dayDiff = airingDateTime.diff(now, 'days');
			// }

			// this.daysUntil = Math.floor(moment.duration(airingDateTime.diff(now)).asDays());
			// this.hoursUntil = Math.floor(moment.duration(airingDateTime.diff(now)).hours());
			// this.minutesUntil = moment.duration(airingDateTime.diff(now)).minutes();

			dispatch(updateCountdown(airingDateTime));
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
		console.log('test1');
		this.props.tick();
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        console.log('test2');
        this.timer = setInterval(this.props.tick, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	render() {
		return (
			<div>
				<h4>
					Re:Zero kara Hajimeru Isekai Seikatsu
				</h4>
				<span>
					{this.props.daysUntil}{(this.props.daysUntil == '1' || this.props.daysUntil == '0') ? 'day' : 'days'}
				</span>
				<span>
					{this.props.hoursUntil}{(this.props.hoursUntil == '1' || this.props.hoursUntil == '0') ? 'hr' : 'hrs'}
				</span>
				<span>
					{this.props.minutesUntil}{(this.props.minutesUntil == '1' || this.props.minutesUntil == '0') ? 'min' : 'mins'} until next episode!
				</span>
			</div>
		);
	}	
}

//smart / connected component
export const AnimeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Anime);