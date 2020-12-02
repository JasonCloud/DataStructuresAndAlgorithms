import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
	input: 'src/BinarySearchTree.js',
	output: {
		format: 'umd',
		sourcemap: true,
		name: 'BinarySearchTree',
		file: 'dist/BinarySearchTree.js'
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
