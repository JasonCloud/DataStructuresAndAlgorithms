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
	class BinarySearchTree {
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

	return BinarySearchTree;

})));
//# sourceMappingURL=BinarySearchTree.js.map
