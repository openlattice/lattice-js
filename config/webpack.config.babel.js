/*
 * @flow
 */

/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */

import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpack from 'webpack';

import PACKAGE from '../package.json';

import * as PATHS from './paths.js';

import {
  isDev,
  isProd,
  ifDev,
  ifProd
} from './env.js';

import {
  compact
} from './utils.js';

/*
 * constants
 */

const BANNER = `
${PACKAGE.name} - v${PACKAGE.version}
${PACKAGE.description}
${PACKAGE.homepage}

Copyright (c) 2014-2016, Kryptnostic, Inc. All rights reserved.
`;

const BUILD_FILE_NAME = PACKAGE.name;

/*
 * loaders
 */

const BABEL_LOADER = {
  loader: 'babel',
  test: /\.(js|jsx)$/,
  include: [
    PATHS.ABS.SOURCE,
    PATHS.ABS.TEST
  ]
};

const JSON_LOADER = {
  loader: 'json',
  test: /\.json$/
};

/*
 * plugins
 */

const BANNER_PLUGIN = new Webpack.BannerPlugin({
  banner: BANNER,
  entryOnly: true
});

const DEFINE_PLUGIN = new Webpack.DefinePlugin({
  __DEV__: JSON.stringify(isDev),
  __PROD__: JSON.stringify(isProd),
  __VERSION__: JSON.stringify(`v${PACKAGE.version}`)
});

const DEV_PLUGINS = [
  new HtmlWebpackPlugin(),
  new Webpack.NamedModulesPlugin()
];

const PROD_PLUGINS = [
  new Webpack.optimize.DedupePlugin(),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new Webpack.optimize.UglifyJsPlugin({
    comments: false
  })
];

/*
 * webpack config
 */

export default {
  bail: true,
  entry: PATHS.ENTRY,
  output: {
    path: PATHS.ABS.BUILD,
    publicPath: '/',
    filename: ifProd(
      `${BUILD_FILE_NAME}.min.js`,
      `${BUILD_FILE_NAME}.js`,
    )
  },
  module: {
    rules: [
      BABEL_LOADER,
      JSON_LOADER
    ],
    noParse: []
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
      PATHS.ABS.SOURCE,
      PATHS.ABS.NODE_MODULES
    ]
  }
};
