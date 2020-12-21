/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/18
 * @LastEditors:
 * @LastEditTime: 2020/12/18
 */
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
};
export const depthFirstSearchVisit = (curVer, Color, adjList, callback) => {
	Color[curVer] = COLORS.GREY;
	callback && callback(curVer);
	let curAdj = adjList.get(curVer);
	for (let j = 0; j < curAdj.length; j++) {
		let neighVer = curAdj[j];
		if (Color[neighVer] === COLORS.WHITE) {
			depthFirstSearchVisit(neighVer, Color,adjList, callback);
		}
	}
	Color[curVer] = COLORS.BLACK;
	// callback && callback(curVer);
}
// 优先深度遍历搜索
export const depthFirstSearch = (grapth, callback) => {
	const vertices = grapth.getVertices();
	const adjList = grapth.getadjList();
	const Color = initializeColor(vertices);

	for (let i = 0; i < vertices.length; i++) {
		let curVer = vertices[i];
		if (Color[curVer] === COLORS.WHITE) {
			depthFirstSearchVisit(curVer, Color, adjList, callback);
		}
	}

};

export const DFS = (grapth) => {
	const vertices = grapth.getVertices();
	const adjList = grapth.getadjList();
	const Color = initializeColor(vertices);
	const d = {};
	const f = {};
	const p = {};
	const time = {
		counter: 0
	};
	vertices.forEach((val) => {
		d[val] = 0;
		f[val] = 0;
		p[val] = null;
	})
	for (let i = 0; i < vertices.length; i++) {
		let curVer = vertices[i];
		if (Color[curVer] === COLORS.WHITE) {
			DFSVisit(curVer, Color, d, f, p, time, adjList);
		}
	}
	return {
		discovery: d,
		finished: f,
		predecessors: p
	}
};
export const DFSVisit = (curVer, Color, d, f, p, time, adjList) => {
	Color[curVer] = COLORS.GREY;
	d[curVer] = ++ time.counter;
	let curAdj = adjList.get(curVer);
	for (let j = 0; j < curAdj.length; j++) {
		let neighVer = curAdj[j];
		if (Color[neighVer] === COLORS.WHITE) {
			p[neighVer] = curVer;
			DFSVisit(neighVer,  Color, d, f, p, time, adjList);
		}
	}
	Color[curVer] = COLORS.BLACK;
	f[curVer] = ++time.counter;
}
