const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { Configuration } = require("webpack");
const webpackCommonConfig = require("@features/commonConfig");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");//TODO 不生效
const isDevelopment = process.env.NODE_ENV !== "production";
console.log(path.resolve(__dirname, "./template/index.html"));
/**
 * @type {Configuration}
 */
module.exports = merge(webpackCommonConfig, {
  entry: {
    main: "./index.tsx",
  },
  module: {
    rules: [
      //    image
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      //   font
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      //   style
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      // ts | tsx
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
          {
            loader: require.resolve("ts-loader"),
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template/index.html"),
      filename: "index.html",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: isDevelopment
    ? {
        static: {
          directory: path.join(__dirname, "build"),
        },
        port: 9102,
      }
    : {},
});
