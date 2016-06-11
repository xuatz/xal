export const FETCH_CURRENT_SEASON_SERIES = 'FETCH_CURRENT_SEASON_SERIES';
export const RATE_SERIES_EPISODE = 'RATE_SERIES_EPISODE';

export const fetchCurrentSeasonAnime = (animeList) => {
	return {type: 'FETCH_CURRENT_SEASON_SERIES', animeList: animeList};
};

export const rateEpisode = (animeId, episodeId, review) => {
	return {
		type: RATE_SERIES_EPISODE,
		animeId: animeId,
		episodeId: episodeId,
		review: review
	};
};

export const hydrateStore = (state) => {
	return {
		type: 'HYDRATE_STORE',
		state: state
	};
};