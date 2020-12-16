import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
	input: 'src/algorithms/sorting/heapSort.js',
	output: {
		format: 'umd',
		sourcemap: true,
		name: 'heapSort',
		file: 'dist/heapSort.js'
	},
	plugins: [
		babel({
			exclude: 'node_module/**'
		}),
		serve({
			open: true,
			contentBase: '',
			openPage: '/index.html',
			port: 3000
		})
	]
}
