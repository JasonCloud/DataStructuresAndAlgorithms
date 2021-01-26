/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/20
 * @LastEditors:
 * @LastEditTime: 2021/1/20
 */
import Stack from "./StackArr";

// 操作符
const precedenceMap = {
	'(': -1,
	')': 0,
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2,
};

// 是否允许进行计算
function isAllow(numStack, operatorStack) {
	//  数字栈存在两个值，操作符栈有1个值
	return numStack.size() >= 2 && operatorStack.size() >= 1;
}
// 计算
export const calculation = (numStack, operatorStack, operator) => {
	// 取出两个数值
	let e2 = numStack.pop();
	let e1 = numStack.pop();
	// 取出
	let op = operatorStack.pop();
	// 计算并保存结果值
	let fn = operator[op];
	if (fn) numStack.push(fn(e1, e2));
};

export const parseTokens = (tokens, ops) => {
	// 操作符栈
	let operatorStack = new Stack();
	// 数字栈
	let numStack = new Stack();
	// 操作符绑定计算函数
	ops = ops || {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	};
	while (!tokens.isEmpty()){
		let token = tokens.dequeue();
		if (token.value == '(') {
			operatorStack.push(token.value);
		} else if (token.type == "number") {
			numStack.push(Number(token.value));
		} else if (token.type == "operator" || token.type == "Punctuator") {
			// 允许计算 且 上一个优先级大于当前字符优先级 则先计算
			while (isAllow(numStack, operatorStack) && precedenceMap[token.value] <= precedenceMap[operatorStack.peek()])
				calculation(numStack, operatorStack, ops);
			// 括号结束要将起始的括号去掉
			if (token.value == ')'){
				operatorStack.pop();
			} else {
				operatorStack.push(token.value);
			}
		} else {
			console.error('错误');
			break;
		}
	}
	while (isAllow(numStack, operatorStack)) {
		calculation(numStack, operatorStack, ops);
	}
	return numStack.pop();
};
