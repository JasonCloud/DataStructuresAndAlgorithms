/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/16
 * @LastEditors:
 * @LastEditTime: 2020/12/16
 */
import {defaultCompare} from "../util";

export const heapSort = (arr = [], compareFn = defaultCompare) => {
	let heapSize = arr.length;
	buildHeap(arr, compareFn);
}
export const buildHeap = (arr, compareFn) => {

}
