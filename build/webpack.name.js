const pkg = require('../package.json');

const webpackName = {
  build: {
    index: `./${pkg.version}/index.html`,
    css: `./${pkg.version}/styles/[name].[contenthash].css`,
    cssChunk: `./${pkg.version}/styles/[name].[chunkhash].css`,
    js: `./${pkg.version}/scripts/[name].[contenthash].js`,
    jsChunk: `./${pkg.version}/scripts/[name].[chunkhash].js`,
  },
  dev: {
    index: 'index.html',
    css: './styles/[name].css',
    cssChunk: './styles/[name].[chunkhash].css',
    js: './scripts/[name].js',
    jsChunk: './scripts/[name].js',
  },
};

module.exports = webpackName;
