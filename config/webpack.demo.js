const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
module.exports = merge(common, {
  entry: "./src/index.ts",
  mode: "production",
  devtool: 'source-map',
  output: {
    library: "multipleSearchInput",
    globalObject: "this",
    libraryTarget: "umd",
    filename: "multipleSearchInput.js",
    chunkFilename: "js/multipleSearchInput.[contenthash:8].js",
    path: path.resolve(__dirname, "..", "demo"),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
});
