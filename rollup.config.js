import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
	input: 'src/Dictionary.js',
	output: {
		format: 'umd',
		sourcemap: true,
		name: 'Dictionary',
		file: 'dist/Dictionary.js'
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
