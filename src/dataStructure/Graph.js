/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/16
 * @LastEditors:
 * @LastEditTime: 2020/12/16
 */
import Dictionary from "./Dictionary";

export default class Graph {
	constructor(isDir = false) {
		this.isDir = isDir;
		this.vertices = [];
		this.adjList = new Dictionary();
	}
	addVertex(v) {
		if(!this.vertices.includes(v)) {
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
			let vertice = this.vertices[i]
			str += `${vertice} --> `;
			let adjList = this.adjList.get(vertice);
			for (let j = 0; j < adjList.length; j++) {
				str += ` ${adjList[j]}`
			}
			str +='\n'
		}
		return str;
	}
}
