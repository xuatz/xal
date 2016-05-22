export const FETCH_CURRENT_SEASON_SERIES = 'FETCH_CURRENT_SEASON_SERIES';
export const RATE_SERIES_EPISODE = 'RATE_SERIES_EPISODE';

export const fetchCurrentSeasonAnime = () => {
	return {type: 'FETCH_CURRENT_SEASON_SERIES'};
};

export const rateEpisode = (episodeId, review) => {
	return {
		type: RATE_SERIES_EPISODE,
		id: episodeId,
		review: review
	};
};