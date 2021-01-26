/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/20
 * @LastEditors:
 * @LastEditTime: 2021/1/20
 */
// 错误显示
function printErrStr(str, i) {
	let ss = "";
	for (let ii = 0; ii < str.length; ii++)
		ss = ss + (i == ii ? '^' : ' ');
	return str + '\n' + ss
}
// 格式过滤与语法检测
export function tokenCode(str) {
	// 保存字符串解析结果值与描述信息
	let tokens = [];
	let token, currentChar;
	// 上一个记录的token值
	let prev = {};
	// 括号索引统计
	let bract = [];
	for (let i = 0; i < str.length; i++) {
		currentChar = str[i];
		if (currentChar == ' ') continue;
		if (/[0-9]/.test(currentChar)) {
			token = {
				type: 'number',
				value: currentChar,
			};
			// 是否存在小数点
			let pot = false;
			// 是否存在空格
			let space = false;
			for (i++; i < str.length; i++) {
				currentChar = str.charAt(i);
				if (/[0-9]/.test(currentChar)) {
					if (space) throw new Error(`数字格式不正确  \n索引 ${i},字符 ${currentChar} \n${printErrStr(str, i)}`);
					token.value += currentChar;
				} else if (currentChar === '.') {
					if (space) throw new Error(`数字格式不正确  \n索引 ${i},字符 ${currentChar} \n${printErrStr(str, i)}`);
					if (pot) throw new Error(`小数点格式不正确  \n索引 ${i},字符 ${currentChar} \n${printErrStr(str, i)}`);
					token.value += currentChar;
					pot = true;
				} else if (currentChar === ' ') {
					space = true;
				} else {
					i--;
					break;
				}
			}
			if (prev.prefix) {
				token.value = prev.value + token.value;
				tokens.pop();
			}
		} else if ('+-*/'.includes(currentChar)) {
			token = {
				type: 'operator',
				value: currentChar,
			};
			//
			if (currentChar == '-' && (((tokens.length == 0) || (i > 0 && ((prev.type == 'operator') || (prev.value == '('))))) && !prev.prefix) {
				token.prefix = true;
			} else if ((i > 0 && prev.type != 'operator' && prev.value != '(') && !prev.prefix) {
			} else {
				throw new Error(`符号格式不正确 \n索引 ${i},字符 ${currentChar} \n ${printErrStr(str, i)}`);
			}
		} else if ((currentChar === '(' && prev.value != ')' && !prev.prefix)) {
			token = {
				type: 'Punctuator',
				value: currentChar,
			}
			bract.push(i);
		} else if ((currentChar === ')' && prev.value != '(' && !prev.prefix)) {
			token = {
				type: 'Punctuator',
				value: currentChar
			}
			if (bract.pop() == undefined) throw new Error(`括号不匹配  \n索引 ${i},字符 ${currentChar} \n ${printErrStr(str, i)}`);
		} else {
			throw new Error(`无法识别的字符 \n索引 ${i},字符 ${currentChar} \n ${printErrStr(str, i)}`);
		}
		tokens.push(token);
		prev = token;
	}
	if (bract.length > 0) throw new Error(`索引 ${bract[0]},字符 '${str[bract[0]]}', 括号不匹配 `);
	return tokens;
}

export function parse(tokens, operator) {
	// 记录操作符
	let operatorStack = [];
	// 记录值
	let numStack = [];
	// 操作符与括号的优先级映射
	let precedence = {
		'(': -1,
		')': 0,
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
	};
	// 操作符
	let opts = Object.keys(precedence);
	// 操作符绑定计算函数
	operator = operator || {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	};
	// 判断是否允许执行计算
	function allow() {
		//  存在两个值栈 与 一个字符栈
		return numStack.length >= 2 && operatorStack.length >= 1;
	}
	// 计算
	function count() {
		// 取出两个数值
		let e2 = numStack.pop();
		let e1 = numStack.pop();
		// 取出
		let op = operatorStack.pop();
		// 计算并保存结果值
		let fn = operator[op];
		if (fn) numStack.push(fn(e1, e2));
	}
	for (let i = 0; i < tokens.length; i++) {
		let token = tokens[i];
		if (token.value == '(') {
			operatorStack.push(token.value);
		} else if (token.type == "number") {
			numStack.push(Number(token.value));
		} else if (token.type == "operator" || token.type == "Punctuator") {
			// 允许计算 且 上一个优先级大于当前字符优先级 则先计算
			while (allow() && precedence[token.value] <= precedence[operatorStack.slice(-1)])
				count();
			// 追加
			// 如果当前符号是反括号 则删除上一个反括号
			if (token.value == ')')
				operatorStack.pop();
			else
				operatorStack.push(token.value);
		} else {
			throw new Error(`未知错误！！`);
		}
	}
	while (allow())
		count();
	return numStack.pop();
}
