/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/21
 * @LastEditors:
 * @LastEditTime: 2020/12/21
 */
import {COMPARE, defaultCompare} from "../../util";

export const mergeSort = (array, compareFn = defaultCompare) => {
	if (array.length > 1) {
		const { length } = array;
		const middle = Math.floor(length / 2);
		const left = mergeSort(array.slice(0, middle), compareFn);
		const right = mergeSort(array.slice(middle, length), compareFn);
		array = merge(left, right, compareFn);
	}
	return array;
}

export const merge = (left, right, compareFn) => {
	let i = 0;
	let j = 0;
	const res = [];
	while( i < left.length && j < right.length) {
		res.push(compareFn(left[i], right[j]) === COMPARE.LESS_THAN ? left[i++]: right[j++])
	}
	return res.concat(i < left.length ? left.slice(i) : right.slice(j))
}
