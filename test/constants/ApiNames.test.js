import * as ApiNames from '../../src/constants/ApiNames';

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

  it(`should expose "${ANALYSIS_API}"`, () => {
    expect(ApiNames.ANALYSIS_API).toBeDefined();
    expect(ApiNames.ANALYSIS_API).toEqual(ANALYSIS_API);
  });

  it(`should expose "${APP_API}"`, () => {
    expect(ApiNames.APP_API).toBeDefined();
    expect(ApiNames.APP_API).toEqual(APP_API);
  });

  it(`should expose "${AUTHORIZATION_API}"`, () => {
    expect(ApiNames.AUTHORIZATION_API).toBeDefined();
    expect(ApiNames.AUTHORIZATION_API).toEqual(AUTHORIZATION_API);
  });

  it(`should expose "${DATA_API}"`, () => {
    expect(ApiNames.DATA_API).toBeDefined();
    expect(ApiNames.DATA_API).toEqual(DATA_API);
  });

  it(`should expose "${DATA_SOURCES_API}"`, () => {
    expect(ApiNames.DATA_SOURCES_API).toBeDefined();
    expect(ApiNames.DATA_SOURCES_API).toEqual(DATA_SOURCES_API);
  });

  it(`should expose "${EDM_API}"`, () => {
    expect(ApiNames.EDM_API).toBeDefined();
    expect(ApiNames.EDM_API).toEqual(EDM_API);
  });

  it(`should expose "${LINKING_API}"`, () => {
    expect(ApiNames.LINKING_API).toBeDefined();
    expect(ApiNames.LINKING_API).toEqual(LINKING_API);
  });

  it(`should expose "${ORGANIZATIONS_API}"`, () => {
    expect(ApiNames.ORGANIZATIONS_API).toBeDefined();
    expect(ApiNames.ORGANIZATIONS_API).toEqual(ORGANIZATIONS_API);
  });

  it(`should expose "${PERMISSIONS_API}"`, () => {
    expect(ApiNames.PERMISSIONS_API).toBeDefined();
    expect(ApiNames.PERMISSIONS_API).toEqual(PERMISSIONS_API);
  });

  it(`should expose "${PRINCIPALS_API}"`, () => {
    expect(ApiNames.PRINCIPALS_API).toBeDefined();
    expect(ApiNames.PRINCIPALS_API).toEqual(PRINCIPALS_API);
  });

  it(`should expose "${REQUESTS_API}"`, () => {
    expect(ApiNames.REQUESTS_API).toBeDefined();
    expect(ApiNames.REQUESTS_API).toEqual(REQUESTS_API);
  });

  it(`should expose "${SEARCH_API}"`, () => {
    expect(ApiNames.SEARCH_API).toBeDefined();
    expect(ApiNames.SEARCH_API).toEqual(SEARCH_API);
  });

  it(`should expose "${SYNC_API}"`, () => {
    expect(ApiNames.SYNC_API).toBeDefined();
    expect(ApiNames.SYNC_API).toEqual(SYNC_API);
  });

});
