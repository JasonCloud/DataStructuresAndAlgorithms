(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MinHeap = factory());
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
	 * @Date: 2020/12/15
	 * @LastEditors:
	 * @LastEditTime: 2020/12/15
	 */
	const COMPARE$1 = {
	  EQUAL: 0,
	  LESS_THAN: -1,
	  BIGGER_THAN: 1
	};
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

	    while (index > 0 && this.comparFn(this.heap[parent], this.heap[index]) === COMPARE$1.BIGGER_THAN) {
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

	    [this.heap[0], this.heap[this.size() - 1]] = [this.heap[this.size() - 1], this.heap[0]];
	    const resultVal = this.heap.pop();
	    this.siftDown(0);
	    return resultVal;
	  }

	  siftDown(i) {
	    let ele = i;
	    const left = this.getLeftIndex(i);
	    const right = this.getRightIndex(i);
	    const size = this.size();

	    if (left < size && this.comparFn(this.heap[ele], this.heap[left]) == COMPARE$1.BIGGER_THAN) {
	      ele = left;
	    }

	    if (right < size && this.comparFn(this.heap[ele], this.heap[right]) == COMPARE$1.BIGGER_THAN) {
	      ele = right;
	    }

	    if (i !== ele) {
	      [this.heap[i], this.heap[ele]] = [this.heap[ele], this.heap[i]];
	      this.siftDown(ele);
	    }
	  }

	}

	return MinHeap;

})));
//# sourceMappingURL=MinHeap.js.map
