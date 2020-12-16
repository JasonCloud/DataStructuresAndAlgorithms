/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/15
 * @LastEditors:
 * @LastEditTime: 2020/12/15
 */
import {defaultCompare, COMPARE, swap} from "../util";
export default class MinHeap {
	constructor(compareFn = defaultCompare) {
		this.heap = [];
		this.comparFn = compareFn;
	}
	getParentIndex(i) {
		return i ? Math.floor((i - 1) / 2) : undefined;
	}
	getLeftIndex(i) {
		return 2 * i + 1;
	}
	getRightIndex(i) {
		return 2 * i + 2;
	}
	insert(val) {
		if(val != null) {
			this.heap.push(val);
			this.siftUp(this.heap.length - 1);
			return true;
		}
		return false;
	}
	siftUp(index) {
		let parent = this.getParentIndex(index);
		while (
				index > 0
				&& this.comparFn(this.heap[parent], this.heap[index]) === COMPARE.BIGGER_THAN) {
			[this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
			index = parent;
			parent = this.getParentIndex(index);
		}
	}
	size() {
		return this.heap.length;
	}
	isEmpty() {
		return this.heap.length === 0;
	}
	findMinnum() {
		return this.heap[0];
	}
	extract() {
		if(this.isEmpty()) {
			return undefined;
		}
		if (this.size() === 1) {
			return this.heap.shift();
		}
		swap(this.heap, 0, this.size() - 1);
		const resultVal = this.heap.pop();
		this.siftDown(0);
		return resultVal;
	}
	getAsArray() {
		return this.heap;
	}
	heapify(arry) {
		if (arr) {
			this.heap = arry;
		}
		const len = Math.floor(this.size() / 2) - 1;
		for(let i = 0; i < len; i++) {
			this.siftDown(i);
		}
		return this.heap;
	}
	siftDown(i) {
		let ele = i;
		const left = this.getLeftIndex(i);
		const right = this.getRightIndex(i);
		const size = this.size();
		if (left < size && this.comparFn(this.heap[ele], this.heap[left]) === COMPARE.BIGGER_THAN) {
			ele = left;
		}
		if(right < size && this.comparFn(this.heap[ele], this.heap[right]) === COMPARE.BIGGER_THAN) {
			ele = right;
		}
		if(i !== ele) {
			swap(this.heap, i, ele);
			this.siftDown(ele);
		}
	}
}
