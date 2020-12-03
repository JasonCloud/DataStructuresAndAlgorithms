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
	  } // 中序


	  inOrderTraverse(callback) {
	    this.inOrderTraverseNode(this.root, callback);
	  }

	  inOrderTraverseNode(node, callback) {
	    if (node) {
	      this.inOrderTraverseNode(node.left, callback);
	      callback(node.key);
	      this.inOrderTraverseNode(node.right, callback);
	    }
	  } // 先序


	  prevOrderTraverse(callback) {
	    this.prevOrderTraverseNode(this.root, callback);
	  }

	  prevOrderTraverseNode(node, callback) {
	    if (node) {
	      callback(node.key);
	      this.prevOrderTraverseNode(node.left, callback);
	      this.prevOrderTraverseNode(node.right, callback);
	    }
	  } // 后序


	  postOrderTraverse(callback) {
	    this.postOrderTraverseNode(this.root, callback);
	  }

	  postOrderTraverseNode(node, callback) {
	    if (node) {
	      this.postOrderTraverseNode(node.left, callback);
	      this.postOrderTraverseNode(node.right, callback);
	      callback(node.key);
	    }
	  } // 最小值


	  min() {
	    return this.minNode(this.root);
	  }

	  minNode(node) {
	    while (node && node.left) {
	      node = node.left;
	    }

	    return node;
	  } // 最大值


	  max() {
	    return this.maxNode(this.root);
	  }

	  maxNode(node) {
	    while (node && node.right) {
	      node = node.right;
	    }

	    return node;
	  }

	  search(key) {
	    return this.searchNode(this.root, key);
	  }

	  searchNode(node, key) {
	    if (node) {
	      if (this.compareFn(key, node.key) === COMPARE$1.LESS_THAN) {
	        return this.searchNode(node.left, key);
	      } else if (this.compareFn(key, node.key) === COMPARE$1.BIGGER_THAN) {
	        return this.searchNode(node.right, key);
	      } else {
	        return true;
	      }
	    }

	    return false;
	  }

	  remove(key) {
	    this.root = this.removeNode(this.root, key);
	  }

	  removeNode(node, key) {
	    if (!node) {
	      return null;
	    }

	    if (this.compareFn(key, node.key) === COMPARE$1.LESS_THAN) {
	      node.left = this.removeNode(node.left, key);
	      return node;
	    } else if (this.compareFn(key, node.key) === COMPARE$1.BIGGER_THAN) {
	      node.right = this.removeNode(node.right, key);
	      return node;
	    } else {
	      if (!node.left && !node.right) {
	        node = null;
	        return node;
	      }

	      if (!node.left) {
	        node = node.right;
	        return node;
	      }

	      if (!node.right) {
	        node = node.left;
	        return node;
	      }

	      let minNode = this.minNode(node.right);
	      node.key = minNode.key;
	      node.right = this.removeNode(node.right, minNode.key);
	      return node;
	    }
	  }

	}

	return BinarySearchTree;

})));
//# sourceMappingURL=BinarySearchTree.js.map
