module.exports = (api) => {
  api.cache(true)

  const presets = [
    require.resolve('@babel/preset-typescript'),
    [
      require.resolve('@babel/preset-env'),
      { corejs: 3, useBuiltIns: 'usage', debug: true },
    ],
  ]
  const plugins = [
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        regenerator: true,
      },
    ],
    [require.resolve('@babel/plugin-proposal-class-properties')],
  ]

  return {
    presets,
    plugins,
  }
}
