/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/28
 * @LastEditors:
 * @LastEditTime: 2020/11/28
 */
import {keyToString} from "../util";
class ValueObj {
	constructor(key, val) {
		this.key = key;
		this.value = val;
	}
	toString() {
		return `[#${this.key}:${this.value}]`;
	}
}
export default class Dictionary {
	constructor(toStrFn = keyToString) {
		this.toStrFn = toStrFn;
		this.dic = {};
	}
	set(key, val) {
		if(key && val) {
			const resKey = this.toStrFn(key);
			this.dic[resKey] = new ValueObj(resKey, val);
			return true;
		}
		return false;
	}
	remove(key) {
		if(this.hasKey(key)) {
			const resKey = this.toStrFn(key);
			delete this.dic[resKey];
			return true;
		}
		return false;
	}
	hasKey(key) {
		const resKey = this.toStrFn(key);
		return this.dic[resKey] ? this.dic[resKey] : false;
	}
	get(key) {
		return this.dic[this.toStrFn(key)] ? this.dic[this.toStrFn(key)]['value'] : undefined;
	}
	clear() {
		this.dic = {};
		return true;
	}
	size() {
		return Object.keys(this.dic).length;
	}
	isEmpty() {
		return this.size() === 0;
	}
	keys() {
		return Object.keys(this.dic);
	}
	values() {
		return this.keyValues().map(val => val.value);
	}
	keyValues() {
		return Object.values(this.dic);
	}
	forEach(callback) {
		if (typeof callback === 'function') {
			const resVals = this.keyValues();
			for (let i = 0; i < resVals.length; i++) {
				const res = callback(resVals[i]['key'], resVals[i]['value']);
				if (res === false) {
					break;
				}
			}
		}
	}
}
