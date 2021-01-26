/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/17
 * @LastEditors:
 * @LastEditTime: 2021/1/17
 */
export default class Queue {
	constructor() {
		this.items = [];
	}
	enqueue(val) {
		this.items.push(val);
	}
	size() {
		return this.items.length;
	}
	isEmpty() {
		return this.items.length === 0;
	}
	dequeue() {
		return this.items.shift();
	}
	peek() {
		return this.items[0]
	}
	clear() {
		this.items = [];
	}
}
