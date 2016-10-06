/*
 * @flow
 */

import * as DataApi from './DataApi';
import * as EntityDataModelApi from './EntityDataModelApi';

declare var __VERSION__;

export {
  DataApi,
  EntityDataModelApi
};

export default {
  DataApi,
  EntityDataModelApi,
  version: __VERSION__
};
