const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const config = require('./build/config');
const common = require('./webpack.common.js');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: config.tempate,
  filename: config.name.index,
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    minifyJS: true,
  },
});

module.exports = merge(common, {
  entry: config.entry,
  output: {
    path: path.join(__dirname, config.dist),
    filename: config.name.js,
    chunkFilename: config.name.jsChunk,
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: config.name.css,
      chunkFilename: config.name.cssChunk,
    }),
  ],
});
