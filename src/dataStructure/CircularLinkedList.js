/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/20
 * @LastEditors:
 * @LastEditTime: 2020/11/20
 */
import LinkedList from "./LinkedList";
import {defaultEquals} from "../util";
import {Node} from "./Node";

export default class CircularLinkedList extends LinkedList{
	constructor(equalsFn = defaultEquals){
		super(equalsFn)
	}
	insert(element, position = 0) {
		if (element === undefined) {
			return;
		}
		let cur = this.head;
		let node = new Node(element);
		if (!cur) {
			this.head = node;
			node.next = this.head
		} else if (position === 0) {
			let lastNode = this.getElementAt(this.size() - 1);
			let nextNode = this.head;
			this.head = node;
			node.next = nextNode;
			lastNode.next = node;
		} else {
			let prev = this.getElementAt(position - 1);
			let cur = prev.next;
			prev.next = node;
			node.next = cur;
		}
		this.count++;
		return element;
	}
	append(element){
		let node = new Node(element);
		let cur = this.head;
		if(element === undefined){
			return undefined;
		}
		if(!cur) {
			this.head = node;
			node.next = this.head
		} else {
			let cur = this.head;
			let lastNode = this.getElementAt(this.size() - 1);
			lastNode.next = node;
			node.next = cur;
		}
		this.count++;

		return element;
	}
	removeAt(idx){
		if (idx >= 0 && idx < this.count) {
			let current = this.head;
			if (idx === 0) {
				let lastNode = this.getElementAt(this.size() - 1);
				this.head = current.next;
				lastNode.next = current.next;
			} else {
				let prev = this.getElementAt(idx - 1);
				current = prev.next;
				prev.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}
