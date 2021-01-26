/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/22
 * @LastEditors:
 * @LastEditTime: 2020/12/22
 */
import {COMPARE, defaultCompare} from "../../util";
import {quickSort} from "./quickSort";

export const binarySearch = (array, value, compareFn = defaultCompare) => {
	let sortedArray = quickSort(array);
	let startIdx = 0;
	let endIdx = sortedArray.length - 1;
	let result = -1;
	while (endIdx > startIdx) {
		let midIdx = Math.floor((startIdx + endIdx)/2);
		let midVal = sortedArray[midIdx];
		if (compareFn(value, midVal) === COMPARE.LESS_THAN) {
			endIdx = midIdx - 1;
		} else if (compareFn(value, midVal) === COMPARE.BIGGER_THAN) {
			startIdx = midIdx + 1;
		} else {
			return midIdx;
		}
	}
	return result;
}
