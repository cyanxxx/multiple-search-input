const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  output: {
    filename: "[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "..", "dist"),
  },
});
