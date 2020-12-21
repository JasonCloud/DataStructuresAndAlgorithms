(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

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
	};
	const BFS = (graph, startVertice) => {
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
	        distance[neighV] = distance[neighV] + 1;
	        distance[neighV] = curVertice;
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
	 * @Date: 2020/11/18
	 * @LastEditors:
	 * @LastEditTime: 2020/11/18
	 */
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
	 * @Date: 2020/12/18
	 * @LastEditors:
	 * @LastEditTime: 2020/12/18
	 */
	const graph = new Graph();
	graph.addVertex('A');
	graph.addVertex('B');
	graph.addVertex('C');
	graph.addVertex('D');
	graph.addVertex('E');
	graph.addVertex('F');
	graph.addVertex('G');
	graph.addVertex('I');
	graph.addEdge('A', 'B');
	graph.addEdge('A', 'C');
	graph.addEdge('C', 'D');
	graph.addEdge('C', 'B');
	graph.addEdge('D', 'E');
	graph.addEdge('E', 'F');
	graph.addEdge('F', 'D');
	graph.addEdge('F', 'G');
	graph.addEdge('G', 'I');
	let BFSResult = BFS(graph, 'A');
	console.log(BFSResult, 'BFSResult');

})));
//# sourceMappingURL=Graph.js.map
