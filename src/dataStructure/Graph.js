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
		this.adList = new Dictionary();
	}
	addVertex(v) {
		if(!this.vertices.includes(v)) {
			this.vertices.push(v);
			this.adList.set(v, []);
		}
	}
	addEdge(v, w) {
		if (!this.adList.get(v)) {
			this.addVertex(v);
		}
		if (!this.adList.get(w)) {
			this.addVertex(w);
		}
		this.adList.get(v).push(w);
		if (!this.isDir) {
			this.adList.get(w).push(v);
		}
	}
}
