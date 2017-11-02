const path = require('path');

module.exports = {
  entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'redux-middleware.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
