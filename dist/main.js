(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/18
	 * @LastEditors:
	 * @LastEditTime: 2020/11/18
	 */
	const defaultEquals = function (a, b) {
	  return a === b;
	};
	const COMPARE = {
	  EQUAL: 0,
	  LESS_THAN: -1,
	  BIGGER_THAN: 1
	};
	const BALANCEFACTOR = {
	  UNBALANCED_RIGHT: 1,
	  SLIGHTLY_UNBALANCED_RIGHT: 2,
	  BALANCED: 3,
	  SLIGHTLY_UNBALANCED_LEFT: 4,
	  UNBALANCED_LEFT: 5
	};
	function reverseCompare(compareFn) {
	  return (a, b) => compareFn(b, a);
	}
	function defaultCompare(a, b) {
	  if (a === b) {
	    return COMPARE.EQUAL;
	  } else if (a < b) {
	    return COMPARE.LESS_THAN;
	  } else {
	    return COMPARE.BIGGER_THAN;
	  }
	}
	function keyToString(str) {
	  if (str === null) {
	    return 'null';
	  } else if (str === undefined) {
	    return 'undefined';
	  } else if (typeof str === 'function') {
	    return str.toString();
	  }

	  return JSON.stringify(str);
	}
	function swap(arr, index1, index2) {
	  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/18
	 * @LastEditors:
	 * @LastEditTime: 2020/11/18
	 */
	class Node {
	  constructor(element, next = null) {
	    this.element = element;
	    this.next = next;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/18
	 * @LastEditors:
	 * @LastEditTime: 2020/11/18
	 */
	class LinkedList {
	  constructor(equalsFn = defaultEquals) {
	    this.count = 0;
	    this.head = null;
	    this.equalsFn = equalsFn;
	  }

	  getElementAt(position) {
	    if (position >= 0 && position <= this.count) {
	      let node = this.head;

	      for (let i = 0; i < position && !!node; i++) {
	        node = node.next;
	      }

	      return node;
	    }

	    return undefined;
	  }

	  append(element) {
	    const node = new Node(element);
	    let current = this.head;

	    if (current == null) {
	      this.head = node;
	    } else {
	      current = this.head;

	      while (current.next != null) {
	        current = current.next;
	      }

	      current.next = node;
	    }

	    this.count++;
	    return element;
	  }

	  removeAt(idx) {
	    if (idx >= 0 && idx < this.count) {
	      let current = this.head;

	      if (idx === 0) {
	        this.head = current.next;
	        current.next = null;
	      } else {
	        let prev = this.getElementAt(idx - 1);
	        current = prev.next;
	        prev.next = current.next;
	      }

	      this.count--;
	      return current.element;
	    }

	    return undefined;
	  }

	  insert(element, position = 0, dir = 'before') {
	    if (element === undefined) {
	      throw Error('缺少需要插入的元素');
	    }

	    if (position >= this.count) {
	      return this.append(element);
	    }

	    const node = new Node(element);
	    const targetNode = dir === 'before' ? this.getElementAt(position - 1) : this.getElementAt(position);

	    if (!targetNode) {
	      let prev = this.head;
	      this.head = node;
	      node.next = prev;
	    } else {
	      let next;
	      next = targetNode.next;
	      targetNode.next = node;
	      node.next = next;
	    }

	    this.count++;
	    return element;
	  }

	  insertAfter(element, position) {
	    return this.insert(element, position, 'after');
	  }

	  size() {
	    return this.count;
	  }

	  remove() {
	    return this.removeAt(this.size() - 1);
	  }

	  removeAll() {
	    this.count = 0;
	    this.head = null;
	  }

	  indexOf(element) {
	    let result = -1;
	    let node = this.head;

	    for (let i = 0; i < this.count; i++) {
	      if (this.equalsFn(element, node.element)) {
	        result = i;
	        break;
	      }

	      node = node.next;
	    }

	    return result;
	  }

	  isEmpty() {
	    return this.size() === 0;
	  }

	  getHead() {
	    return this.head;
	  }

	  toString() {
	    if (this.head == null) {
	      return '';
	    }

	    let node = this.head;
	    let objString = `,${node.element ? JSON.stringify(node.element) : node.element}`;

	    for (let i = 1; i < this.size(); i++) {
	      objString += `,${node.element ? JSON.stringify(node.element) : node.element}`;
	      node = node.next;
	    }

	    return objString.substr(1);
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/19
	 * @LastEditors:
	 * @LastEditTime: 2020/11/19
	 */
	class DoubleNode extends Node {
	  constructor(element, next, prev) {
	    super(element, next);
	    this.prev = prev;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/19
	 * @LastEditors:
	 * @LastEditTime: 2020/11/19
	 */
	class DoubleLinkedList extends LinkedList {
	  constructor(equalIsFn = defaultEquals) {
	    super(equalIsFn);
	    this.tail = null;
	  }

	  append(element) {
	    const node = new DoubleNode(element);

	    if (!this.tail) {
	      this.head = node;
	      this.tail = node;
	    } else {
	      let cur = this.tail;
	      cur.next = node;
	      node.prev = cur;
	      this.tail = node;
	    }

	    this.count++;
	    return element;
	  }

	  insert(element, position = 0, dir = 'before') {
	    if (element === undefined) {
	      throw Error('缺少需要插入的元素');
	    }

	    if (position >= this.count) {
	      return this.append(element);
	    }

	    const node = new DoubleNode(element);
	    let cur;
	    const targetNode = dir === 'before' ? this.getElementAt(position - 1) : this.getElementAt(position);

	    if (!targetNode) {
	      cur = this.head;
	      node.next = cur;
	      cur.prev = node;
	      this.head = node;
	    } else {
	      let next;
	      next = targetNode.next;
	      targetNode.next = node;
	      node.prev = targetNode;
	      node.next = next;
	      next.prev = node;
	    }

	    this.count++;
	    return element;
	  }

	  getElementAt(position) {
	    if (position >= 0 && position <= this.count) {
	      if (position > this.count / 2) {
	        let cur = this.tail;

	        for (let i = this.count - 1; i > position; i--) {
	          cur = cur.prev;
	        }

	        return cur;
	      } else {
	        return super.getElementAt(position);
	      }
	    }

	    return undefined;
	  }

	  removeAll() {
	    super.removeAll();
	    this.tail = null;
	  }

	  removeAt(position) {
	    if (position >= 0 && position < this.count) {
	      let cur = this.getElementAt(position);

	      if (position === 0) {
	        this.head = cur.next;
	        cur.next = null;
	        this.prev = null;
	      } else if (position === this.count - 1) {
	        this.tail = cur.prev;
	        this.tail.next = null;
	        cur.prev = null;
	      } else {
	        let prev = cur.prev;
	        let next = cur.next;
	        prev.next = next;
	        next.prev = prev;
	        cur.prev = null;
	        cur.next = null;
	      }

	      this.count--;
	      return cur.element;
	    }

	    return undefined;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/20
	 * @LastEditors:
	 * @LastEditTime: 2020/11/20
	 */
	class CircularLinkedList extends LinkedList {
	  constructor(equalsFn = defaultEquals) {
	    super(equalsFn);
	  }

	  insert(element, position = 0) {
	    if (element === undefined) {
	      return;
	    }

	    let cur = this.head;
	    let node = new Node(element);

	    if (!cur) {
	      this.head = node;
	      node.next = this.head;
	    } else if (position === 0) {
	      let lastNode = this.getElementAt(this.size() - 1);
	      let nextNode = this.head;
	      this.head = node;
	      node.next = nextNode;
	      lastNode.next = node;
	    } else {
	      let prev = this.getElementAt(position - 1);
	      let cur = prev.next;
	      prev.next = node;
	      node.next = cur;
	    }

	    this.count++;
	    return element;
	  }

	  append(element) {
	    let node = new Node(element);
	    let cur = this.head;

	    if (element === undefined) {
	      return undefined;
	    }

	    if (!cur) {
	      this.head = node;
	      node.next = this.head;
	    } else {
	      let cur = this.head;
	      let lastNode = this.getElementAt(this.size() - 1);
	      lastNode.next = node;
	      node.next = cur;
	    }

	    this.count++;
	    return element;
	  }

	  removeAt(idx) {
	    if (idx >= 0 && idx < this.count) {
	      let current = this.head;

	      if (idx === 0) {
	        let lastNode = this.getElementAt(this.size() - 1);
	        this.head = current.next;
	        lastNode.next = current.next;
	      } else {
	        let prev = this.getElementAt(idx - 1);
	        current = prev.next;
	        prev.next = current.next;
	      }

	      this.count--;
	      return current.element;
	    }

	    return undefined;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/26
	 * @LastEditors:
	 * @LastEditTime: 2020/11/26
	 */
	class SortLinkedList extends LinkedList {
	  constructor(equal = defaultEquals, defaultFn = defaultCompare) {
	    super(equal);
	    this.defaultCompare = defaultFn;
	  }

	  insert(element) {
	    if (this.isEmpty()) {
	      return super.insert(element, 0);
	    }

	    let head = this.head;
	    let node = new Node(element);

	    if (!head) {
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

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/11/28
	 * @LastEditors:
	 * @LastEditTime: 2020/11/28
	 */

	class ValueObj {
	  constructor(key, val) {
	    this.key = key;
	    this.value = val;
	  }

	  toString() {
	    return `[#${this.key}:${this.value}]`;
	  }

	}

	class Dictionary {
	  constructor(toStrFn = keyToString) {
	    this.toStrFn = toStrFn;
	    this.dic = {};
	  }

	  set(key, val) {
	    if (key && val) {
	      const resKey = this.toStrFn(key);
	      this.dic[resKey] = new ValueObj(resKey, val);
	      return true;
	    }

	    return false;
	  }

	  remove(key) {
	    if (this.hasKey(key)) {
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
	    if (!this.root) {
	      this.root = new TreeNode(key);
	    } else {
	      this.insertNode(this.root, key);
	    }
	  }

	  insertNode(node, key) {
	    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
	      const leftNode = node.left;

	      if (!leftNode) {
	        node.left = new TreeNode(key);
	      } else {
	        this.insertNode(leftNode, key);
	      }
	    } else {
	      const rightNode = node.right;

	      if (!rightNode) {
	        node.right = new TreeNode(key);
	      } else {
	        this.insertNode(rightNode, key);
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
	      if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
	        return this.searchNode(node.left, key);
	      } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
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

	    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
	      node.left = this.removeNode(node.left, key);
	      return node;
	    } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
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

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/8
	 * @LastEditors:
	 * @LastEditTime: 2020/12/8
	 */
	class AVLTree extends BinarySearchTree {
	  constructor(compareFn = defaultCompare) {
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

	    return this.rotationRR(node); // 再对整个失去平衡的树进行右旋转
	  }

	  insert(key) {
	    this.root = this.insertNode(this.root, key);
	  }

	  insertNode(node, key) {
	    if (!node) {
	      // 说明已经到了叶节点没有下一个节点了，这个时候可以创建一个新节点作为上一个节点的子节点
	      return new TreeNode(key);
	    } else if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
	      // 如果插入的数比节点的左节点要小
	      node.left = this.insertNode(node.left, key); // 递归查找左节点
	    } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
	      // 如果插入的数比右节点要大
	      node.right = this.insertNode(node.right, key); // 递归查找右节点
	    } else {
	      return node; // 相等说明插入了相同的数不做操作
	    }

	    const balanceFactor = this.getBalanceFactor(node); // 获取该节点的平衡因子

	    if (balanceFactor === BALANCEFACTOR.UNBALANCED_LEFT) {
	      // 说明是左子树失去平衡
	      if (this.compareFn(key, node.left.key) === COMPARE.LESS_THAN) {
	        // 如果新插入的数比失去平衡的左子树数要小，则是LL型旋转
	        node = this.rotationLL(node);
	      } else {
	        // 否则说明新增元素是插入失去平衡节点的左子树的右侧插入，则是LR旋转
	        return this.rotationLR(node);
	      }
	    }

	    if (balanceFactor === BALANCEFACTOR.UNBALANCED_RIGHT) {
	      // 说明是右子树失去平衡
	      if (this.compareFn(key, node.right.key) === COMPARE.BIGGER_THAN) {
	        // 如果新插入的数比失去平衡的右子树数要大，则是RR型旋转
	        node = this.rotationRR(node);
	      } else {
	        // 否则说明新增元素是插入失去平衡节点的右子树的左侧插入，则是RL旋转
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

	    if (balanceFactor === BALANCEFACTOR.UNBALANCED_LEFT) {
	      const balanceFactorLeft = this.getBalanceFactor(node.left);

	      if (balanceFactorLeft === BALANCEFACTOR.BALANCED || balanceFactorLeft === BALANCEFACTOR.SLIGHTLY_UNBALANCED_LEFT) {
	        return this.rotationLL(node);
	      }

	      if (balanceFactorLeft === BALANCEFACTOR.SLIGHTLY_UNBALANCED_RIGHT) {
	        return this.rotationLR(node.left);
	      }
	    }

	    if (balanceFactor === BALANCEFACTOR.UNBALANCED_RIGHT) {
	      const balanceFactorRight = this.getBalanceFactor(node.right);

	      if (balanceFactorRight === BALANCEFACTOR.BALANCED || balanceFactorRight === BALANCEFACTOR.SLIGHTLY_UNBALANCED_RIGHT) {
	        return this.rotationRR(node);
	      }

	      if (balanceFactorRight === BALANCEFACTOR.SLIGHTLY_UNBALANCED_LEFT) {
	        return this.rotationRL(node.right);
	      }
	    }

	    return node;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/15
	 * @LastEditors:
	 * @LastEditTime: 2020/12/15
	 */
	class MinHeap {
	  constructor(compareFn = defaultCompare) {
	    this.heap = [];
	    this.comparFn = compareFn;
	  }

	  getParentIndex(i) {
	    return i ? Math.floor((i - 1) / 2) : undefined;
	  }

	  getLeftIndex(i) {
	    return 2 * i + 1;
	  }

	  getRightIndex(i) {
	    return 2 * i + 2;
	  }

	  insert(val) {
	    if (val != null) {
	      this.heap.push(val);
	      this.siftUp(this.heap.length - 1);
	      return true;
	    }

	    return false;
	  }

	  siftUp(index) {
	    let parent = this.getParentIndex(index);

	    while (index > 0 && this.comparFn(this.heap[parent], this.heap[index]) === COMPARE.BIGGER_THAN) {
	      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
	      index = parent;
	      parent = this.getParentIndex(index);
	    }
	  }

	  size() {
	    return this.heap.length;
	  }

	  isEmpty() {
	    return this.heap.length === 0;
	  }

	  findMinnum() {
	    return this.heap[0];
	  }

	  extract() {
	    if (this.isEmpty()) {
	      return undefined;
	    }

	    if (this.size() === 1) {
	      return this.heap.shift();
	    }

	    swap(this.heap, 0, this.size() - 1);
	    const resultVal = this.heap.pop();
	    this.siftDown(0);
	    return resultVal;
	  }

	  getAsArray() {
	    return this.heap;
	  }

	  heapify(arry) {
	    if (arr) {
	      this.heap = arry;
	    }

	    const len = Math.floor(this.size() / 2) - 1;

	    for (let i = 0; i < len; i++) {
	      this.siftDown(i);
	    }

	    return this.heap;
	  }

	  siftDown(i) {
	    let ele = i;
	    const left = this.getLeftIndex(i);
	    const right = this.getRightIndex(i);
	    const size = this.size();

	    if (left < size && this.comparFn(this.heap[ele], this.heap[left]) === COMPARE.BIGGER_THAN) {
	      ele = left;
	    }

	    if (right < size && this.comparFn(this.heap[ele], this.heap[right]) === COMPARE.BIGGER_THAN) {
	      ele = right;
	    }

	    if (i !== ele) {
	      swap(this.heap, i, ele);
	      this.siftDown(ele);
	    }
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/15
	 * @LastEditors:
	 * @LastEditTime: 2020/12/15
	 */
	class MaxHeap extends MinHeap {
	  constructor(compareFn = defaultCompare) {
	    super(compareFn);
	    this.comparFn = reverseCompare(compareFn);
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/16
	 * @LastEditors:
	 * @LastEditTime: 2020/12/16
	 */
	class Graph {
	  constructor(isDir = false) {
	    this.isDir = isDir;
	    this.vertices = [];
	    this.adjList = new Dictionary();
	  }

	  addVertex(v) {
	    if (!this.vertices.includes(v)) {
	      this.vertices.push(v);
	      this.adjList.set(v, []);
	    }
	  }

	  addEdge(v, w) {
	    if (!this.adjList.get(v)) {
	      this.addVertex(v);
	    }

	    if (!this.adjList.get(w)) {
	      this.addVertex(w);
	    }

	    this.adjList.get(v).push(w);

	    if (!this.isDir) {
	      this.adjList.get(w).push(v);
	    }
	  }

	  getVertices() {
	    return this.vertices;
	  }

	  length() {
	    return this.vertices.length;
	  }

	  getadjList() {
	    return this.adjList;
	  }

	  toString() {
	    let str = '';

	    for (let i = 0; i < this.vertices.length; i++) {
	      let vertice = this.vertices[i];
	      str += `${vertice} --> `;
	      let adjList = this.adjList.get(vertice);

	      for (let j = 0; j < adjList.length; j++) {
	        str += ` ${adjList[j]}`;
	      }

	      str += '\n';
	    }

	    return str;
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/16
	 * @LastEditors:
	 * @LastEditTime: 2020/12/16
	 */
	class Queue {
	  constructor() {
	    this.counter = 0; // 计数器计算队列大小

	    this.items = {}; // 队列存储

	    this.lowestCount = 0; // 队列头
	  } // 返回队列首位


	  peek() {
	    return this.items[this.lowestCount];
	  }

	  enqueue(element) {
	    this.items[this.counter] = element;
	    this.counter++;
	  }

	  dequeue() {
	    if (this.isEmpty()) {
	      return undefined;
	    }

	    const result = this.items[this.lowestCount];
	    delete this.items[this.lowestCount];
	    this.lowestCount++;
	    return result;
	  }

	  isEmpty() {
	    return this.size() === 0;
	  }

	  size() {
	    return this.counter - this.lowestCount;
	  }

	  clear() {
	    this.counter = 0;
	    this.lowestCount = 0;
	    this.items = {};
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/16
	 * @LastEditors:
	 * @LastEditTime: 2020/12/16
	 */
	const COLORS = {
	  WHITE: 0,
	  // 表示该顶点还没有被访问
	  GREY: 1,
	  // 表示该顶点还没有被访问
	  BLACK: 2 // 表示该顶点还没有被访问

	};

	const initializeColor = vertices => {
	  const color = {};

	  for (let i = 0; i < vertices.length; i++) {
	    color[vertices[i]] = COLORS.WHITE;
	  }

	  return color;
	}; // 优先广度搜索遍历


	const breadthFirstSearch = (grapth, startVertice, callback) => {
	  const adjList = grapth.getadjList();
	  const vertice = grapth.getVertices();
	  const Colors = initializeColor(vertice);
	  const queue = new Queue();
	  queue.enqueue(startVertice);

	  while (!queue.isEmpty()) {
	    const curVertice = queue.dequeue();
	    const neighbors = adjList.get(curVertice);
	    Colors[curVertice] = COLORS.GREY;

	    for (let i = 0; i < neighbors.length; i++) {
	      const neighV = neighbors[i];

	      if (Colors[neighV] === COLORS.WHITE) {
	        Colors[neighV] = COLORS.GREY;
	        queue.enqueue(neighV);
	      }
	    }

	    Colors[curVertice] = COLORS.BLACK;

	    if (typeof callback == 'function') {
	      callback(curVertice);
	    }
	  }
	}; // 优先广度搜索遍历

	const BFS = (grapth, startVertice) => {
	  const adjList = grapth.getadjList();
	  const vertice = grapth.getVertices();
	  const Colors = initializeColor(vertice);
	  const queue = new Queue();
	  const distance = {};
	  const hashMap = {};

	  for (let i = 0; i < vertice.length; i++) {
	    distance[vertice[i]] = 0;
	    hashMap[vertice[i]] = null;
	  }

	  queue.enqueue(startVertice);

	  while (!queue.isEmpty()) {
	    const curVertice = queue.dequeue();
	    const neighbors = adjList.get(curVertice);
	    Colors[curVertice] = COLORS.GREY;

	    for (let i = 0; i < neighbors.length; i++) {
	      const neighV = neighbors[i];

	      if (Colors[neighV] === COLORS.WHITE) {
	        distance[neighV] = distance[curVertice] + 1;
	        hashMap[neighV] = curVertice;
	        Colors[neighV] = COLORS.GREY;
	        queue.enqueue(neighV);
	      }
	    }

	    Colors[curVertice] = COLORS.BLACK;
	  }

	  return {
	    distance,
	    hashMap
	  };
	};

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/18
	 * @LastEditors:
	 * @LastEditTime: 2020/12/18
	 */
	class Stack {
	  constructor() {
	    this.counter = 0;
	    this.items = {};
	  }

	  push(val) {
	    this.items[this.counter] = val;
	    this.counter++;
	  }

	  size() {
	    return this.counter;
	  }

	  isEmpty() {
	    return this.counter === 0;
	  }

	  pop() {
	    if (this.isEmpty()) {
	      return undefined;
	    }

	    this.counter--;
	    const res = this.items[this.counter];
	    delete this.items[this.counter];
	    return res;
	  }

	  peek() {
	    return this.items[this.counter - 1];
	  }

	  clear() {
	    this.counter = 0;
	    this.items = {};
	  }

	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/18
	 * @LastEditors:
	 * @LastEditTime: 2020/12/18
	 */
	const COLORS$1 = {
	  WHITE: 0,
	  // 表示该顶点还没有被访问
	  GREY: 1,
	  // 表示该顶点还没有被访问
	  BLACK: 2 // 表示该顶点还没有被访问

	};

	const initializeColor$1 = vertices => {
	  const color = {};

	  for (let i = 0; i < vertices.length; i++) {
	    color[vertices[i]] = COLORS$1.WHITE;
	  }

	  return color;
	};

	const depthFirstSearchVisit = (curVer, Color, adjList, callback) => {
	  Color[curVer] = COLORS$1.GREY;
	  callback && callback(curVer);
	  let curAdj = adjList.get(curVer);

	  for (let j = 0; j < curAdj.length; j++) {
	    let neighVer = curAdj[j];

	    if (Color[neighVer] === COLORS$1.WHITE) {
	      depthFirstSearchVisit(neighVer, Color, adjList, callback);
	    }
	  }

	  Color[curVer] = COLORS$1.BLACK; // callback && callback(curVer);
	}; // 优先深度遍历搜索

	const depthFirstSearch = (grapth, callback) => {
	  const vertices = grapth.getVertices();
	  const adjList = grapth.getadjList();
	  const Color = initializeColor$1(vertices);

	  for (let i = 0; i < vertices.length; i++) {
	    let curVer = vertices[i];

	    if (Color[curVer] === COLORS$1.WHITE) {
	      depthFirstSearchVisit(curVer, Color, adjList, callback);
	    }
	  }
	};
	const DFS = grapth => {
	  const vertices = grapth.getVertices();
	  const adjList = grapth.getadjList();
	  const Color = initializeColor$1(vertices);
	  const d = {};
	  const f = {};
	  const p = {};
	  const time = {
	    counter: 0
	  };
	  vertices.forEach(val => {
	    d[val] = 0;
	    f[val] = 0;
	    p[val] = null;
	  });

	  for (let i = 0; i < vertices.length; i++) {
	    let curVer = vertices[i];

	    if (Color[curVer] === COLORS$1.WHITE) {
	      DFSVisit(curVer, Color, d, f, p, time, adjList);
	    }
	  }

	  return {
	    discovery: d,
	    finished: f,
	    predecessors: p
	  };
	};
	const DFSVisit = (curVer, Color, d, f, p, time, adjList) => {
	  Color[curVer] = COLORS$1.GREY;
	  d[curVer] = ++time.counter;
	  let curAdj = adjList.get(curVer);

	  for (let j = 0; j < curAdj.length; j++) {
	    let neighVer = curAdj[j];

	    if (Color[neighVer] === COLORS$1.WHITE) {
	      p[neighVer] = curVer;
	      DFSVisit(neighVer, Color, d, f, p, time, adjList);
	    }
	  }

	  Color[curVer] = COLORS$1.BLACK;
	  f[curVer] = ++time.counter;
	};

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/22
	 * @LastEditors:
	 * @LastEditTime: 2020/12/22
	 */
	function countingSort(array) {
	  if (array.length < 2) {
	    return array;
	  }

	  let maxVal = findMaxValue(array);
	  let counts = new Array(maxVal + 1);
	  array.forEach(ele => {
	    if (!counts[ele]) {
	      counts[ele] = 0;
	    }

	    counts[ele]++;
	  });
	  let sortedIndex = 0;
	  counts.forEach((count, i) => {
	    while (count > 0) {
	      array[sortedIndex++] = i;
	      count--;
	    }
	  });
	  return array;
	}

	const findMaxValue = array => {
	  let max = array[0];

	  for (let i = 1; i < array.length; i++) {
	    if (array[i] > max) {
	      max = array[i];
	    }
	  }

	  return max;
	};

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/18
	 * @LastEditors:
	 * @LastEditTime: 2020/12/18
	 */
	const linkedList = new LinkedList();
	linkedList.append({
	  val: 0
	});
	linkedList.append({
	  val: 1
	});
	linkedList.append({
	  val: 2
	});
	linkedList.append({
	  val: 3
	});
	linkedList.append({
	  val: 4
	});
	linkedList.append({
	  val: 5
	});
	console.log(linkedList, '====='); // console.log(linkedList.removeAt(5));
	// console.log(linkedList);

	const doubleLinkList = new DoubleLinkedList();
	console.log(doubleLinkList);
	const circularLinkedList = new CircularLinkedList();
	const sortLinkedList = new SortLinkedList();
	const tree = new BinarySearchTree();
	tree.insert(1);
	tree.insert(2);
	tree.insert(3);
	tree.insert(4);
	tree.insert(5);
	tree.insert(6);
	tree.insert(7);
	tree.insert(8);
	tree.insert(9);
	tree.insert(10);
	tree.insert(11);
	tree.insert(12);
	tree.insert(13);
	tree.insert(18);
	tree.insert(25);
	let arr$1 = [];
	tree.prevOrderTraverse(key => arr$1.push(key));
	console.log(arr$1, '先序搜索：prevOrderTraverse；搜索二叉树，退化成一个线性链表');
	const avltree = new AVLTree();
	avltree.insert(10);
	avltree.insert(8);
	avltree.insert(12);
	avltree.insert(4);
	avltree.insert(9);
	avltree.insert(11);
	avltree.insert(13);
	avltree.insert(3);
	avltree.insert(5); // avltree.insert(7);
	// avltree.insert(8);
	// avltree.insert(9);
	// avltree.insert(10);
	// avltree.insert(11);
	// avltree.insert(12);
	// avltree.insert(13);
	// avltree.insert(18);
	// avltree.insert(25);

	let avlarr = [];
	avltree.prevOrderTraverse(key => avlarr.push(key));
	console.log(avlarr, '先序搜索：prevOrderTraverse；平衡将线性化树重新平衡为树结构');
	const minHeap = new MinHeap();

	for (let i = 1; i < 10; i++) {
	  minHeap.insert(i);
	}

	const maxHeap = new MaxHeap();

	for (let i = 1; i < 10; i++) {
	  maxHeap.insert(i);
	}

	const graph = new Graph();
	graph.addVertex('A');
	graph.addVertex('B');
	graph.addVertex('C');
	graph.addVertex('D');
	graph.addVertex('E');
	graph.addVertex('F');
	graph.addVertex('G');
	graph.addVertex('H');
	graph.addVertex('I');
	graph.addEdge('A', 'B');
	graph.addEdge('A', 'C');
	graph.addEdge('A', 'D');
	graph.addEdge('B', 'E');
	graph.addEdge('B', 'F');
	graph.addEdge('E', 'I');
	graph.addEdge('C', 'D');
	graph.addEdge('C', 'G');
	graph.addEdge('D', 'G');
	graph.addEdge('D', 'H');
	let BFSResult = BFS(graph, 'A');
	console.log(BFSResult, 'BFSResult');
	const path = [];
	breadthFirstSearch(graph, 'A', val => {
	  path.push(val);
	});
	depthFirstSearch(graph, val => {
	  console.log('depth:' + val);
	});
	const DFSArr = DFS(graph);
	console.log(DFSArr, 'DFSArr');
	console.log(path.join('-->'), 'breadthFirstSearch');
	const myVertices = graph.getVertices();
	const fromVertex = myVertices[0];

	for (let i = 1; i < myVertices.length; i++) {
	  let toV = myVertices[i];
	  let url = new Stack();

	  for (let v = toV; v && v != fromVertex; v = BFSResult.hashMap[toV]) {
	    url.push(v);
	    toV = v;
	  }

	  url.push(fromVertex);
	  let str = url.pop();

	  while (!url.isEmpty()) {
	    str += '-->' + url.pop();
	  }

	  console.log(str);
	} // console.log(bubbleSort([9,8,7,6,5,4,3,2,1]));


	const sortArr = [9, 8, 7, 6, 5, 4, 3, 2, 1]; // console.time('构建数组')
	// for (let i = 1; i < 1000;i++) {
	// 	if(Math.random() < 0.5) {
	// 		sortArr.push(i);
	// 	} else {
	// 		sortArr.unshift(i);
	// 	}
	// }
	// console.timeEnd('构建数组'); // 1395.03076171875ms
	// console.time('冒泡排序');
	// // console.log(bubbleSort(sortArr));
	// bubbleSort(sortArr)
	// console.timeEnd('冒泡排序'); // 冒泡排序: 22628.14990234375ms
	// console.time('选择排序');
	// // console.log(insertionSort(sortArr));
	// insertionSort(sortArr)
	// console.timeEnd('选择排序');// 选择排序:  15373.854736328125ms
	// console.time('归并排序');
	// // console.log(mergeSort(sortArr));
	// mergeSort(sortArr)
	// console.timeEnd('归并排序'); // 归并排序:90.333984375ms
	// console.time('快速排序');
	// // console.log(quickSort(sortArr));
	// quickSort(sortArr)
	// console.timeEnd('快速排序'); //快速排序: 76.9599609375ms

	console.time('计数排序');
	console.log(countingSort(sortArr));
	console.timeEnd('计数排序');

})));
//# sourceMappingURL=main.js.map
