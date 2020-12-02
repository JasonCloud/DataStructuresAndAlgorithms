/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/2
 * @LastEditors:
 * @LastEditTime: 2020/12/2
 */
import {defaultCompare} from "./util";
import {TreeNode} from "./TreeNode";

export default class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.root = null;
	}
	insert(key) {
		let node = new TreeNode(key);
		if (!this.root) {
			this.root = node;
		}
	}
}
