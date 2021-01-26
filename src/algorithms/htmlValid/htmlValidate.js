/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/17
 * @LastEditors:
 * @LastEditTime: 2021/1/17
 */
import Stack from "../../dataStructure/StackArr";

const startHtmlReg = /^<([^>|\/]+)>/i;
const endHtmlReg = /^<\/([^>]+)>/i;
const htmlElement =  /<[^>]+>/gi;
export const htmlValidate = (html) => {
	const stack = new Stack();
	html = html.match(htmlElement).join('');
	while (html) {
		let start = html.match(startHtmlReg);
		let end = html.match(endHtmlReg);
		if (start){
			stack.push(start[1]);
			html = html.substr(start[0].length);
		}
		if (end) {
			stack.pop();
			html = html.substr(end[0].length);
		}
		if (!end && !start) {
			break;
		}
	}
	return stack.isEmpty();
}
