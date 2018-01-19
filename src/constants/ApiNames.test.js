import * as ApiNames from './ApiNames';

const ANALYSIS_API = 'AnalysisApi';
const APP_API = 'AppApi';
const AUTHORIZATION_API = 'AuthorizationApi';
const DATA_API = 'DataApi';
const DATA_SOURCES_API = 'DataSourcesApi';
const EDM_API = 'EntityDataModelApi';
const LINKING_API = 'LinkingApi';
const ORGANIZATIONS_API = 'OrganizationsApi';
const PERMISSIONS_API = 'PermissionsApi';
const PRINCIPALS_API = 'PrincipalsApi';
const REQUESTS_API = 'RequestsApi';
const SEARCH_API = 'SearchApi';
const SYNC_API = 'SyncApi';

describe('ApiNames', () => {

  test(`should export "${ANALYSIS_API}"`, () => {
    expect(ApiNames.ANALYSIS_API).toBeDefined();
    expect(ApiNames.ANALYSIS_API).toEqual(ANALYSIS_API);
  });

  test(`should export "${APP_API}"`, () => {
    expect(ApiNames.APP_API).toBeDefined();
    expect(ApiNames.APP_API).toEqual(APP_API);
  });

  test(`should export "${AUTHORIZATION_API}"`, () => {
    expect(ApiNames.AUTHORIZATION_API).toBeDefined();
    expect(ApiNames.AUTHORIZATION_API).toEqual(AUTHORIZATION_API);
  });

  test(`should export "${DATA_API}"`, () => {
    expect(ApiNames.DATA_API).toBeDefined();
    expect(ApiNames.DATA_API).toEqual(DATA_API);
  });

  test(`should export "${DATA_SOURCES_API}"`, () => {
    expect(ApiNames.DATA_SOURCES_API).toBeDefined();
    expect(ApiNames.DATA_SOURCES_API).toEqual(DATA_SOURCES_API);
  });

  test(`should export "${EDM_API}"`, () => {
    expect(ApiNames.EDM_API).toBeDefined();
    expect(ApiNames.EDM_API).toEqual(EDM_API);
  });

  test(`should export "${LINKING_API}"`, () => {
    expect(ApiNames.LINKING_API).toBeDefined();
    expect(ApiNames.LINKING_API).toEqual(LINKING_API);
  });

  test(`should export "${ORGANIZATIONS_API}"`, () => {
    expect(ApiNames.ORGANIZATIONS_API).toBeDefined();
    expect(ApiNames.ORGANIZATIONS_API).toEqual(ORGANIZATIONS_API);
  });

  test(`should export "${PERMISSIONS_API}"`, () => {
    expect(ApiNames.PERMISSIONS_API).toBeDefined();
    expect(ApiNames.PERMISSIONS_API).toEqual(PERMISSIONS_API);
  });

  test(`should export "${PRINCIPALS_API}"`, () => {
    expect(ApiNames.PRINCIPALS_API).toBeDefined();
    expect(ApiNames.PRINCIPALS_API).toEqual(PRINCIPALS_API);
  });

  test(`should export "${REQUESTS_API}"`, () => {
    expect(ApiNames.REQUESTS_API).toBeDefined();
    expect(ApiNames.REQUESTS_API).toEqual(REQUESTS_API);
  });

  test(`should export "${SEARCH_API}"`, () => {
    expect(ApiNames.SEARCH_API).toBeDefined();
    expect(ApiNames.SEARCH_API).toEqual(SEARCH_API);
  });

  test(`should export "${SYNC_API}"`, () => {
    expect(ApiNames.SYNC_API).toBeDefined();
    expect(ApiNames.SYNC_API).toEqual(SYNC_API);
  });

});
