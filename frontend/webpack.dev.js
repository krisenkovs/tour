const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const proxy = require('./proxy.json');
const port = 3000;

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',
  optimization: {
    nodeEnv: 'development',
    chunkIds: 'named',
    minimize: false,
  },
  devServer: {
    port,
    open: true,
    compress: true,
    hot: true,
    proxy: proxy,
    server: 'http',
    client: {
      logging: 'none',
      overlay: false,
    },
    static: {
      directory: path.resolve(__dirname, 'dist'),
      serveIndex: true,
      watch: true,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  },
});
