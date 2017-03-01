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

import * as Types from './constants/types';
import * as DataModels from './models';

import * as AuthorizationApi from './api/AuthorizationApi';
import * as DataApi from './api/DataApi';
import * as DataSourcesApi from './api/DataSourcesApi';
import * as EntityDataModelApi from './api/EntityDataModelApi';
import * as LinkingApi from './api/LinkingApi';
import * as OrganizationsApi from './api/OrganizationsApi';
import * as PermissionsApi from './api/PermissionsApi';
import * as PrincipalsApi from './api/PrincipalsApi';
import * as RequestsApi from './api/RequestsApi';
import * as SearchApi from './api/SearchApi';

import {
  configure
} from './config/Configuration';

declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  version,
  configure,
  DataModels,
  Types,
  AuthorizationApi,
  DataApi,
  DataSourcesApi,
  EntityDataModelApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi
};

export default {
  version,
  configure,
  DataModels,
  Types,
  AuthorizationApi,
  DataApi,
  DataSourcesApi,
  EntityDataModelApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi
};
