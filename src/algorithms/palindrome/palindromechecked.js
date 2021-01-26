/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/18
 * @LastEditors:
 * @LastEditTime: 2021/1/18
 */
import {Deque} from "./Deque";

export const palindromeChecked = (str) => {
	if(!str){
		return false;
	}
	const deque = new Deque();
	const strs = str.toLowerCase().split('');
	for (let i = 0; i < strs.length; i++) {
		deque.addBack(strs[i]);
	}
	let start = '', end = '', isTrue = true;
	while (deque.size() > 1 && isTrue) {
		start = deque.removeFront();
		end = deque.removeBack();
		if (start != end) {
			isTrue = false;
		}
	}
	return isTrue
}
