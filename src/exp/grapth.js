/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/18
 * @LastEditors:
 * @LastEditTime: 2020/12/18
 */
import {BFS} from "../algorithms/grapth/breadthFirstSearch";
import Graph from "../dataStructure/Graph";
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('I');
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('C','D');
graph.addEdge('C','B');
graph.addEdge('D','E');
graph.addEdge('E','F');
graph.addEdge('F','D');
graph.addEdge('F','G');
graph.addEdge('G','I');
let BFSResult = BFS(graph, 'A');
console.log(BFSResult, 'BFSResult')
