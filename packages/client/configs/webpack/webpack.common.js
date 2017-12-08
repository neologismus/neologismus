const R = require('ramda')
const webpack = require('webpack')


const tests = {
  js: /\.jsx?$/,
  style: /\.s[ac]?ss$/,
  pug: /\.pug$/,
  img: /\.(jpe?g|png|gif|svg)$/i,
}

const rules = ({ PATHS }) => [
  {
    test: tests.js,
    include: [
      PATHS.app,
    ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  {
    test: tests.pug,
    loader: 'pug-loader',
  },
]

const plugins = () => [
  new webpack.NoEmitOnErrorsPlugin(),
]

const lens = {
  byCond: cond => R.lens(
    R.filter(cond),
    R.useWith(R.map, [R.compose(R.when(cond), R.identity)])
  ),
}

module.exports = options => ({
  tests,
  lens,

  conf: {
    resolve: {
      extensions: ['.js', '.jsx', '.sss', '.json'],
    },

    plugins: plugins(options),

    module: { rules: rules(options) },
  },
})
