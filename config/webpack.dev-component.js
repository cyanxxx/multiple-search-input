const { merge } = require("webpack-merge");
const path = require('path');
const common = require("./webpack.common.js");
module.exports = merge(common, {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "multipleSearchInput.js",
    chunkFilename: "js/multipleSearchInput.js",
    path: path.resolve(__dirname, "..", "dist"),
  },
});
