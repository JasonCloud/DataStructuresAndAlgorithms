/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/19
 * @LastEditors:
 * @LastEditTime: 2020/11/19
 */
import LinkedList from "./LinkedList";
import {defaultEquals} from "../util";
import { DoubleNode } from "./DoubleNode";

export default class DoubleLinkedList extends LinkedList{
	constructor(equalIsFn = defaultEquals){
		super(equalIsFn);
		this.tail = null;
	}
	append(element) {
		const node = new DoubleNode(element);
		if (!this.tail) {
			this.head = node;
			this.tail = node;
		} else {
			let cur = this.tail;
			cur.next = node;
			node.prev = cur;
			this.tail = node;
		}
		this.count++;
		return element;
	}
	insert(element, position = 0, dir = 'before'){
		if (element === undefined) {
			throw Error('缺少需要插入的元素');
			return;
		}
		if (position >= this.count) {
			return this.append(element);
		}
		const node = new DoubleNode(element);
		let cur;
		const targetNode = dir === 'before' ? this.getElementAt(position - 1) : this.getElementAt(position);
		if (!targetNode) {
			cur = this.head;
			node.next = cur;
			cur.prev = node;
			this.head = node;
		} else {
			let next;
			next = targetNode.next
			targetNode.next = node;
			node.prev = targetNode;
			node.next = next;
			next.prev = node;
		}
		this.count++;
		return element;
	}
	getElementAt(position) {
		if(position >= 0 && position <= this.count) {
			if (position > this.count/2) {
				let cur = this.tail;
				for (let i = this.count - 1; i > position; i--){
					cur = cur.prev;
				}
				return cur;
			} else {
				return super.getElementAt(position)
			}
		}
		return undefined;
	}
	removeAll() {
		super.removeAll();
		this.tail = null;
	}
	removeAt(position) {
		if (position >= 0 && position < this.count) {
			let cur = this.getElementAt(position);
			if(position === 0) {
				this.head = cur.next;
				cur.next = null;
				this.prev = null;
			} else if (position === this.count - 1) {
				this.tail = cur.prev;
				this.tail.next = null;
				cur.prev = null;
			} else {
				let prev = cur.prev;
				let next = cur.next;
				prev.next = next;
				next.prev = prev;
				cur.prev = null;
				cur.next = null;
			}
			this.count--;
			return cur.element;
		}
		return undefined;
	}
}
