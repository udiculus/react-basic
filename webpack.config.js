const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanCSS = require('less-plugin-clean-css');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const config = require('./build/config');
const pkg = require('./package.json');

const paths = `./dist/${pkg.version}`;
const envMode = process.env.NODE_ENV;

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

const cleanPlugin = envMode === 'production' ? new CleanCSS({ advanced: true }) : '';

const webpackConfig = {
  entry: config.entry,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, config.dist),
    filename: config.name.js,
    chunkFilename: config.name.jsChunk,
    publicPath: '/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              plugins: [cleanPlugin],
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'babel-loader',
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true,
          },
        }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: config.name.css,
      chunkFilename: config.name.cssChunk,
    }),
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          chunks: 'initial',
        },
      },
    },
  },
};

if (envMode === 'production') {
  webpackConfig.plugins.push(
    new CleanWebpackPlugin(paths)
  );

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );

  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  );

  webpackConfig.plugins.push(
    new OptimizeCSSAssetsPlugin({}),
  );

  webpackConfig.plugins.push(
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 2,
      moveToParents: true,
    }),
  );

  webpackConfig.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

module.exports = webpackConfig;

