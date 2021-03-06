const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { Configuration } = require("webpack");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommonConfig = require("@features/commonConfig");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); //TODO δΈηζ
const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");
const PostCssFlexBugFixes = require("postcss-flexbugs-fixes");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV !== "production";

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
/**
 * @type {Configuration}
 */
module.exports = merge(webpackCommonConfig, {
  entry: {
    main: "./index.tsx",
  },
  output: {
    publicPath: "/",
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
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  pxtorem({
                    rootValue: (375 * 20) / 320,
                    propList: ["*"],
                    minPixelValue: 1,
                    selectorBlackList: ["data-dpr="],
                  }),
                  autoprefixer({ flexbox: "no-2009" }),
                  PostCssFlexBugFixes,
                ],
              },
            },
          },
          "sass-loader",
        ],
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template/index.html"),
      filename: "index.html",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  devServer: isDevelopment
    ? {
        static: {
          directory: path.join(__dirname, "build"),
        },
        port: 9102,
        client: {
          progress: true,
        },
        historyApiFallback: true,
      }
    : {},
  resolve: {
    alias: {
      entry: path.resolve(__dirname, "entry"),
      common: path.resolve(__dirname, "common"),
      components: path.resolve(__dirname, "components"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
    mainFields: ["main", ",module"],
  },
  optimization: {
    splitChunks: {
        // θͺε¨ζεζζε¬ε±ζ¨‘εε°εη¬ bundleοΌε―ιιη½?ζοΌallοΌasync ε initialγ
        // θ?Ύη½?δΈΊ all ε―θ½ηΉε«εΌΊε€§οΌε δΈΊθΏζε³η chunk ε―δ»₯ε¨εΌζ­₯ειεΌζ­₯ chunk δΉι΄ε±δΊ«
        chunks: 'all'
    }
},
});
