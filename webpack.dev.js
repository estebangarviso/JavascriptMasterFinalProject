const { merge } = require('webpack-merge')
const commonCallback = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

// Alter common config from callback
let common = commonCallback()

// Dev plugins
const plugins = [
  ...common.plugins,
  new MiniCssExtractPlugin({
    filename: '[name].css?[contenthash]',
    chunkFilename: '[id].min.css?[contenthash]',
  }),
]

// Dev main config
let config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  devServer: {
    watchFiles: ['src/**/*', 'public/**/*'],
    static: {
      directory: path.join(__dirname, 'public'),
      watch: {
        usePolling: false,
      },
    },
    hot: true,
    open: true,
    port: 3000,
  },
  plugins,
})

module.exports = config
