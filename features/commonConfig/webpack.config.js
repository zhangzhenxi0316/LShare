const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const { Configuration } = require("webpack");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
/**
 * @type {Configuration}
 */
module.exports = {
  entry: {
    main: "./index.ts",
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(process.cwd(), "./build"),
    filename: "[name].[hash].bundle.js",
  },
  plugins: [new CleanWebpackPlugin(), new friendlyErrorsWebpackPlugin()],
};
