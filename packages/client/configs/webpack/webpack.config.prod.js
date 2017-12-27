const R = require('ramda')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')


const PATHS = {
  app: path.join(__dirname, '../../src'),
  build: path.join(__dirname, '../../build'),
}

const {conf} = common({PATHS})

const plugins = R.over(R.lensProp('plugins'), R.concat([
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {comments: false},
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(PATHS.app, '/templates/client.pug'),
    filename: 'index.html',
    minify: {
      preserveLineBreaks: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      keepClosingSlash: true,
    },
  }),
]))

const rest = R.merge({
  entry: [
    path.join(PATHS.app, 'index.js'),
  ],
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/',
  },
  devtool: 'eval',
})


module.exports = R.compose(plugins, rest)(conf)
