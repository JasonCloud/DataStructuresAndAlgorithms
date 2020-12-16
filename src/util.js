/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/18
 * @LastEditors:
 * @LastEditTime: 2020/11/18
 */
export const defaultEquals = function (a, b) {
	return a === b
}
export const COMPARE = {
	EQUAL: 0,
	LESS_THAN: -1,
	BIGGER_THAN: 1
}
export const BALANCEFACTOR = {
	UNBALANCED_RIGHT: 1,
	SLIGHTLY_UNBALANCED_RIGHT: 2,
	BALANCED: 3,
	SLIGHTLY_UNBALANCED_LEFT: 4,
	UNBALANCED_LEFT: 5
};
export function reverseCompare(compareFn) {
	return (a, b) => compareFn(b, a);
}
export function defaultCompare(a, b) {
	if (a === b) {
		return COMPARE.EQUAL;
	} else if (a < b) {
		return COMPARE.LESS_THAN;
	} else {
		return COMPARE.BIGGER_THAN;
	}
}
export function	keyToString(str) {
	if (str === null) {
		return 'null';
	} else if (str === undefined) {
		return 'undefined';
	} else if(typeof str === 'function') {
		return str.toString();
	}
	return JSON.stringify(str)
}
export function swap(arr, index1, index2) {
	[arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}
