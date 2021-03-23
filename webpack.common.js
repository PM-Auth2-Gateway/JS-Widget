const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/AuthPM.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'AuthPM',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src')],
  }
};