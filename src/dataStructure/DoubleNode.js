/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/11/19
 * @LastEditors:
 * @LastEditTime: 2020/11/19
 */
import {Node} from "./Node";

export class DoubleNode extends Node{
	constructor(element, next, prev){
		super(element, next);
		this.prev = prev;
	}
}
