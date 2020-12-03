/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/2
 * @LastEditors:
 * @LastEditTime: 2020/12/2
 */
import {defaultCompare} from "./util";
import {TreeNode} from "./TreeNode";

const COMPARE = {
	EQUAL: 0,
	LESS_THAN: -1,
	BIGGER_THAN: 1
}
export default class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.root = null;
	}
	insert(key) {
		if (!this.root) {
			this.root = new TreeNode(key);
		} else {
			this.inertNode(this.root, key);
		}
	}
	inertNode(node, key) {
		if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
			const leftNode = node.left;
			if (!leftNode) {
				node.left = new TreeNode(key);
			} else {
				this.inertNode(leftNode, key);
			}
		} else {
			const rightNode = node.right;
			if (!rightNode) {
				node.right = new TreeNode(key);
			} else {
				this.inertNode(rightNode, key);
			}
		}
	}
	// 中序
	inOrderTraverse(callback) {
		this.inOrderTraverseNode(this.root, callback);
	}
	inOrderTraverseNode(node, callback) {
		if(node) {
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
		}
	}
	// 先序
	prevOrderTraverse(callback){
		this.prevOrderTraverseNode(this.root, callback);
	}
	prevOrderTraverseNode(node, callback){
		if (node) {
			callback(node.key);
			this.prevOrderTraverseNode(node.left, callback);
			this.prevOrderTraverseNode(node.right, callback);
		}
	}
	// 后序
	postOrderTraverse(callback){
		this.postOrderTraverseNode(this.root, callback);
	}
	postOrderTraverseNode(node, callback){
		if (node) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
	search(key) {
		if (!this.root) {
			return -1;
		}
	}
}
