const path = require('path')
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPluginLoader = require('mini-css-extract-plugin').loader
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const miniSVGDataURI = require('mini-svg-data-uri')
const dotenv = require('dotenv')

let config = (devMode = true, publicDir = 'dev') => {
  if (!devMode)
    dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') })
  else dotenv.config()
  const { templateParameters, favicons } = require('./src/app/config')
  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      head: ['./assets/scss/styles.scss'],
      body: ['./assets/ts/body.ts'],
    },
    output: {
      filename: devMode
        ? '[name].js?[contenthash]'
        : '[name].min.js?[contenthash]',
      path: path.resolve(__dirname, publicDir),
      publicPath: '/',
      clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, publicDir),
      },
      open: true,
      port: 80,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: './tsconfig.json',
          logLevel: 'info',
          extensions: ['.ts', '.js'],
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          include: [path.resolve(__dirname, 'src')],
          use: [{ loader: devMode ? 'ts-loader' : 'babel-loader' }],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPluginLoader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: devMode,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: devMode,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: devMode,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // Prefer `dart-sass`
                implementation: require.resolve('sass'),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.svg$/,
          type: 'asset/inline',
          generator: {
            dataUrl(content) {
              content = content.toString()
              return miniSVGDataURI(content)
            },
          },
          use: 'svgo-loader',
        },
        {
          test: /\.tpl|\.smarty$/,
          loader: 'jsmart-loader',
          options: {
            leftDelim: '{{',
            rightDelim: '}}',
            autoLiteral: false,
          },
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'json', to: 'json' },
          { from: 'assets/img', to: 'img' },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new FaviconsWebpackPlugin(favicons),
      new HtmlWebpackPlugin({
        template: './templates/index.tpl',
        publicPath: process.env.PUBLIC_PATH || '/',
        inject: false,
        templateParameters: templateParameters,
      }),
    ],
    stats: {
      assets: true,
      children: true,
      chunks: true,
      errors: true,
      errorDetails: true,
      modules: true,
      timings: true,
      colors: true,
    },
  }
}

module.exports = config
