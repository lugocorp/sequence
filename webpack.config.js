const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'index.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'www')
    }
  }
};