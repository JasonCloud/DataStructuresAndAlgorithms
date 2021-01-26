/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/17
 * @LastEditors:
 * @LastEditTime: 2021/1/17
 */
export default class Stack {
	constructor() {
		this.items = [];
	}
	push(val) {
		this.items.push(val);
	}
	size() {
		return this.items.length;
	}
	isEmpty() {
		return this.items.length === 0;
	}
	pop() {
		return this.items.pop();
	}
	peek() {
		return this.items[this.items.length - 1]
	}
	clear() {
		this.items = [];
	}
}
