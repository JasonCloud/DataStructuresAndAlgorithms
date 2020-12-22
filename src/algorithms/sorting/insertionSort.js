/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/21
 * @LastEditors:
 * @LastEditTime: 2020/12/21
 */
import {COMPARE, defaultCompare} from "../../util";

export const insertionSort = (array, compareFn = defaultCompare) => {
	const { length } = array;
	let temp;
	for (let i = 1; i < length; i++) {
		let idx = i;
		temp = array[idx];
		while (idx > 0 && compareFn(array[idx - 1], temp) === COMPARE.BIGGER_THAN) {
			array[idx] = array[idx -1];
			idx --;
		}
		array[idx] = temp;
	}
	return array;
}
