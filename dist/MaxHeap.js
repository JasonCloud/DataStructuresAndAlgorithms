(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MaxHeap = factory());
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
	function swap(arr, index1, index2) {
	  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
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

	return MaxHeap;

})));
//# sourceMappingURL=MaxHeap.js.map
