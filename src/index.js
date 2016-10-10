/*
 * @flow
 */

import * as DataApi from './DataApi';
import * as EntityDataModelApi from './EntityDataModelApi';

import {
  configure
} from './config/Configuration';

declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  version,
  configure,
  DataApi,
  EntityDataModelApi
};

export default {
  version,
  configure,
  DataApi,
  EntityDataModelApi
};
