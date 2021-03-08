const {merge} = require('webpack-merge');
const common = require('./webpack.common.js')
module.exports = merge(common, {
  entry: './src/lib/index.js',
  mode: 'production',
  output: {
    library: 'multipleSearchInput',
    libraryTarget: 'umd'
  }
})