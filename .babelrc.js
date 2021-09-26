module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/typescript', ['@babel/env', { modules: false }]]
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
