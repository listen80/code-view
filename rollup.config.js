import commonjs from "@rollup/plugin-commonjs"; // 使用commonjs
import resolve from "@rollup/plugin-node-resolve"; // 加载第三方库
// import babel from "@rollup/plugin-babel"; // 转成es5

import { terser } from "rollup-plugin-terser"; // 压缩代码
import serve from "rollup-plugin-serve"; // 启动服务

import replace from "rollup-plugin-replace"; // 注入环境变量

const plugins = [
  commonjs(),
  resolve({
    extensions: [".js"],
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
];

if (process.env.NODE_ENV === "development") {
  plugins.push(
    serve({
      open: true,
      // Remember to start with a slash.
      // openPage: '/examples/',
      port: 9000,
      contentBase: "",
    })
  );
} else {
  plugins.push(terser());
}

export default {
  plugins,
  input: "src/index.js",
  output: {
    name: "code",
    file: "dist/code.min.js",
    format: "umd",
    intro: "// const DEVELOPMENT = ",
  },
};
