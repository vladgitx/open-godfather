import del from "rollup-plugin-delete"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

export default {
    input: "./src/index.ts",
    output: {
        dir: "./build",
        format: "cjs",
    },
    plugins: [
        del({ targets: "./build/*" }),
        typescript({
            tsconfig: "./tsconfig.json",
        }),
        json(),
        resolve(),
        commonjs(),
    ],
}
