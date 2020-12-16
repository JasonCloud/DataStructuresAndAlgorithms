/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/8
 * @LastEditors:
 * @LastEditTime: 2020/12/8
 */
import BinarySearchTre from './BinarySearchTree'
import {defaultCompare, COMPARE, BALANCEFACTOR} from "../util";
import {TreeNode} from "./TreeNode";

export default class AVLTree extends BinarySearchTre{
	constructor(compareFn = defaultCompare ) {
		super(compareFn);
		this.compareFn = compareFn;
		this.root = null;
		this.count = null;
	}
	getNodeHeight(node) {
		if (!node) {
			return -1;
		}
		return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
	}
	getBalanceFactor(node) {
		const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
		switch (heightDifference) {
			case -2:
				return BALANCEFACTOR.UNBALANCED_RIGHT;
			case -1:
				return BALANCEFACTOR.SLIGHTLY_UNBALANCED_RIGHT;
			case 1:
				return BALANCEFACTOR.SLIGHTLY_UNBALANCED_LEFT;
			case 2:
				return BALANCEFACTOR.UNBALANCED_LEFT;
			default:
				return BALANCEFACTOR.BALANCED;
		}
	}
	rotationLL(node) {
		const tempNode = node.left;
		node.left = tempNode.right;
		tempNode.right = node;
		return tempNode;
	}
	rotationRR(node) {
		const tempNode = node.right;
		node.right = tempNode.left;
		tempNode.left = node;
		return tempNode;
	}
	rotationLR(node) {
		node.left = this.rotationRR(node.left); // 先将失去平衡节点的左子树进行右旋转；
		return this.rotationLL(node); // 再对整个失去平衡的树进行左旋转
	}
	rotationRL(node) {
		node.right = this.rotationLL(node.right); // 先将失去平衡节点的右子树进行左旋转
		return this.rotationRR(node);  // 再对整个失去平衡的树进行右旋转
	}
	insert(key) {
		this.root = this.insertNode(this.root, key);
	}
	insertNode(node, key) {
		if (!node) { // 说明已经到了叶节点没有下一个节点了，这个时候可以创建一个新节点作为上一个节点的子节点
			return new TreeNode(key);
		} else if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) { // 如果插入的数比节点的左节点要小
			node.left = this.insertNode(node.left, key);// 递归查找左节点
		} else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) { // 如果插入的数比右节点要大
			node.right = this.insertNode(node.right, key); // 递归查找右节点
		} else {
			return node; // 相等说明插入了相同的数不做操作
		}
		const balanceFactor = this.getBalanceFactor(node); // 获取该节点的平衡因子
		if (balanceFactor === BALANCEFACTOR.UNBALANCED_LEFT) { // 说明是左子树失去平衡
			if(this.compareFn(key, node.left.key) === COMPARE.LESS_THAN) { // 如果新插入的数比失去平衡的左子树数要小，则是LL型旋转
				node = this.rotationLL(node);
			} else { // 否则说明新增元素是插入失去平衡节点的左子树的右侧插入，则是LR旋转
				return this.rotationLR(node);
			}
		}
		if (balanceFactor === BALANCEFACTOR.UNBALANCED_RIGHT) { // 说明是右子树失去平衡
			if (this.compareFn(key, node.right.key) === COMPARE.BIGGER_THAN) { // 如果新插入的数比失去平衡的右子树数要大，则是RR型旋转
				node = this.rotationRR(node);
			} else { // 否则说明新增元素是插入失去平衡节点的右子树的左侧插入，则是RL旋转
				return this.rotationRL(node);
			}
		}
		return node;
	}
	removeNode(node, key) {
		node = super.removeNode(node, key);
		if (!node) {
			return node; // 不需要调整平衡；
		}
		const balanceFactor = this.getBalanceFactor(node);
		if(balanceFactor === BALANCEFACTOR.UNBALANCED_LEFT) {
			const balanceFactorLeft = this.getBalanceFactor(node.left);
			if(balanceFactorLeft === BALANCEFACTOR.BALANCED || balanceFactorLeft === BALANCEFACTOR.SLIGHTLY_UNBALANCED_LEFT) {
				return this.rotationLL(node);
			}
			if (balanceFactorLeft === BALANCEFACTOR.SLIGHTLY_UNBALANCED_RIGHT) {
				return this.rotationLR(node.left);
			}
		}
		if(balanceFactor === BALANCEFACTOR.UNBALANCED_RIGHT) {
			const balanceFactorRight = this.getBalanceFactor(node.right);
			if(balanceFactorRight === BALANCEFACTOR.BALANCED || balanceFactorRight === BALANCEFACTOR.SLIGHTLY_UNBALANCED_RIGHT) {
				return this.rotationRR(node);
			}
			if(balanceFactorRight === BALANCEFACTOR.SLIGHTLY_UNBALANCED_LEFT) {
				return this.rotationRL(node.right);
			}
		}
		return node;
	}
}
