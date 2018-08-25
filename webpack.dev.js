const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',

  // devtool: 'inline-source-map',

  // for 'devtool' ideal options are 'eval', 'eval-source-map', 'cheap-eval-source-map', 'cheap-module-eval-source-map'.
  // read https://webpack.js.org/configuration/devtool/#development for the info.

  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    host: '0.0.0.0',
    open: true,
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/, // if using Bootstrap or smth, the option should be omitted
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [ autoprefixer() ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
