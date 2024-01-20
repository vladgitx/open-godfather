import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
	input: "./src/index.ts",
	output: {
		dir: "./build",
		format: "cjs",
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		resolve(),
		commonjs(),
	],
}