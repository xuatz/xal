import anime from './anime';

function fetchCurrentlyAiringSeries() {
	return [
		{
			title: 'Re:Zero kara Hajimeru Isekai Seikatsu',
			airingDateTime: '2016-04-04T01:05:00+09:00'
		},
		{
			title: 'Assassination Classroom S2',
			airingDateTime: '2016-01-08T01:25:00+09:00'
		},
		{
			title: 'Big Order',
			airingDateTime: '2016-04-16T01:40:00+09:00'
		},
		{
			title: 'Boku no Hero Academia',
			airingDateTime: '2016-04-03T17:00:00+09:00'
		},
		{
			title: 'Joker Game',
			airingDateTime: '2016-04-05T23:00:00+09:00'
		},
		{
			title: 'Kabaneri of the Iron Fortress',
			airingDateTime: '2016-04-08T00:25:00+09:00'
		},
		{
			title: 'Kiznaiver',
			airingDateTime: '2016-04-09T23:30:00+09:00'
		},
		{
			title: 'Netoge no Yome wa Onnanoko ja Nai to Omotta',
			airingDateTime: '2016-04-07T23:00:00+09:00'
		},
		{
			title: 'Sakamoto desu ga',
			airingDateTime: '2016-04-08T02:28:00+09:00'
		},
		{
			title: 'Sousei no Onmyouji',
			airingDateTime: '2016-04-06T18:25:00+09:00'
		},
		{
			title: 'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
			airingDateTime: '2016-04-02T00:30:00+09:00'
		},
		{
			title: 'Flying Witch',
			airingDateTime: '2016-04-10T02:25:00+09:00'
		}
	];
}

let initialState = fetchCurrentlyAiringSeries();

const globalList = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_COUNTDOWN':
			return state.map(function(item){
				return anime(item, action);
			});
	default:
		return state
	}
}

export default globalList
