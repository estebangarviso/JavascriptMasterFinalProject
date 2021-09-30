const path = require('path')
const glob = require('glob')
const { merge } = require('webpack-merge')
const commonCallback = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

// Alter common config from callback
let common = commonCallback(false, 'build')

// Prod plugins
const plugins = [
  ...common.plugins,
  new MiniCssExtractPlugin({
    filename: '[name].min.css?[contenthash]',
    chunkFilename: '[id].min.css?[contenthash]',
  }),
  new PurgeCSSPlugin({
    paths: () =>
      glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
        nodir: true,
      }),
  }),
  new HtmlMinimizerPlugin(),
]

// Prod main config
let config = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins,
})

config.optimization = {
  minimizer: [
    new CssMinimizerPlugin(),
    // For webpack@5 you can use the `...` syntax to extend existing minimizers
    '...',
  ],
}

module.exports = config
