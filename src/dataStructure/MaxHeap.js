/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/15
 * @LastEditors:
 * @LastEditTime: 2020/12/15
 */
import MinHeap from "./MinHeap";
import {defaultCompare, reverseCompare} from "../util";

export default class MaxHeap extends MinHeap{
	constructor(compareFn = defaultCompare) {
		super(compareFn);
		this.comparFn = reverseCompare(compareFn);
	}
}
