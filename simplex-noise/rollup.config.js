import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const srcPath = "src";
const distPath = "dist";

export default {
	input: srcPath + "/index.js",
	output: {
		file: distPath + "/dist-index.js",
		format: "iife", // immediately-invoked function expression — suitable for <script> tags
	},
	plugins: [
		resolve({
			browser: true,
			preferBuiltins: false
		}), // tells Rollup how to find es modules in node_modules
		commonjs(), // converts commonJs to ES modules
		serve(distPath), // index.html should be in root of project
		livereload(),
		json(),
	]
};
