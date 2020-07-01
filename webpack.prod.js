'use strict';
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles).map(key => {
    const entryFile = entryFiles[key]
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [`${pageName}`],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })
  return {
    entry, htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff2|woff|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({ // cdn
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    //   files: [
    //     `search.html` // 这里要指定html 不然还是会多次注入
    //   ]
    // })
  ].concat(htmlWebpackPlugins),
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        reactBase: { // react相关单独打包
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        },
        commons: {
          minSize: 0,
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}