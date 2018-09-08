const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill', './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
};
