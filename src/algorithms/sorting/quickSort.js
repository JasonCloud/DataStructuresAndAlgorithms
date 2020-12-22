/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/21
 * @LastEditors:
 * @LastEditTime: 2020/12/21
 */
import {COMPARE, defaultCompare, swap} from "../../util";

export const quickSort = (array, compareFn = defaultCompare) => {
	return quick(array, 0, array.length - 1, compareFn);
}
const quick = (array, left, right, compareFn) => {
	let idx;
	if(array.length > 1) {
		idx = partition(array, left, right, compareFn);
		if (left < idx - 1) {
			quick(array, left, idx - 1,compareFn);
		}
		if (idx < right) {
			quick(array, idx, right, compareFn);
		}
	}
	return array;
}

const partition = (array, left, right, compareFn) => {
	let pivot = array[Math.floor((left+right)/2)];
	let i = left;
	let j = right;
	while (i <= j) {
		while (compareFn(array[i], pivot) === COMPARE.LESS_THAN) {
			i++;
		}
		while (compareFn(array[j], pivot) === COMPARE.BIGGER_THAN) {
			j--;
		}
		if (i <= j) {
			swap(array, i, j);
			i++;
			j--;
		}
	}
	return i;
}
