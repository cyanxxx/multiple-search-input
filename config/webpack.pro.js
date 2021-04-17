const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
module.exports = merge(common, {
  entry: "./src/lib/index.ts",
  mode: "production",
  devtool: 'source-map',
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
  optimization: {
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        sourceMap: true,
        cache: true,
        parallel: true,
        extractComments: false
      }),
    ],
  },
});
