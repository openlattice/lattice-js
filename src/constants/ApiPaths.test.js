import * as ApiPaths from './ApiPaths';

// base endpoint controller paths
const ANALYSIS_PATH = 'analysis';
const APP_PATH = 'app';
const AUTHORIZATIONS_PATH = 'authorizations';
const DATA_PATH = 'data';
const DATA_SOURCES_PATH = 'datasource';
const DATASTORE_PATH = 'datastore';
const EDM_PATH = 'edm';
const INTEGRATION_PATH = 'integration';
const LINKING_PATH = 'linking';
const ORGANIZATIONS_PATH = 'organizations';
const PERMISSIONS_PATH = 'permissions';
const PRINCIPALS_PATH = 'principals';
const REQUESTS_PATH = 'requests';
const SEARCH_PATH = 'search';

// shared paths
const BULK_PATH = 'bulk';
const ENTITY_SET_PATH = 'entity/set';
const ENTITY_TYPE_PATH = 'entity/type';
const IDS_PATH = 'ids';
const NAMESPACE_PATH = 'namespace';
const PROPERTY_TYPE_PATH = 'property/type';
const ROLES_PATH = 'roles';
const SET_PATH = 'set';
const TYPE_PATH = 'type';
const UPDATE_PATH = 'update';

// AnalysisApi specific paths
const TYPES_PATH = 'types';

// AppApi specific paths
const CONFIG_PATH = 'config';
const INSTALL_PATH = 'install';
const LOOKUP_PATH = 'lookup';

// DataApi specific paths
const COUNT_PATH = 'count';
const ASSOCIATION_PATH = 'association';

// EntityDataModelApi specific paths
const ASSOCIATION_TYPE_PATH = 'association/type';
const COMPLEX_TYPE_PATH = 'complex/type';
const DETAILED_PATH = 'detailed';
const ENUM_TYPE_PATH = 'enum/type';
const FORCE_PATH = 'force';
const HIERARCHY_PATH = 'hierarchy';
const SCHEMA_PATH = 'schema';
const SRC_PATH = 'src';
const DST_PATH = 'dst';

// OrganizationsApi specific paths
const DESCRIPTION_PATH = 'description';
const EMAIL_DOMAINS_PATH = 'email-domains';
const MEMBERS_PATH = 'members';
const TITLE_PATH = 'title';

// PrincipalsApi specific paths
const EMAIL_PATH = 'email';
const USERS_PATH = 'users';

// SearchApi specific paths
const ADVANCED_PATH = 'advanced';
const FQN_PATH = 'fqn';
const NEIGHBORS_PATH = 'neighbors';
const SEARCH_ENTITY_TYPES_PATH = 'entity_types';
const SEARCH_PROPERTY_TYPES_PATH = 'property_types';

// SyncApi specific paths
const CURRENT_PATH = 'current';

