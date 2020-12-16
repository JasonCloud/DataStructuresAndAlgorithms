/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/26
 * @LastEditors:
 * @LastEditTime: 2020/11/26
 */
import LinkedList from "./LinkedList";
import {defaultEquals, defaultCompare} from "../util";
import {Node} from "./Node";
export default class SortLinkedList extends LinkedList{
	constructor(equal = defaultEquals, defaultFn = defaultCompare){
		super(equal);
		this.defaultCompare = defaultFn;
	}
	insert(element) {
		if(this.isEmpty()) {
			return super.insert(element, 0);
		}
		let head = this.head;
		let node = new Node(element);
		if (!head){
			this.head = node;
		} else {
			let node = this.head;
			let i = 0;
			for (; i < this.size() && node; i++) {
				const result = this.defaultCompare(element, node.element);
				if (result <= 0) {
					break;
				}
				node = node.next;
			}
			super.insert(element, i);
		}
		return element;
	}
}
