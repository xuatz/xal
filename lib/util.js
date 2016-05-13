
const pad = (n, width, z) => {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//TODO write test unit
//What if series size = 0
export const sortSeriesByAiringDateTime = (series = []) => {
	//TODO need to check if function mutates original state; it should not.
	return series.sort(function(a, b){
		let valueA = '' + a.daysUntil + pad(a.hoursUntil, 2) + pad(a.minutesUntil, 2);
		let valueB = '' + b.daysUntil + pad(b.hoursUntil, 2) + pad(b.minutesUntil, 2);

		if (parseInt(valueA) > parseInt(valueB)) {
			return 1;
		}

		if (parseInt(valueA) < parseInt(valueB)) {
			return -1;
		}

		return 0;
	});
}

//TODO write test unit
export const xuatzSeriesSortAndExtract = (series) => {
	let sorted = sortSeriesByAiringDateTime(series);

	let marker = Math.floor(0.7 * sorted.length);
	let left = sorted.slice(0, marker);
	let right = sorted.slice(marker);

	return {
		recentlyAired: right,
		upcomingSeries: left
	};
}

export const getCurrentSeasonSeries = () => {
	let count = 101;

	return [
		{
			id: count++,
			title: 'Re:Zero kara Hajimeru Isekai Seikatsu',
			airingDateTime: '2016-04-04T01:05:00+09:00',
			thumbnail: 'http://cdn.myanimelist.net/images/anime/11/79410.jpg'
		},
		{
			id: count++,
			title: 'Assassination Classroom S2',
			airingDateTime: '2016-01-08T01:25:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21170-G9LdO8IwWHUR.jpg'
		},
		{
			id: count++,
			title: 'Big Order',
			airingDateTime: '2016-04-16T01:40:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21445-SFs5x0fN90L5.jpg'
		},
		{
			id: count++,
			title: 'Boku no Hero Academia',
			airingDateTime: '2016-04-03T17:00:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21459-M5Q3Q5qAFZEe.jpg'
		},
		{
			id: count++,
			title: 'Joker Game',
			airingDateTime: '2016-04-05T23:00:00+09:00'
		},
		{
			id: count++,
			title: 'Kabaneri of the Iron Fortress',
			airingDateTime: '2016-04-08T00:25:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21196-0dhwtTGZwTYg.jpg'
		},
		{
			id: count++,
			title: 'Kiznaiver',
			airingDateTime: '2016-04-09T23:30:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21421-SVOHkopCzGL2.jpg'
		},
		{
			id: count++,
			title: 'Netoge no Yome wa Onnanoko ja Nai to Omotta',
			airingDateTime: '2016-04-07T23:00:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg'
		},
		{
			id: count++,
			title: 'Sakamoto desu ga',
			airingDateTime: '2016-04-08T02:28:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21595-UYSAK3PDrCSk.jpg'
		},
		{
			id: count++,
			title: 'Sousei no Onmyouji',
			airingDateTime: '2016-04-06T18:25:00+09:00'
		},
		{
			id: count++,
			title: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
			airingDateTime: '2016-04-02T00:30:00+09:00',
			thumbnail: 'http://anilist.co/img/dir/anime/reg/21450-WwdbQpTAxS4A.jpg'
		},
		{
			id: count++,
			title: 'Flying Witch',
			airingDateTime: '2016-04-10T02:25:00+09:00'
		}
	];
}