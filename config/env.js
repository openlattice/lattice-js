/*
 * @flow
 */

import {
  ifElse
} from './utils.js';

const NODE_ENV :string = process.env.NODE_ENV || 'development';

const isDev :boolean = NODE_ENV === 'development';
const isProd :boolean = NODE_ENV === 'production';

const ifDev :Function = ifElse(isDev);
const ifProd :Function = ifElse(isProd);

export {
  isDev,
  isProd,
  ifDev,
  ifProd
};
