const merge = require('webpack-merge');
// const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'develepment',
  plugins: [
    // new webpack.HotModuleReplacementPlugin() // 当devServer的hot开启为true时，这一行可以不用加
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