describe('ApiPaths', () => {

  describe('base endpoint controller paths', () => {

    test(`should export "${ANALYSIS_PATH}"`, () => {
      expect(ApiPaths.ANALYSIS_PATH).toBeDefined();
      expect(ApiPaths.ANALYSIS_PATH).toEqual(ANALYSIS_PATH);
    });

    test(`should export "${APP_PATH}"`, () => {
      expect(ApiPaths.APP_PATH).toBeDefined();
      expect(ApiPaths.APP_PATH).toEqual(APP_PATH);
    });

    test(`should export "${AUTHORIZATIONS_PATH}"`, () => {
      expect(ApiPaths.AUTHORIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.AUTHORIZATIONS_PATH).toEqual(AUTHORIZATIONS_PATH);
    });

    test(`should export "${DATA_PATH}"`, () => {
      expect(ApiPaths.DATA_PATH).toBeDefined();
      expect(ApiPaths.DATA_PATH).toEqual(DATA_PATH);
    });

    test(`should export "${DATA_SOURCES_PATH}"`, () => {
      expect(ApiPaths.DATA_SOURCES_PATH).toBeDefined();
      expect(ApiPaths.DATA_SOURCES_PATH).toEqual(DATA_SOURCES_PATH);
    });

    test(`should export "${DATASTORE_PATH}"`, () => {
      expect(ApiPaths.DATASTORE_PATH).toBeDefined();
      expect(ApiPaths.DATASTORE_PATH).toEqual(DATASTORE_PATH);
    });

    test(`should export "${EDM_PATH}"`, () => {
      expect(ApiPaths.EDM_PATH).toBeDefined();
      expect(ApiPaths.EDM_PATH).toEqual(EDM_PATH);
    });

    test(`should export "${INTEGRATION_PATH}"`, () => {
      expect(ApiPaths.INTEGRATION_PATH).toBeDefined();
      expect(ApiPaths.INTEGRATION_PATH).toEqual(INTEGRATION_PATH);
    });

    test(`should export "${LINKING_PATH}"`, () => {
      expect(ApiPaths.LINKING_PATH).toBeDefined();
      expect(ApiPaths.LINKING_PATH).toEqual(LINKING_PATH);
    });

    test(`should export "${ORGANIZATIONS_PATH}"`, () => {
      expect(ApiPaths.ORGANIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.ORGANIZATIONS_PATH).toEqual(ORGANIZATIONS_PATH);
    });

    test(`should export "${PERMISSIONS_PATH}"`, () => {
      expect(ApiPaths.PERMISSIONS_PATH).toBeDefined();
      expect(ApiPaths.PERMISSIONS_PATH).toEqual(PERMISSIONS_PATH);
    });

    test(`should export "${PRINCIPALS_PATH}"`, () => {
      expect(ApiPaths.PRINCIPALS_PATH).toBeDefined();
      expect(ApiPaths.PRINCIPALS_PATH).toEqual(PRINCIPALS_PATH);
    });

    test(`should export "${REQUESTS_PATH}"`, () => {
      expect(ApiPaths.REQUESTS_PATH).toBeDefined();
      expect(ApiPaths.REQUESTS_PATH).toEqual(REQUESTS_PATH);
    });

    test(`should export "${SEARCH_PATH}"`, () => {
      expect(ApiPaths.SEARCH_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_PATH).toEqual(SEARCH_PATH);
    });

  });

  describe('shared paths', () => {

    test(`should export "${BULK_PATH}"`, () => {
      expect(ApiPaths.BULK_PATH).toBeDefined();
      expect(ApiPaths.BULK_PATH).toEqual(BULK_PATH);
    });

    test(`should export "${ENTITY_SET_PATH}"`, () => {
      expect(ApiPaths.ENTITY_SET_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_SET_PATH).toEqual(ENTITY_SET_PATH);
    });

    test(`should export "${ENTITY_TYPE_PATH}"`, () => {
      expect(ApiPaths.ENTITY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_TYPE_PATH).toEqual(ENTITY_TYPE_PATH);
    });

    test(`should export "${IDS_PATH}"`, () => {
      expect(ApiPaths.IDS_PATH).toBeDefined();
      expect(ApiPaths.IDS_PATH).toEqual(IDS_PATH);
    });

    test(`should export "${NAMESPACE_PATH}"`, () => {
      expect(ApiPaths.NAMESPACE_PATH).toBeDefined();
      expect(ApiPaths.NAMESPACE_PATH).toEqual(NAMESPACE_PATH);
    });

    test(`should export "${PROPERTY_TYPE_PATH}"`, () => {
      expect(ApiPaths.PROPERTY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.PROPERTY_TYPE_PATH).toEqual(PROPERTY_TYPE_PATH);
    });

    test(`should export "${ROLES_PATH}"`, () => {
      expect(ApiPaths.ROLES_PATH).toBeDefined();
      expect(ApiPaths.ROLES_PATH).toEqual(ROLES_PATH);
    });

    test(`should export "${SET_PATH}"`, () => {
      expect(ApiPaths.SET_PATH).toBeDefined();
      expect(ApiPaths.SET_PATH).toEqual(SET_PATH);
    });

    test(`should export "${TYPE_PATH}"`, () => {
      expect(ApiPaths.TYPE_PATH).toBeDefined();
      expect(ApiPaths.TYPE_PATH).toEqual(TYPE_PATH);
    });

    it(`should expose "${UPDATE_PATH}"`, () => {
      expect(ApiPaths.UPDATE_PATH).toBeDefined();
      expect(ApiPaths.UPDATE_PATH).toEqual(UPDATE_PATH);
    });

  });

  describe('AnalysisApi specific paths', () => {

    test(`should export "${TYPES_PATH}"`, () => {
      expect(ApiPaths.TYPES_PATH).toBeDefined();
      expect(ApiPaths.TYPES_PATH).toEqual(TYPES_PATH);
    });

  });

  describe('AppApi specific paths', () => {

    test(`should export "${CONFIG_PATH}"`, () => {
      expect(ApiPaths.CONFIG_PATH).toBeDefined();
      expect(ApiPaths.CONFIG_PATH).toEqual(CONFIG_PATH);
    });

    test(`should export "${INSTALL_PATH}"`, () => {
      expect(ApiPaths.INSTALL_PATH).toBeDefined();
      expect(ApiPaths.INSTALL_PATH).toEqual(INSTALL_PATH);
    });

    test(`should export "${LOOKUP_PATH}"`, () => {
      expect(ApiPaths.LOOKUP_PATH).toBeDefined();
      expect(ApiPaths.LOOKUP_PATH).toEqual(LOOKUP_PATH);
    });

  });

  describe('DataApi specific paths', () => {

    test(`should export "${COUNT_PATH}"`, () => {
      expect(ApiPaths.COUNT_PATH).toBeDefined();
      expect(ApiPaths.COUNT_PATH).toEqual(COUNT_PATH);
    });

    test(`should export "${ASSOCIATION_PATH}"`, () => {
      expect(ApiPaths.ASSOCIATION_PATH).toBeDefined();
      expect(ApiPaths.ASSOCIATION_PATH).toEqual(ASSOCIATION_PATH);
    });

  });

  describe('EntityDataModelApi specific paths', () => {

    test(`should export "${ASSOCIATION_TYPE_PATH}"`, () => {
      expect(ApiPaths.ASSOCIATION_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ASSOCIATION_TYPE_PATH).toEqual(ASSOCIATION_TYPE_PATH);
    });

    test(`should export "${COMPLEX_TYPE_PATH}"`, () => {
      expect(ApiPaths.COMPLEX_TYPE_PATH).toBeDefined();
      expect(ApiPaths.COMPLEX_TYPE_PATH).toEqual(COMPLEX_TYPE_PATH);
    });

    test(`should export "${DETAILED_PATH}"`, () => {
      expect(ApiPaths.DETAILED_PATH).toBeDefined();
      expect(ApiPaths.DETAILED_PATH).toEqual(DETAILED_PATH);
    });

    test(`should export "${ENUM_TYPE_PATH}"`, () => {
      expect(ApiPaths.ENUM_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ENUM_TYPE_PATH).toEqual(ENUM_TYPE_PATH);
    });

    test(`should export "${FORCE_PATH}"`, () => {
      expect(ApiPaths.FORCE_PATH).toBeDefined();
      expect(ApiPaths.FORCE_PATH).toEqual(FORCE_PATH);
    });

    test(`should export "${HIERARCHY_PATH}"`, () => {
      expect(ApiPaths.HIERARCHY_PATH).toBeDefined();
      expect(ApiPaths.HIERARCHY_PATH).toEqual(HIERARCHY_PATH);
    });

    test(`should export "${SCHEMA_PATH}"`, () => {
      expect(ApiPaths.SCHEMA_PATH).toBeDefined();
      expect(ApiPaths.SCHEMA_PATH).toEqual(SCHEMA_PATH);
    });

    test(`should export "${SRC_PATH}"`, () => {
      expect(ApiPaths.SRC_PATH).toBeDefined();
      expect(ApiPaths.SRC_PATH).toEqual(SRC_PATH);
    });

    test(`should export "${DST_PATH}"`, () => {
      expect(ApiPaths.DST_PATH).toBeDefined();
      expect(ApiPaths.DST_PATH).toEqual(DST_PATH);
    });

  });

  describe('OrganizationsApi specific paths', () => {

    test(`should export "${DESCRIPTION_PATH}"`, () => {
      expect(ApiPaths.DESCRIPTION_PATH).toBeDefined();
      expect(ApiPaths.DESCRIPTION_PATH).toEqual(DESCRIPTION_PATH);
    });

    test(`should export "${EMAIL_DOMAINS_PATH}"`, () => {
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toBeDefined();
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toEqual(EMAIL_DOMAINS_PATH);
    });

    test(`should export "${MEMBERS_PATH}"`, () => {
      expect(ApiPaths.MEMBERS_PATH).toBeDefined();
      expect(ApiPaths.MEMBERS_PATH).toEqual(MEMBERS_PATH);
    });

    test(`should export "${TITLE_PATH}"`, () => {
      expect(ApiPaths.TITLE_PATH).toBeDefined();
      expect(ApiPaths.TITLE_PATH).toEqual(TITLE_PATH);
    });

  });

  describe('PrincipalsApi specific paths', () => {

    test(`should export "${EMAIL_PATH}"`, () => {
      expect(ApiPaths.EMAIL_PATH).toBeDefined();
      expect(ApiPaths.EMAIL_PATH).toEqual(EMAIL_PATH);
    });

    test(`should export "${USERS_PATH}"`, () => {
      expect(ApiPaths.USERS_PATH).toBeDefined();
      expect(ApiPaths.USERS_PATH).toEqual(USERS_PATH);
    });

  });

  describe('SearchApi specific paths', () => {

    test(`should export "${ADVANCED_PATH}"`, () => {
      expect(ApiPaths.ADVANCED_PATH).toBeDefined();
      expect(ApiPaths.ADVANCED_PATH).toEqual(ADVANCED_PATH);
    });

    test(`should export "${FQN_PATH}"`, () => {
      expect(ApiPaths.FQN_PATH).toBeDefined();
      expect(ApiPaths.FQN_PATH).toEqual(FQN_PATH);
    });

    test(`should export "${NEIGHBORS_PATH}"`, () => {
      expect(ApiPaths.NEIGHBORS_PATH).toBeDefined();
      expect(ApiPaths.NEIGHBORS_PATH).toEqual(NEIGHBORS_PATH);
    });

    test(`should export "${SEARCH_ENTITY_TYPES_PATH}"`, () => {
      expect(ApiPaths.SEARCH_ENTITY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_ENTITY_TYPES_PATH).toEqual(SEARCH_ENTITY_TYPES_PATH);
    });

    test(`should export "${SEARCH_PROPERTY_TYPES_PATH}"`, () => {
      expect(ApiPaths.SEARCH_PROPERTY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_PROPERTY_TYPES_PATH).toEqual(SEARCH_PROPERTY_TYPES_PATH);
    });

  });

  describe('SyncApi specific paths', () => {

    test(`should export "${CURRENT_PATH}"`, () => {
      expect(ApiPaths.CURRENT_PATH).toBeDefined();
      expect(ApiPaths.CURRENT_PATH).toEqual(CURRENT_PATH);
    });

  });

});
