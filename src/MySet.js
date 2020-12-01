/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/26
 * @LastEditors:
 * @LastEditTime: 2020/11/26
 */
import {keyToString} from "./util";

export default class MySet {
	constructor() {
		this.items = {};
	}
	add(element) {
		const key = this.keyToString(element);
		if(!this.has(element)) {
			this.items[key] = element;
			return true;
		}
		return false;
	}
	delete(element) {
		if(this.has(element)) {
			delete this.items[this.keyToString(element)];
			return true;
		}
		return false;
	}
	keyToString(str) {
		return keyToString(str);
	}
	has(element) {
		return Object.prototype.hasOwnProperty.call(this.items, this.keyToString(element));
	}
	clear() {
		this.items = {};
		return true;
	}
	size() {
		return Object.keys(this.items).length;
	}
	values() {
		return Object.values(this.items);
	}
	// 并集
	union(otherSet) {
		const unionSet = new MySet();
		const values = this.values();
		const otherSetValues = otherSet.values();
		for (let i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		for (let i = 0; i < otherSetValues.length; i++) {
			unionSet.add(otherSetValues[i]);
		}
		return unionSet;
	}
	// 交集
	intersection(otherSet) {
		const intersectionSet = new MySet();
		const values = this.values();
		const otherSetValues = otherSet.values();
		const lenSelf = values.length;
		const lenOther = otherSetValues.length;
		if (lenSelf < lenOther) {
			for (let i = 0; i < lenSelf; i++) {
				if(otherSet.has(values[i])){
					intersectionSet.add(values[i])
				}
			}
		} else {
			for (let i = 0; i < lenOther; i++) {
				if(this.has(otherSetValues[i])){
					intersectionSet.add(otherSetValues[i])
				}
			}
		};
		return intersectionSet;
	}
	// 差集
	difference(otherSet) {
		const differenceSet = new MySet();
		this.values().forEach(v => {
			if(!otherSet.has(v)) {
				differenceSet.add(v);
			}
		});
		return differenceSet;
	}
	// 子集
	isChildSet(otherSet) {
		if (this.size() > otherSet.size()) {
			return false;
		}
		let res = false;
		otherSet.values().every(v => {
			if (!otherSet.has(v)) {
				res = false;
				return false
			}
			return true;
		})
		return res;
	}
}
