/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/16
 * @LastEditors:
 * @LastEditTime: 2020/12/16
 */
import Queue from "../../dataStructure/Queue";

const COLORS = {
	WHITE: 0, // 表示该顶点还没有被访问
	GREY: 1, // 表示该顶点还没有被访问
	BLACK: 2, // 表示该顶点还没有被访问
};
const initializeColor = vertices => {
	const color = {};
	for (let i = 0; i < vertices.length; i++) {
		color[vertices[i]] = COLORS.WHITE;
	}
	return color;
}
// 优先广度搜索遍历
export const breadthFirstSearch = (grapth, startVertice, callback) => {
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
			if(Colors[neighV] === COLORS.WHITE) {
				Colors[neighV] = COLORS.GREY;
				queue.enqueue(neighV);
			}
		}
		Colors[curVertice] = COLORS.BLACK;
		if (typeof callback == 'function') {
			callback(curVertice);
		}
	}
};
// 优先广度搜索遍历
export const BFS = (grapth, startVertice) => {
	const adjList = grapth.getadjList();
	const vertice = grapth.getVertices();
	const Colors = initializeColor(vertice);
	const queue = new Queue();
	const distance = {};
	const hashMap = {};
	for(let i = 0; i < vertice.length; i++) {
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
			if(Colors[neighV] === COLORS.WHITE) {
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
	}
}
