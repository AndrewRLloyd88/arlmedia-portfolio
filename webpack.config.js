const path = require('path');

module.exports = {
  entry: {
    index: './themes/arlmediaTheme/assets/js/modulea/index.js',
    projects: './themes/arlmediaTheme/assets/js/moduleb/projects.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'themes', 'arlmediaTheme', 'assets', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /flexboxgrid/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
