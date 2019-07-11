/* eslint-disable import/extensions */

const path = require('path');
const Webpack = require('webpack');

const LIB_CONFIG = require('../lib/lib.config.js');
const LIB_PATHS = require('../lib/paths.config.js');
const PACKAGE = require('../../package.json');

module.exports = (env = {}) => {

  /*
   * constants
   */

  const BABEL_CONFIG = path.resolve(__dirname, '../babel/babel.config.js');
  const ENV_DEV = 'development';
  const ENV_PROD = 'production';
  const LIB_NAMESPACE = 'Lattice';
  const LIB_FILE_NAME = 'index.js';

  /*
   * loaders
   */

  const BABEL_LOADER = {
    test: /\.js$/,
    exclude: /node_modules/,
    include: [
      LIB_PATHS.ABS.SOURCE,
    ],
    use: {
      loader: 'babel-loader',
      options: {
        configFile: BABEL_CONFIG,
      },
    },
  };

  /*
   * plugins
   */

  const BANNER_PLUGIN = new Webpack.BannerPlugin({
    banner: LIB_CONFIG.BANNER,
    entryOnly: true,
  });

  const DEFINE_PLUGIN = new Webpack.DefinePlugin({
    __ENV_DEV__: JSON.stringify(!!env.development),
    __ENV_PROD__: JSON.stringify(!!env.production),
    __PACKAGE__: JSON.stringify(PACKAGE.name),
    __VERSION__: JSON.stringify(`v${PACKAGE.version}`),
  });

  // https://github.com/moment/moment/issues/2373
  // https://stackoverflow.com/a/25426019/196921
  // https://github.com/facebookincubator/create-react-app/pull/2187
  const IGNORE_MOMENT_LOCALES = new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

  /*
   * base webpack config
   */

  return {
    bail: true,
    entry: [
      LIB_PATHS.ABS.ENTRY,
    ],
    mode: env.production ? ENV_PROD : ENV_DEV,
    module: {
      rules: [
        BABEL_LOADER,
      ],
    },
    optimization: {
      minimize: !!env.production,
    },
    output: {
      library: LIB_NAMESPACE,
      libraryTarget: 'umd',
      path: LIB_PATHS.ABS.BUILD,
      publicPath: '/',
      filename: LIB_FILE_NAME,
    },
    performance: {
      hints: false, // disable performance hints for now
    },
    plugins: [
      DEFINE_PLUGIN,
      BANNER_PLUGIN,
      IGNORE_MOMENT_LOCALES,
    ],
    resolve: {
      extensions: ['.js'],
      modules: [
        LIB_PATHS.ABS.SOURCE,
        LIB_PATHS.ABS.NODE,
      ]
    },
    target: 'web',
  };
};
