const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const outputFolderPath = resolve(__dirname, 'build');

module.exports = {
  context: resolve(__dirname, ''),
  entry: [join(__dirname, 'src', 'index.tsx')],
  output: {
    path: outputFolderPath,
    filename: `js/[name].[contenthash].${pkg.version}.js`,
  },
  module: {
    rules: [
      // load ts
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: '[local]-[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(jpg|png|gif)$/,
        type: 'asset/inline',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].${pkg.version}.css`,
      chunkFilename: `css/[id].${pkg.version}.css`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'public/images'),
          to: 'images',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Webpack App',
      inject: true,
      template: join(__dirname, 'public', 'index.html'),
    }),
  ],
  performance: {
    hints: false,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  target: 'web',
};
