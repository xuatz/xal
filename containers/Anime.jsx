import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ToolTip from 'react-portal-tooltip'

const trendingPanelWidth = '350px';
const trendingPanelHeight = '500px';
const upArrow = <img src='https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Up.png' width='12px' />;
const downArrow = <img src='https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Down.png' width='12px' />

const mapStateToProps = (state) => {
	return {

	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToWatchList: (id) => {
			console.log('dispatch addToWatchList');
			console.log('id', id);
			dispatch(
				{ type: 'WATCH_LIST_ADD_ITEM', id: id }
			);
		},
		removeFromWatchList: (id) => {
			console.log('dispatch removeFromWatchList');
			console.log('id', id);
			dispatch(
				{ type: 'WATCH_LIST_REMOVE_ITEM', id: id }
			);
		}
	};
}

class Anime extends React.Component {
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
						<span>
							Aired {7 - this.props.item.daysUntil} days ago.
						</span>

						<div style={styles.episodePanel} >
							<EpisodePanel episodes={this.props.item.episodes} />
						</div>
					</div>
				);
			default:
				return (
					<div>
						<span style={{padding:'0px 4px 0px'}}>
							{this.props.item.daysUntil} {(this.props.item.daysUntil == '1' || this.props.item.daysUntil == '0') ? 'day' : 'days'}
						</span>
						<span style={{padding:'0px 4px 0px'}}>
							{this.props.item.hoursUntil} {(this.props.item.hoursUntil == '1' || this.props.item.hoursUntil == '0') ? 'hr' : 'hrs'}
						</span>
						<span style={{padding:'0px 4px 0px'}}>
							{this.props.item.minutesUntil} {(this.props.item.minutesUntil == '1' || this.props.item.minutesUntil == '0') ? 'min' : 'mins'}
						</span>
						{/*<span style={{padding:'4px'}}>
							{this.props.item.secsUntil} {(this.props.item.secsUntil == '1' || this.props.item.secsUntil == '0') ? 'sec' : 'secs'}
						</span>*/}
						<span style={{padding:'0px 4px 0px'}}>
							until episode 5!
						</span>

						<div style={styles.episodePanel} >
							<EpisodePanel episodes={this.props.item.episodes} />
						</div>
					</div>
				);
		}
	}

	render() {
		console.log(this.props.item);

		return (
			<div style={this.props.type == 'GLOBAL_STATS' ? styles.globalStats : styles.default}>
				<div>
					<AnimeTitle
						id={this.props.item.id}
						title={this.props.item.title}
						type={this.props.type}
						addToWatchList={this.props.addToWatchList}
						removeFromWatchList={this.props.removeFromWatchList} />
				</div>

				{this.itemTypeRenderer(this.props.type)}
			</div>
		);
	}
}

const styles = {
	globalStats: {
		maxHeight: trendingPanelHeight,
		maxWidth: trendingPanelWidth,
		background: 'skyblue'
	},
	default: {
		maxHeight: trendingPanelHeight,
		background: 'skyblue'
	},
	episodePanel: {
		padding: '5px 20px'
	}
}

class EpisodePanel extends React.Component {
	constructor() {
		super();
		// this.state = {
		// 	isTooltipActive: false
		// }
	}

	render() {
		return (
			<div>
				{this.props.episodes ?
					this.props.episodes.map(function(item, index) {
						return <Episode episode={item} />;
					})
					: <span>Episode 1</span>
				}
			</div>
		);
	}
}

class Episode extends React.Component {
	render() {
		return (
			<div>
				<span>Episode {this.props.episode.title}</span>
			</div>
		);
	}
}

let activeId;
class AnimeTitle extends React.Component {
	constructor() {
		super();
		this.state = {
			isTooltipActive: false
		}
	}
	toggleTooltip(tooltipId) {
		if (tooltipId == activeId) {
			this.setState({isTooltipActive: !this.state.isTooltipActive});
		} else {
			this.setState({isTooltipActive: false});
			this.setState({isTooltipActive: true});
		}
		activeId = tooltipId;
	}
	addToWatching(addId) {
		//TODO consider to relocate logic to check if item already in watch list here?
		this.props.addToWatchList(addId);
		this.setState({isTooltipActive: false})
	}
	removeFromWatching(removeId) {
		//TODO consider to relocate logic to check if item dun exist in watch list here?
		this.props.removeFromWatchList(removeId);
		this.setState({isTooltipActive: false})
	}
	render() {
		let tooltipId = this.props.type + '-' + this.props.id;
		return (
			<div>
				<h4><span id={tooltipId} onClick={this.toggleTooltip.bind(this, tooltipId)}>
					{this.props.title}
				</span></h4>
				<ToolTip active={this.state.isTooltipActive} position="top" arrow="left"
					parent={"#" + this.props.type + '-' + this.props.id} tooltipTimeout={150} >
					<div>
						<div style={{margin:'0px 5px', float:'left'}}>
							<button onClick={this.addToWatching.bind(this, this.props.id)}>Add to watch list</button>
						</div>
						<div style={{margin:'0px 5px', float:'left'}}>
							<button onClick={this.removeFromWatching.bind(this, this.props.id)}>Remove from watch list</button>
						</div>
					</div>
				</ToolTip>
			</div>
		);
	}
}


//smart / connected component
export const AnimeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Anime);