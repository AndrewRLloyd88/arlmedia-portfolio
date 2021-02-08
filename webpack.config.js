const path = require('path');

module.exports = {
  entry: './themes/arlmediaTheme/assets/js/app.jsx',
  output: {
    filename: 'app.js',
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
