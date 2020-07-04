const merge = require('webpack-merge');
const cssnano = require('cssnano');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackExternalsPlugin({ // cdn
      externals: [
        {
          module: 'react',
          entry: 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
      // files: [
      //   `search.html` // 这里要指定html 不然还是会多次注入
      // ]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // reactBase: { // react相关单独打包
        //   test: /(react|react-dom)/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
        commons: {
          minSize: 0,
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
};

module.exports = merge(baseConfig, prodConfig);