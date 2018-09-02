// WARNING: THIS IS NOT USED AT THE MOMENT

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './src/node/bundle.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  mode: 'production',
  externals: [
    nodeExternals()
  ]
};
