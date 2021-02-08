const path = require('path');

module.exports = {
  entry: './themes/arlmediaTheme/assets/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'themes', 'arlmediaTheme', 'assets', 'js'),
  },
};
