import {expect} from 'chai';
import deepFreeze from 'deep-freeze'

import * as MyUtil from '../lib/util'

console.log('================================');

describe('util', () => {
  describe('getRemainingSeries', () => {
    it('removes one watching series from currentSeasonSeries', () => {
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
		const expected = [
			{
				id: 101
			},
			{
				id: 103
			}
		];
		const actual = MyUtil.getRemainingSeries(givenWatchList, currentSeasonSeries);

		//expect(actual).to.eql(expected);
		expect(actual).to.deep.equal(expected);
    });
    it('removes nothing if it does not exist', () => {
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
});