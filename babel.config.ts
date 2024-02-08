import { ConfigFunction } from '@babel/core';

const babelConfig: ConfigFunction = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = ['@babel/preset-env'];

  const plugins = [];

  return {
    presets,
    plugins,
  };
};

export default babelConfig;