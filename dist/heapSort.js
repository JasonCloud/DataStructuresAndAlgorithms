(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.heapSort = factory());
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
	function swap(arr, index1, index2) {
	  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
	}

	/**
	 * @Description:
	 * @Author:  wuenyou
	 * @Date: 2020/12/16
	 * @LastEditors:
	 * @LastEditTime: 2020/12/16
	 */

	function heapify(array, index, heapSize, compareFn) {
	  let largest = index;
	  const left = 2 * index + 1;
	  const right = 2 * index + 2;

	  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
	    largest = left;
	  }

	  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
	    largest = right;
	  }

	  if (largest !== index) {
	    swap(array, index, largest);
	    heapify(array, largest, heapSize, compareFn);
	  }
	}

	function buildMaxHeap(array, compareFn) {
	  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
	    heapify(array, i, array.length, compareFn);
	  }

	  return array;
	}

	function heapSort(array, compareFn = defaultCompare) {
	  let heapSize = array.length;
	  buildMaxHeap(array, compareFn);

	  while (heapSize > 1) {
	    swap(array, 0, --heapSize);
	    heapify(array, 0, heapSize, compareFn);
	  }

	  return array;
	}

	return heapSort;

})));
//# sourceMappingURL=heapSort.js.map
