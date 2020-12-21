/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/18
 * @LastEditors:
 * @LastEditTime: 2020/12/18
 */
import LinkedList from "./dataStructure/LinkedList";
import DoubleLinkedList from "./dataStructure/DoubleLinkedList";
import CircularLinkedList from "./dataStructure/CircularLinkedList";
import SortLinkedList from "./dataStructure/SortLinkedList";
import MySet from "./dataStructure/MySet";
import Dictionary from "./dataStructure/Dictionary";
import BinarySearchTree from "./dataStructure/BinarySearchTree";
import AVLTree from "./dataStructure/AVLTree";
import MinHeap from "./dataStructure/MinHeap";
import MaxHeap from "./dataStructure/MaxHeap";
import Graph from "./dataStructure/Graph";
import {BFS, breadthFirstSearch} from "./algorithms/grapth/breadthFirstSearch";
import Stack from "./dataStructure/Stack";
import {depthFirstSearch, DFS} from "./algorithms/grapth/depthFirstSearch";

const linkedList = new LinkedList();
linkedList.append({val:0});
linkedList.append({val:1});
linkedList.append({val:2});
linkedList.append({val:3});
linkedList.append({val:4});
linkedList.append({val:5});
console.log(linkedList, '=====')
// console.log(linkedList.removeAt(5));
// console.log(linkedList);
const doubleLinkList = new DoubleLinkedList()
console.log(doubleLinkList)
const circularLinkedList = new CircularLinkedList();
const sortLinkedList = new SortLinkedList();
const mySet = new MySet();
const dictionary = new Dictionary();
const tree = new BinarySearchTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);
tree.insert(8);
tree.insert(9);
tree.insert(10);
tree.insert(11);
tree.insert(12);
tree.insert(13);
tree.insert(18);
tree.insert(25);
let arr = [];
tree.prevOrderTraverse((key) => arr.push(key));
console.log(arr, '先序搜索：prevOrderTraverse；搜索二叉树，退化成一个线性链表');
const avltree = new AVLTree();
avltree.insert(10);
avltree.insert(8);
avltree.insert(12);
avltree.insert(4);
avltree.insert(9);
avltree.insert(11);
avltree.insert(13);
avltree.insert(3);
avltree.insert(5);
// avltree.insert(7);
// avltree.insert(8);
// avltree.insert(9);
// avltree.insert(10);
// avltree.insert(11);
// avltree.insert(12);
// avltree.insert(13);
// avltree.insert(18);
// avltree.insert(25);
let avlarr = [];
avltree.prevOrderTraverse((key) => avlarr.push(key));
console.log(avlarr, '先序搜索：prevOrderTraverse；平衡将线性化树重新平衡为树结构');
const minHeap = new MinHeap();
for(let i = 1; i < 10; i++) {
	minHeap.insert(i)
}
const maxHeap = new MaxHeap();
for(let i = 1; i < 10; i++) {
	maxHeap.insert(i)
}
const graph = new Graph()
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
let BFSResult = BFS(graph, 'A');
console.log(BFSResult, 'BFSResult');
const path = [];
breadthFirstSearch(graph, 'A', (val) => {
	path.push(val);
});
depthFirstSearch(graph, (val) => {
	console.log('depth:' + val);
});
const DFSArr = DFS(graph);
console.log(DFSArr, 'DFSArr')
console.log(path.join('-->'), 'breadthFirstSearch');
const myVertices = graph.getVertices();
const fromVertex = myVertices[0];
for (let i = 1; i < myVertices.length; i++ ) {
	let toV = myVertices[i];
	let url = new Stack();
	for (let v = toV; v && v != fromVertex; v = BFSResult.hashMap[toV]) {
		url.push(v);
		toV = v;
	}
	url.push(fromVertex);
	let str = url.pop();
	while (!url.isEmpty()) {
		str += '-->' + url.pop();
	}
	console.log(str);
}
