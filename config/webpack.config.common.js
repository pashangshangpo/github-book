/**
 * @file webpack common config
 * @author xiaozhihua
 * @date 2018-11-22 16:52:48
 */

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

module.exports = {
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      '$api': resolve('src/api'),
      '$common': resolve('src/common'),
      '$components': resolve('src/components'),
      '$store': resolve('src/store'),
      '$reducers': resolve('src/store/reducers'),
      '$actions': resolve('src/store/actions'),
      '$router': resolve('src/router'),
      '$style': resolve('src/style'),
      '$svg': resolve('src/svg')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.svg/,
        include: [
          resolve('src')
        ],
        exclude: /(node_modules|bower_components)/,
        use: ['svg-sprite-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
