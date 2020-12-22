/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/21
 * @LastEditors:
 * @LastEditTime: 2020/12/21
 */
import {COMPARE, defaultCompare, swap} from "../../util";

export const bubbleSort = (array, compareFn = defaultCompare) => {
	const { length } = array;
	for (let i = 0; i < length-1; i++) {
		for (let j = i; j < length; j++) {
			if (compareFn(array[i], array[j]) === COMPARE.BIGGER_THAN) {
				swap(array, i, j);
			}
		}
	}
	return array;
};
