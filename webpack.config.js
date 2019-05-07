const path = require('path');

module.exports = [
{
  entry: ['./src/client/index.js'],
  output: {
    path: __dirname + '/public/js',
    filename: 'client.js',
  },
  // mode: "development",
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.js$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  watch: true
}
]
