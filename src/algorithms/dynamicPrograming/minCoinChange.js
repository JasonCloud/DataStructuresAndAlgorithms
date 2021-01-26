/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/23
 * @LastEditors:
 * @LastEditTime: 2020/12/23
 */
export const minCoinChange = (coins, amount) => {
	const cache = [];
	const makeChange = (value) => {
		if (value <= 0) {
			return [];
		}
		if (cache[value]) {
			return cache[value];
		}
		let min = [];
		let newMin;
		let newAmount;
		for (let i = 0; i < coins.length; i++) {
			let coin = coins[i];
			newAmount = value - coin;
			if (newAmount >= 0) {
				newMin = makeChange(newAmount);
			}
			if(
					newAmount >= 0
					&& (newMin.length < min.length -1 || !min.length)
					&& (newMin.length || !newAmount)
			) {
				min = [coin].concat(newMin);
				console.log('min', min, 'newMin', newMin);
			}
		}
		return cache[value] = min;
	}
	let res = makeChange(amount);
	console.log(cache, '=====cache');
	return res;
}
//console.log(minCoinChange([2,4,13], 7))
