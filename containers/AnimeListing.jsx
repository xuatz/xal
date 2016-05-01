import React from 'react';
import { connect } from 'react-redux';

import {AnimeContainer} from './Anime'

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


const mapStateToProps = (state) => {
	return {
		series: state.animeListing.sort(function(a, b){
			let valueA = '' + a.daysUntil + pad(a.hoursUntil, 2) + pad(a.minutesUntil, 2);
			let valueB = '' + b.daysUntil + pad(b.hoursUntil, 2) + pad(b.minutesUntil, 2);

			if (parseInt(valueA) > parseInt(valueB)) {
				return 1;
			}

			if (parseInt(valueA) < parseInt(valueB)) {
				return -1;
			}

			return 0;
		})
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

class AnimeListing extends React.Component {
	componentDidMount() {
		const update = this.props.updateCountdown();
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
				{this.props.series.map(
					function(item, index) {
						return <AnimeContainer item={item} key={index} />;
					}
				)}
			</div>
		);
	}
}

export const AnimeListingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnimeListing);