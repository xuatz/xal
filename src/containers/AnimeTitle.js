import React from 'react';
import { connect } from 'react-redux';

import ToolTip from 'react-portal-tooltip';
import Parse from 'parse';

import * as db from '../lib/db';

const mapStateToProps = (state) => {
	return {
		
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToWatchList: (id) => {
			dispatch(
				{ type: 'WATCH_LIST_ADD_ITEM', id: id }
			);
			db.watchListAddItem(id);
		},
		removeFromWatchList: (id) => {
			dispatch(
				{ type: 'WATCH_LIST_REMOVE_ITEM', id: id }
			);
			db.watchListRemoveItem(id);
		},
		updateNextEpisodeDttm: () => {
			dispatch(
				{ type: 'UPDATE_NEXT_EPISODE_DTTM' }
			);
		}
	};
}

let activeId;
class AnimeTitle extends React.Component {
	constructor() {
		super();
		this.state = {
			isTooltipActive: false
		}
		this.toggleTooltip = this.toggleTooltip.bind(this);
		this.addToWatching = this.addToWatching.bind(this);
		this.removeFromWatching = this.removeFromWatching.bind(this);
	}
	toggleTooltip() {
		const tooltipId = this.props.type + '-' + this.props.id;
		if (tooltipId == activeId) {
			this.setState({isTooltipActive: !this.state.isTooltipActive});
		} else {
			this.setState({isTooltipActive: true});
		}
		activeId = tooltipId;
	}
	addToWatching() {
		this.setState({isTooltipActive: false})
		this.props.addToWatchList(this.props.id);
		this.props.updateNextEpisodeDttm();
	}
	removeFromWatching() {
		this.setState({isTooltipActive: false})
		this.props.removeFromWatchList(this.props.id);
		this.props.updateNextEpisodeDttm();
	}
	render() {
		const tooltipId = this.props.type + '-' + this.props.id;
		return (
			<div>
				<h4><span id={tooltipId} onClick={this.toggleTooltip}>
					{this.props.title}
				</span></h4>
				<ToolTip active={this.state.isTooltipActive} position="top" arrow="left"
					parent={"#" + this.props.type + '-' + this.props.id} tooltipTimeout={150} >
					<div>
						<div style={{margin:'0px 5px', float:'left'}}>
							<button onClick={this.addToWatching}>Add to watch list</button>
						</div>
						<div style={{margin:'0px 5px', float:'left'}}>
							<button onClick={this.removeFromWatching}>Remove from watch list</button>
						</div>
					</div>
				</ToolTip>
			</div>
		);
	}
}

export const AnimeTitleContainer = connect(
	mapStateToProps,
    mapDispatchToProps
)(AnimeTitle);