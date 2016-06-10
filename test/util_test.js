import {expect} from 'chai';
import deepFreeze from 'deep-freeze'

import * as MyUtil from '../src/lib/util'

describe('xuatzSeriesSortAndExtract()', () => {
	describe('when user watchlist only contain 1 item', () => {
		it('should categorise it as `upcomingSeries`', () => {
			const given = [
				{
					airingDateTime: "2016-04-07T23:00:00+09:00",
					id: 108,
					nextEpisodeDttm: "2016-06-09T14:00:00.000Z",
					thumbnail: "http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg",
					title: "Netoge no Yome wa Onnanoko ja Nai to Omotta"
				}
			];

			const expected = given;
			const {recentlyAired, upcomingSeries} = MyUtil.xuatzSeriesSortAndExtract(given);
			expect(upcomingSeries).to.deep.equal(expected);
		});
	});
	describe('when user watchlist contain only 3 items', () => {
		it('should categorise oldest as `recentlyAired` and the other 2 as `upcomingSeries`', () => {
			const given = [
				{
					id: 108,
					airingDateTime: "2016-04-07T23:00:00+09:00",
					nextEpisodeDttm: "2016-06-09T14:00:00.000Z",
					thumbnail: "http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg",
					title: "Series A"
				},
				{
					id: 106,
					airingDateTime: "2016-04-08T00:25:00+09:00",
					nextEpisodeDttm: "2016-06-09T15:25:00.000Z",
					thumbnail: "http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg",
					title: "Netoge no Yome wa Onnanoko ja Nai to Omotta"
				},
				{
					id:102, 
					airingDateTime:"2016-01-08T01:25:00+09:00",
					nextEpisodeDttm: "2016-06-09T16:25:00.000Z",
					thumbnail: "http://anilist.co/img/dir/anime/reg/21170-G9LdO8IwWHUR.jpg", 
					title: "Assassination Classroom S2"
				}
			];

			const expectedRA = [{
				id: 102
			}];
			const expectedUS = [{
				id: 108
			},{
				id: 106
			}];

			const {recentlyAired, upcomingSeries} = MyUtil.xuatzSeriesSortAndExtract(given);

			expect(recentlyAired[0].id).to.equal(expectedRA[0].id);
			expect(upcomingSeries[0].id).to.equal(expectedUS[0].id);
			expect(upcomingSeries[1].id).to.equal(expectedUS[1].id);
		});
	});
});


