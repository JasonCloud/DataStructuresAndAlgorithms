(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DoubleLinkedList = factory());
}(this, (function () { 'use strict';

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

	return DoubleLinkedList;

})));
//# sourceMappingURL=DoubleLinkedList.js.map
