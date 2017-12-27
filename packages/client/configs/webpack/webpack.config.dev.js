const R = require('ramda')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')


const PORT = 3000

const PATHS = {
  app: path.join(__dirname, '../../src'),
  build: path.join(__dirname, '../../build'),
}

const { conf } = common({ PATHS })

const plugins = R.over(R.lensProp('plugins'), R.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(PATHS.app, '/templates/dev.pug'),
    filename: 'index.html',
  }),
]))

const rest = R.merge({
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',

    path.join(PATHS.app, 'index.js'),
  ],
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/',
  },
  devtool: process.env.npm_config_argv.includes('--map')
    ? 'inline-source-map'
    : 'inline-eval',
  devServer: {
    contentBase: PATHS.build,
    port: PORT,
    hot: true,

    stats: { colors: true, modules: false },
    historyApiFallback: true,

    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8001',
        secure: false,
      },
    ],
  },
})


module.exports = R.compose(plugins, rest)(conf)
