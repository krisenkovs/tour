const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');

const common = require('./webpack.common.js');
const { join } = require('path');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    nodeEnv: 'production',
    chunkIds: 'natural',
    minimize: false,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 15,
      maxInitialRequests: 30,
    },
  },
});
