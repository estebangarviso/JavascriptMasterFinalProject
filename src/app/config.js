const config = require('./config.defaults.json')
const currencies = require('../json/currencies.json')
const author = require('../../package.json').author

const defaultParameters = {
  iso_code: config.iso_code,
  lang: config.lang,
  currencies: currencies,
  app: {
    name: config.site_name,
    logo: 'assets/img/logo.png',
    fonts: {
      default_typo: 'Lato',
      highlight_typo: 'Poppins',
    },
    header_text: 'Envíos a todo el mundo ✈️',
    copyrights: { author: author },
  },
  page: {
    page_name: 'spa',
    url: process.env.PUBLIC_URL || config.base_url,
    meta: {
      title: 'eCafe | ' + config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
    },
    title: config.title,
  },
  modules: {
    currencyselector: {
      hook: 'footer', //header|footer
    },
  },
}

exports.app = defaultParameters.app
exports.templateParameters = async (
  compilation,
  assets,
  assetTags,
  options
) => {
  const headTags = assetTags.headTags
  const headPlugins = headTags
    .filter((tag) => tag.meta.plugin !== 'html-webpack-plugin')
    .map((tag) => {
      if (
        process.env.PUBLIC_PATH &&
        tag.meta.plugin === 'favicons-webpack-plugin' &&
        tag.attributes.href &&
        /^\/img\/favicon/g.test(tag.attributes.href)
      ) {
        tag.attributes.href = process.env.PUBLIC_PATH + tag.attributes.href
      } else if (
        process.env.PUBLIC_PATH &&
        tag.meta.plugin === 'favicons-webpack-plugin' &&
        tag.attributes.content &&
        /^\/img\/favicon/g.test(tag.attributes.content)
      ) {
        tag.attributes.content =
          process.env.PUBLIC_PATH + tag.attributes.content
      }
      return tag.toString()
    })
    .filter((tag, index, array) => array.indexOf(tag) === index)
    .join('')

  /**
   * Define tags in Head Tag
   */
  const styles = headTags
    .filter(
      (tag) =>
        tag.meta.plugin === 'html-webpack-plugin' &&
        /\.(sa|sc|c)ss\??[\d\w]+$/.test(tag.attributes.href)
    )
    .map((tag) => tag.toString())
    .join('')

  const javascript = {}
  javascript.head = headTags
    .filter(
      (tag) =>
        tag.meta.plugin === 'html-webpack-plugin' &&
        /(\/head\.js\??[\d\w]+|\/head\.min\.js\??[\d\w]+)$/.test(
          tag.attributes.src
        )
    )
    .map((tag) => tag.toString())
    .join('')

  /**
   * Define tags Before Body Tag
   */
  javascript.bottom = headTags
    .filter(
      (tag) =>
        tag.meta.plugin === 'html-webpack-plugin' &&
        /(\/body\.js\??[\d\w]+|\/body\.min\.js\??[\d\w]+)$/.test(
          tag.attributes.src
        )
    )
    .map((tag) => tag.toString())
    .join('')

  //console.log({ headPlugins, javascript, styles })
  return {
    headPlugins,
    javascript,
    styles,
    ...defaultParameters,
  }
}

exports.favicons = {
  logo: 'assets/img/favicon/favicon.svg',
  prefix: 'img/favicon/',
  inject: true,
  favicons: {
    appName: config.site_name,
    appShortName: config.site_name,
    background: '#f0f0f0',
    theme_color: '#f0f0f0',
    lang: config.lang,
  },
}
