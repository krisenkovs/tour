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
      //maxSize:112000,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
});
