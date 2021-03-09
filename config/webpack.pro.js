const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
module.exports = merge(common, {
  entry: "./src/lib/index.ts",
  mode: "production",
  output: {
    library: "multipleSearchInput",
    globalObject: "this",
    libraryTarget: "umd",
    filename: "multipleSearchInput.min.js",
    chunkFilename: "js/multipleSearchInput.[contenthash:8].js",
    path: path.resolve(__dirname, "..", "dist"),
  },
  externals: {
    "vue-property-decorator": "vue-property-decorator",
    "vue-class-component": "vue-class-component",
  },
});
