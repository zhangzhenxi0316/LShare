const { Configuration } = require("webpack");
const { default: merge } = require("webpack-merge");
const webpackCommonConfig = require("@features/commonConfig");

/**
 * @type {Configuration}
 */
module.exports = merge(webpackCommonConfig, {
  entry: {
    main: "./index.ts",
  },
  target: "node",
  node: {
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
    mainFields: ["main", ",module"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
});
