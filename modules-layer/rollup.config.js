import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
	input: "dev/index.js",
	output: {
		file: "dev-dist/index.js",
		format: "iife", // immediately-invoked function expression — suitable for <script> tags
	},
	plugins: [
		resolve({
			browser: true
		}), // tells Rollup how to find es modules in node_modules
		commonjs(), // converts commonJs to ES modules
		serve("dev-dist"), // index.html should be in root of project
		livereload(),
	]
};
