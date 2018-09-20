const packName = require('./webpack.name');

const envMode = process.env.NODE_ENV;

const config = {
  entry: './src/index.jsx',
  dist: 'dist',
  tempate: './src/index.html',
  name: envMode === 'development' ? packName.dev : packName.build,
  browser: 'last 50 versions',
};

module.exports = config;
