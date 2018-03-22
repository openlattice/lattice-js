/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies, import/extensions */

import Webpack from 'webpack';

import PACKAGE from '../../package.json';
import LIB_CONFIG from '../lib/lib.config.js';
import LIB_PATHS from '../lib/paths.config.js';

import {
  isDev,
  isProd,
  isTest,
  ifDev,
  ifProd,
  ifMin,
  TARGET_ENV
} from '../lib/env.config.js';

function compact(arr) {
  return arr.filter(element => !!element);
}

/*
 * loaders
 */

const BABEL_LOADER = {
  loader: 'babel-loader',
  test: /\.js$/,
  include: [
    LIB_PATHS.SOURCE,
    LIB_PATHS.TEST
  ]
};

/*
 * plugins
 */

const BANNER_PLUGIN = new Webpack.BannerPlugin({
  banner: LIB_CONFIG.BANNER,
  entryOnly: true
});

const DEFINE_PLUGIN = new Webpack.DefinePlugin({
  __ENV_DEV__: JSON.stringify(isDev),
  __ENV_PROD__: JSON.stringify(isProd),
  __ENV_TEST__: JSON.stringify(isTest),
  __PACKAGE__: JSON.stringify(PACKAGE.name),
  __VERSION__: JSON.stringify(`v${PACKAGE.version}`)
});

const DEV_PLUGINS = [
  new Webpack.NamedModulesPlugin()
];

const PROD_PLUGINS = [];

/*
 * webpack config
 */

export default {
  bail: true,
  entry: LIB_PATHS.ENTRY,
  mode: ifDev('development', 'production'),
  module: {
    rules: [
      BABEL_LOADER
    ]
  },
  optimization: {
    minimize: ifMin(true, false)
  },
  output: {
    library: LIB_CONFIG.LIB_NAMESPACE,
    libraryTarget: 'umd',
    path: LIB_PATHS.BUILD,
    publicPath: '/',
    filename: ifMin(
      `${LIB_CONFIG.LIB_FILE_NAME}.min.js`,
      `${LIB_CONFIG.LIB_FILE_NAME}.js`
    )
  },
  plugins: compact([
    ...ifDev(DEV_PLUGINS, []),
    ...ifProd(PROD_PLUGINS, []),
    DEFINE_PLUGIN,
    BANNER_PLUGIN
  ]),
  resolve: {
    extensions: ['.js'],
    alias: {},
    modules: [
      LIB_PATHS.SOURCE,
      LIB_PATHS.NODE
    ]
  },
  target: TARGET_ENV
};
