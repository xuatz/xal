import React from 'react';

import {AnimeTitleContainer} from '../containers/AnimeTitle';
import {AnimeCardBodyContainer} from '../containers/AnimeCardBody';

const Anime = (props) => {
	return (
		<div style={props.type == 'GLOBAL_STATS' ? styles.globalStats : styles.default}>
			<AnimeTitleContainer id={props.item.id} title={props.item.title} type={props.type} />
			<AnimeCardBodyContainer item={props.item} type={props.type} unixTimeStampMs={props.unixTimeStampMs} />
		</div>
	);
};

const trendingPanelWidth = '350px';
const trendingPanelHeight = '500px';
const styles = {
	globalStats: {
		maxHeight: trendingPanelHeight,
		maxWidth: trendingPanelWidth,
		background: 'skyblue',
		display:'inline-block', 
		margin:'0px 10px 10px 0px'
	},
	default: {
		maxHeight: trendingPanelHeight,
		background: 'skyblue'
	}
};

export default Anime;