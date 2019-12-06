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
import * as CodexApi from './api/CodexApi';
import * as DataApi from './api/DataApi';
import * as DataIntegrationApi from './api/DataIntegrationApi';
import * as EntityDataModelApi from './api/EntityDataModelApi';
import * as EntitySetsApi from './api/EntitySetsApi';
import * as FeedsApi from './api/FeedsApi';
import * as LinkingApi from './api/LinkingApi';
import * as OrganizationsApi from './api/OrganizationsApi';
import * as PermissionsApi from './api/PermissionsApi';
import * as PersistentSearchApi from './api/PersistentSearchApi';
import * as PrincipalsApi from './api/PrincipalsApi';
import * as RequestsApi from './api/RequestsApi';
import * as SearchApi from './api/SearchApi';
import * as SubscriptionApi from './api/SubscriptionApi';

import * as Constants from './constants/GlobalConstants';
import * as Models from './models';
import * as Types from './constants/types';
import { configure } from './config/Configuration';

export type * from './config';
export type * from './constants/types';
export type * from './models';

// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  AnalysisApi,
  AppApi,
  AuthorizationApi,
  CodexApi,
  DataApi,
  DataIntegrationApi,
  EntityDataModelApi,
  EntitySetsApi,
  FeedsApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PersistentSearchApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi,
  SubscriptionApi,

  Constants,
  Models,
  Types,
  configure,
  version,
};

export default {
  AnalysisApi,
  AppApi,
  AuthorizationApi,
  CodexApi,
  DataApi,
  DataIntegrationApi,
  EntityDataModelApi,
  EntitySetsApi,
  FeedsApi,
  LinkingApi,
  OrganizationsApi,
  PermissionsApi,
  PersistentSearchApi,
  PrincipalsApi,
  RequestsApi,
  SearchApi,
  SubscriptionApi,

  Constants,
  Models,
  Types,
  configure,
  version,
};