describe('getRemainingSeries()', () => {
	describe('when user have nothing in watchlist', () => {
		it('should remove nothing', () => {
			const givenWatchList = [10];
			const currentSeasonSeries = [
				{
					id: 101
				}, 
				{
					id: 102
				}, 
				{
					id: 103
				}
			];
			const expected = [
				{
					id: 101
				}, 
				{
					id: 102
				}, 
				{
					id: 103
				}
			];

			const actual = MyUtil.getRemainingSeries(givenWatchList, currentSeasonSeries);

			//expect(actual).to.eql(expected);
			expect(actual).to.deep.equal(expected);
		});
	});

	describe('when user have one series in watchlist', () => {
		it('should remove one watching series from currentSeasonSeries', () => {
			const givenWatchList = [102];
			const currentSeasonSeries = [
				{
					id: 101
				}, 
				{
					id: 102
				}, 
				{
					id: 103
				}
			];
			const expected = [{
				id: 101
			}, {
				id: 103
			}];
			const actual = MyUtil.getRemainingSeries(givenWatchList, currentSeasonSeries);
			//expect(actual).to.eql(expected);
			expect(actual).to.deep.equal(expected);
		});	
	});

	describe('this is a real life bug, which i dunno why we had problems', () => {
		it('but make sure this pass lol', () => {
			const givenWatchList = [101, 102, 103, 104];
			const currentSeasonSeries = [
				{ "id": 101, "title": "Re:Zero kara Hajimeru Isekai Seikatsu", "airingDateTime": "2016-04-04T01:05:00+09:00", "thumbnail": "http://cdn.myanimelist.net/images/anime/11/79410.jpg", "daysUntil": 0, "hoursUntil": 9, "minutesUntil": 52, "secsUntil": 29 }, 
				{ "id": 102, "title": "Assassination Classroom S2", "airingDateTime": "2016-01-08T01:25:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21170-G9LdO8IwWHUR.jpg", "daysUntil": 4, "hoursUntil": 10, "minutesUntil": 12, "secsUntil": 29 }, 
				{ "id": 103, "title": "Big Order", "airingDateTime": "2016-04-16T01:40:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21445-SFs5x0fN90L5.jpg", "daysUntil": 5, "hoursUntil": 10, "minutesUntil": 27, "secsUntil": 29 }, 
				{ "id": 104, "title": "Boku no Hero Academia", "airingDateTime": "2016-04-03T17:00:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21459-M5Q3Q5qAFZEe.jpg", "daysUntil": 0, "hoursUntil": 1, "minutesUntil": 47, "secsUntil": 29 }, 
				{ "id": 105, "title": "Joker Game", "airingDateTime": "2016-04-05T23:00:00+09:00", "daysUntil": 2, "hoursUntil": 7, "minutesUntil": 47, "secsUntil": 29 },
				{ "id": 106, "title": "Kabaneri of the Iron Fortress", "airingDateTime": "2016-04-08T00:25:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21196-0dhwtTGZwTYg.jpg", "daysUntil": 4, "hoursUntil": 9, "minutesUntil": 12, "secsUntil": 29 },
				{ "id": 107, "title": "Kiznaiver", "airingDateTime": "2016-04-09T23:30:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21421-SVOHkopCzGL2.jpg", "daysUntil": 6, "hoursUntil": 8, "minutesUntil": 17, "secsUntil": 29 },
				{ "id": 108, "title": "Netoge no Yome wa Onnanoko ja Nai to Omotta", "airingDateTime": "2016-04-07T23:00:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg", "daysUntil": 4, "hoursUntil": 7, "minutesUntil": 47, "secsUntil": 29 },
				{ "id": 109, "title": "Sakamoto desu ga", "airingDateTime": "2016-04-08T02:28:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21595-UYSAK3PDrCSk.jpg", "daysUntil": 4, "hoursUntil": 11, "minutesUntil": 15, "secsUntil": 29 },
				{ "id": 110, "title": "Sousei no Onmyouji", "airingDateTime": "2016-04-06T18:25:00+09:00", "daysUntil": 3, "hoursUntil": 3, "minutesUntil": 12, "secsUntil": 29 },
				{ "id": 111, "title": "JoJo no Kimyou na Bouken: Diamond wa Kudakenai", "airingDateTime": "2016-04-02T00:30:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21450-WwdbQpTAxS4A.jpg", "daysUntil": 5, "hoursUntil": 9, "minutesUntil": 17, "secsUntil": 29 },
				{ "id": 112, "title": "Flying Witch", "airingDateTime": "2016-04-10T02:25:00+09:00", "daysUntil": 6, "hoursUntil": 11, "minutesUntil": 12, "secsUntil": 29 }
			];
			const expected = [
				{ "id": 105, "title": "Joker Game", "airingDateTime": "2016-04-05T23:00:00+09:00", "daysUntil": 2, "hoursUntil": 7, "minutesUntil": 47, "secsUntil": 29 },
				{ "id": 106, "title": "Kabaneri of the Iron Fortress", "airingDateTime": "2016-04-08T00:25:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21196-0dhwtTGZwTYg.jpg", "daysUntil": 4, "hoursUntil": 9, "minutesUntil": 12, "secsUntil": 29 },
				{ "id": 107, "title": "Kiznaiver", "airingDateTime": "2016-04-09T23:30:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21421-SVOHkopCzGL2.jpg", "daysUntil": 6, "hoursUntil": 8, "minutesUntil": 17, "secsUntil": 29 },
				{ "id": 108, "title": "Netoge no Yome wa Onnanoko ja Nai to Omotta", "airingDateTime": "2016-04-07T23:00:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21290-oIkeZVRywuWV.jpg", "daysUntil": 4, "hoursUntil": 7, "minutesUntil": 47, "secsUntil": 29 },
				{ "id": 109, "title": "Sakamoto desu ga", "airingDateTime": "2016-04-08T02:28:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21595-UYSAK3PDrCSk.jpg", "daysUntil": 4, "hoursUntil": 11, "minutesUntil": 15, "secsUntil": 29 },
				{ "id": 110, "title": "Sousei no Onmyouji", "airingDateTime": "2016-04-06T18:25:00+09:00", "daysUntil": 3, "hoursUntil": 3, "minutesUntil": 12, "secsUntil": 29 },
				{ "id": 111, "title": "JoJo no Kimyou na Bouken: Diamond wa Kudakenai", "airingDateTime": "2016-04-02T00:30:00+09:00", "thumbnail": "http://anilist.co/img/dir/anime/reg/21450-WwdbQpTAxS4A.jpg", "daysUntil": 5, "hoursUntil": 9, "minutesUntil": 17, "secsUntil": 29 },
				{ "id": 112, "title": "Flying Witch", "airingDateTime": "2016-04-10T02:25:00+09:00", "daysUntil": 6, "hoursUntil": 11, "minutesUntil": 12, "secsUntil": 29 }
			];
			
			const actual = MyUtil.getRemainingSeries(givenWatchList, currentSeasonSeries);

			//expect(actual).to.eql(expected);
			expect(actual).to.deep.equal(expected);
		});
	});
});

console.log('================================');
console.log('Test Results');
console.log('================================');