import commonjs from "@rollup/plugin-commonjs"; // 使用commonjs
import resolve from "@rollup/plugin-node-resolve"; // 加载第三方库

import scss from 'rollup-plugin-scss';
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
  scss({
    output: 'bundle.css',
    include: ['**/*.scss', '**/*.sass', '**/*.css']
  })
];

if (process.env.NODE_ENV === "development") {
  plugins.push(
    serve({
      // open: true,
      port: process.env.PORT || 9001,
      contentBase: ".",
      historyApiFallback: '/README.md',
    })
  );
} else {
  plugins.push(terser());
}

export default {
  input: "src/index.js",
  output: {
    name: "code",
    file: "dist/code.min.js",
    format: "umd",
    intro: "// const DEVELOPMENT = ",
  },
  plugins,
};
