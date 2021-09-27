module.exports = (api) => {
  api.cache(true)

  const presets = [
    '@babel/preset-typescript',
    ['@babel/preset-env', { corejs: 3, useBuiltIns: 'usage', debug: true }],
  ]
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties'],
  ]

  return {
    presets,
    plugins,
  }
}
