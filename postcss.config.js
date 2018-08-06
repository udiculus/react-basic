const AutoPrefixer = require('autoprefixer');

module.exports = {
  plugins: [
    new AutoPrefixer({
      browsers: ['last 50 versions'],
    }),
  ],
};
