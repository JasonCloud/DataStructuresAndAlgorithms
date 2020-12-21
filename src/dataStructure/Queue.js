/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/16
 * @LastEditors:
 * @LastEditTime: 2020/12/16
 */
export default class Queue {
	constructor() {
		this.counter = 0;// 计数器计算队列大小
		this.items = {}; // 队列存储
		this.lowestCount = 0; // 队列头
	}
	// 返回队列首位
	peek() {
		return this.items[this.lowestCount];
	}
	enqueue(element) {
		this.items[this.counter] = element;
		this.counter++;
	}
	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		return result;
	}
	isEmpty() {
		return this.size() === 0;
	}
	size() {
		return this.counter - this.lowestCount;
	}
	clear() {
		this.counter = 0;
		this.lowestCount = 0;
		this.items = {};
	}
}
