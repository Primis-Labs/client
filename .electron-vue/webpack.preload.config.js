const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../static/preload.js'),
  output: {
    filename: 'webpackPreloadOutput.js',
    path: path.join(__dirname, '../static/'),
    libraryTarget: 'umd'
  },
  target: 'electron-renderer'
};