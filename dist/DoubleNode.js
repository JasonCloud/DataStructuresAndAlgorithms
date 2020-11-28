(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DoubleNode = {}));
}(this, (function (exports) { 'use strict';

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

	exports.DoubleNode = DoubleNode;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=DoubleNode.js.map
