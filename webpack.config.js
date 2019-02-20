/* eslint linebreak-style: ["error", "windows"] */
const path = require('path');

module.exports = {
  // devtool: 'eval-source-map',
  // mode: 'development',
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
  },
  externals: {
    'styled-components': true,
  }
};
