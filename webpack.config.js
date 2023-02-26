const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // select all image file extensions
        type: 'asset/resource', // process them as an 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // select all typeface file extensions
        type: 'asset/resource', // process them as an 'asset/resource'
      },
    ],
  },
};