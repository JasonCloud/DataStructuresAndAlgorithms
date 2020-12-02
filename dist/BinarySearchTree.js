(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BinarySearchTree = factory());
}(this, (function () { 'use strict';

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/18
	 * @LastEditors:
	 * @LastEditTime: 2020/11/18
	 */
	const COMPARE = {
	  EQUAL: 0,
	  LESS_THAN: -1,
	  BIGGER_THAN: 1
	};
	function defaultCompare(a, b) {
	  if (a === b) {
	    return COMPARE.EQUAL;
	  } else if (a < b) {
	    return COMPARE.LESS_THAN;
	  } else {
	    return COMPARE.BIGGER_THAN;
	  }
	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/2
	 * @LastEditors:
	 * @LastEditTime: 2020/12/2
	 */
	class TreeNode {
	  constructor(key) {
	    this.key = key;
	    this.left = null;
	    this.right = null;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/2
	 * @LastEditors:
	 * @LastEditTime: 2020/12/2
	 */
	const COMPARE$1 = {
	  EQUAL: 0,
	  LESS_THAN: -1,
	  BIGGER_THAN: 1
	};
	class BinarySearchTree {
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
	    if (this.compareFn(key, node.key) === COMPARE$1.LESS_THAN) {
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

	  inOrderTraverse(callback) {
	    this.inOrderTraverseNode(this.root, callback);
	  }

	  inOrderTraverseNode(node, callback) {
	    if (node) {
	      this.inOrderTraverseNode(node.left, callback);
	      callback(node.key);
	      this.inOrderTraverseNode(node.right, callback);
	    }
	  }

	  search(key) {
	    if (!this.root) {
	      return -1;
	    }
	  }

	}

	return BinarySearchTree;

})));
//# sourceMappingURL=BinarySearchTree.js.map
