/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2021/1/20
 * @LastEditors:
 * @LastEditTime: 2021/1/20
 */
import Queue from "../../dataStructure/QueueArr";

export const tokensGren = (expr) => {
	// 生成词法解析队列；
	let tokens = new Queue();
	let token, currentChar;
	// 上一个记录的token值
	let prev = {};
	for (let i = 0; i < expr.length; i++) {
		currentChar = expr[i];
		if (currentChar == ' ') continue;
		if (/[0-9]/.test(currentChar)) {// 数字类型
			token = {
				type: 'number',
				value: currentChar,
			};
			for (i++; i < expr.length; i++) { // 寻找下一个元素
				currentChar = expr.charAt(i);
				if (/[0-9]/.test(currentChar)) { // 如果临近的也是数字，就连接起来；'1'+'1' = '11'
					token.value += currentChar;
				} else {
					i--;
					break;
				}
			}
		} else if ('+-*/'.includes(currentChar)) {
			token = {
				type: 'operator',
				value: currentChar,
			};
		} else if (currentChar === '(' || currentChar === ')') {
			token = {
				type: 'Punctuator',
				value: currentChar,
			}
		}
		tokens.enqueue(token);
		prev = token;
	}
	return tokens;
}
