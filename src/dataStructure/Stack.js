/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/18
 * @LastEditors:
 * @LastEditTime: 2020/12/18
 */
export default class Stack {
	constructor() {
		this.counter = 0;
		this.items = {};
	}
	push(val) {
		this.items[this.counter] = val;
		this.counter++;
	}
	size() {
		return this.counter;
	}
	isEmpty() {
		return this.counter === 0;
	}
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.counter--;
		const res = this.items[this.counter];
		delete this.items[this.counter];
		return res;
	}
	peek() {
		return this.items[this.counter - 1]
	}
	clear() {
		this.counter = 0;
		this.items = {};
	}
}
