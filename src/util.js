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
const COMPARE = {
	EQUAL: 0,
	LESS_THAN: -1,
	BIGGER_THAN: 1
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
