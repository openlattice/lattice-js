/*
 * @flow
 */

/**
 * The `lattice.js` library is a layer on top of OpenLattice's REST APIs to simplify the process of reading data from
 * and writing data into the OpenLattice data store. The library exposes a thin wrapper around each of OpenLattice's
 * REST APIs to standardize the data models and formats used, and facilitate communication with OpenLattice.
 *
 * @module lattice
 */

import * as AnalysisApi from './api/AnalysisApi';
import * as AppApi from './api/AppApi';
import * as AuthorizationApi from './api/AuthorizationApi';
import * as DataApi from './api/DataApi';
import * as DataIntegrationApi from './api/DataIntegrationApi';
import * as DataSourcesApi from './api/DataSourcesApi';
import * as EntityDataModelApi from './api/EntityDataModelApi';
import * as LinkingApi from './api/LinkingApi';
import * as OrganizationsApi from './api/OrganizationsApi';
import * as PermissionsApi from './api/PermissionsApi';
import * as PrincipalsApi from './api/PrincipalsApi';
import * as RequestsApi from './api/RequestsApi';
import * as SearchApi from './api/SearchApi';

import * as Constants from './constants/GlobalConstants';
import * as Types from './constants/types';
import * as Models from './models';
import { configure } from './config/Configuration';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  AnalysisApi,
  AppApi,
  AuthorizationApi,
  DataApi,
  DataIntegrationApi,
  DataSourcesApi,
  EntityDataModelApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi,

  Constants,
  Models,
  Types,
  configure,
  version
};

export default {
  AnalysisApi,
  AppApi,
  AuthorizationApi,
  DataApi,
  DataIntegrationApi,
  DataSourcesApi,
  EntityDataModelApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi,

  Constants,
  Models,
  Types,
  configure,
  version
};
