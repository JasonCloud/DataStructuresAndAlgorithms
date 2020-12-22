/**
 * @Description:
 * @Author:  wuenyou
 * @Date: 2020/12/22
 * @LastEditors:
 * @LastEditTime: 2020/12/22
 */

export function countingSort(array) {
	if (array.length < 2) {
		return array;
	}
	let maxVal = findMaxValue(array);
	let counts = new Array(maxVal+1);
	array.forEach(ele => {
		if(!counts[ele]) {
			counts[ele] = 0;
		}
		counts[ele] ++;
	})
	let sortedIndex = 0;
	counts.forEach((count, i) => {
		while (count > 0) {
			array[sortedIndex++] = i;
			count --;
		}
	});
	return array;
}

const findMaxValue = (array) => {
	let max =  array[0];
	for (let i = 1; i < array.length; i++) {
		if (array[i] > max){
			max = array[i];
		}
	}
	return max;
}
