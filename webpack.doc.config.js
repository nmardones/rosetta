var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'docs/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'docs/'),
    filename: 'dist/index.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  }
};
