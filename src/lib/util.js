import _ from 'lodash';
import moment from 'moment';

const pad = (n, width, z) => {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const getTrendingAnimes = (series = []) => {
	var filtered = _.filter(series, (item) => {
		if (moment().diff(moment(item.startDate), 'months') < 6) {
			return true;
		}
		return false;
	});

	let sorted = filtered.sort(function(a, b){
		if (a.anilistPopularity < b.anilistPopularity) {
			// if (reverse) {
			// 	return -1;
			// }
			return 1;
		}

		if (a.anilistPopularity > b.anilistPopularity) {
			// if (reverse) {
			// 	return 1;
			// }
			return -1;
		}

		return 0;
	});
	return sorted.slice(0, 6);
}


export const sortEpisodesByEpisodeNumber = (episodes, reverse = false) => {
	if (episodes) {
		return episodes.sort((a, b) => {
			if (a.episodeNumber > b.episodeNumber) {
				if (reverse) {
					return -1;
				}
				return 1;
			}
			if (a.episodeNumber < b.episodeNumber) {
				if (reverse) {
					return 1;
				}
				return -1;
			}
			return 0;
		});
	}
};

//TODO write test unit
//What if series size = 0
export const sortSeriesByAiringDateTime = (series = [], reverse = false) => {
	//TODO need to check if function mutates original state; it should not.
	return series.sort(function(a, b){
		if (moment(a.nextEpisodeDttm).isAfter(b.nextEpisodeDttm)) {
			if (reverse) {
				return -1;
			}
			return 1;
		}

		if (moment(a.nextEpisodeDttm).isBefore(b.nextEpisodeDttm)) {
			if (reverse) {
				return 1;
			}
			return -1;
		}

		return 0;
	});
};

//TODO write test unit
export const xuatzSeriesSortAndExtract = (series, reverse = false) => {
	let sorted = sortSeriesByAiringDateTime(series);

	let upcomingSeries = [];
	let recentlyAired = [];

	if (sorted.length > 1) {
		let marker = Math.floor(0.7 * sorted.length);
		upcomingSeries = sorted.slice(0, marker);
		recentlyAired = sorted.slice(marker);
	} else {
		upcomingSeries = sorted;
	}

	return {
		recentlyAired: recentlyAired,
		upcomingSeries: upcomingSeries
	};
};

export const getSeriesByIds = (watchList, currentSeasonSeries)  => {
	if (watchList) {
		let res2 = watchList.map((id) => {
			let res = _.find(currentSeasonSeries, (item) => {
				return item.objectId == id;
			});

			if (res) {
				return res;
			}
		});

		return res2;
	}
};

export const getRemainingSeries = (watchList, currentSeasonSeries) => {
	let filtered = currentSeasonSeries;
	if (watchList) {
		for (let id of watchList) {
			filtered = _.filter(filtered, (item) => {
				return item.objectId != id;
			});
		}
	}
	return filtered;
};