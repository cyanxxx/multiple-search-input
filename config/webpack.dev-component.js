const { merge } = require("webpack-merge");
const path = require('path');
const common = require("./webpack.common.js");
module.exports = merge(common, {
  entry: "./src/lib/dev-index.ts",
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    library: "multipleSearchInput",
    globalObject: "this",
    libraryTarget: "umd",
    filename: "multipleSearchInput.js",
    chunkFilename: "js/multipleSearchInput.js",
    path: path.resolve(__dirname, "..", "dist"),
  },
});
