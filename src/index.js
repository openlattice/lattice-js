/*
 * @flow
 */

/**
 * The `loom-data` library is a layer on top of Loom's REST APIs to simplify the process of reading data from and
 * writing data into the Loom DataStore. The library exposes a thin wrapper around each of Loom's REST APIs to
 * standardize the data models and formats used, and facilitate communication with Loom.
 *
 * @module loom-data
 */

import * as DataApi from './api/DataApi';
import * as EntityDataModelApi from './api/EntityDataModelApi';
import * as PermissionsApi from './api/PermissionsApi';
import * as UsersApi from './api/UsersApi';

import * as Models from './models';

import {
  configure
} from './config/Configuration';

declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  version,
  configure,
  DataApi,
  EntityDataModelApi,
  PermissionsApi,
  UsersApi,
  Models
};

export default {
  version,
  configure,
  DataApi,
  EntityDataModelApi,
  PermissionsApi,
  UsersApi,
  Models
};
