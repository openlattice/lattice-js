import * as ApiPaths from '../../src/constants/ApiPaths';

// base paths
const DATASTORE_PATH :string = 'datastore';

// shared paths
const ENTITY_SET_PATH :string = 'entity/set';
const ENTITY_TYPE_PATH :string = 'entity/type';
const IDS_PATH :string = 'ids';
const NAMESPACE_PATH :string = 'namespace';
const PRINCIPALS_PATH :string = 'principals';
const PROPERTY_TYPE_PATH :string = 'property/type';
const ROLES_PATH :string = 'roles';
const SET_PATH :string = 'set';
const TYPE_PATH :string = 'type';

// AuthorizationApi specific paths
const AUTHORIZATIONS_PATH :string = 'authorizations';

// DataApi specific paths
const DATA_PATH :string = 'data';
const ENTITY_DATA_PATH :string = 'entitydata';
const TICKET_PATH :string = 'ticket';

// DataSourcesApi specific paths
const DATA_SOURCES_PATH :string = 'datasource';

// EntityDataModelApi specific paths
const EDM_PATH :string = 'edm';
const SCHEMA_PATH :string = 'schema';

// LinkingApi specific paths
const LINKING_PATH :string = 'linking';

// OrganizationsApi specific paths
const DESCRIPTION_PATH :string = 'description';
const EMAIL_DOMAINS_PATH :string = 'email-domains';
const MEMBERS_PATH :string = 'members';
const ORGANIZATIONS_PATH :string = 'organizations';
const TITLE_PATH :string = 'title';

// PermissionsApi specific paths
const PERMISSIONS_PATH :string = 'permissions';

// PermissionsRequestsApi specific paths
const ADMIN_PATH :string = 'admin';
const PERMISSIONS_REQUESTS_PATH :string = 'permissionsrequests';
const RESOLVED_PATH :string = 'resolved';
const UNRESOLVED_PATH :string = 'unresolved';

// PrincipalsApi specific paths
const USERS_PATH :string = 'users';

// RequestsApi specific paths
const REQUESTS_PATH :string = 'requests';

// SearchApi specific paths
const POPULAR_PATH :string = 'popular';
const SEARCH_PATH :string = 'search';

describe('ApiPaths', () => {

  describe('base paths', () => {

    it(`should expose "${DATASTORE_PATH}"`, () => {
      expect(ApiPaths.DATASTORE_PATH).toBeDefined();
      expect(ApiPaths.DATASTORE_PATH).toEqual(DATASTORE_PATH);
    });

  });

  describe('shared paths', () => {

    it(`should expose "${ENTITY_SET_PATH}"`, () => {
      expect(ApiPaths.ENTITY_SET_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_SET_PATH).toEqual(ENTITY_SET_PATH);
    });

    it(`should expose "${ENTITY_TYPE_PATH}"`, () => {
      expect(ApiPaths.ENTITY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_TYPE_PATH).toEqual(ENTITY_TYPE_PATH);
    });

    it(`should expose "${IDS_PATH}"`, () => {
      expect(ApiPaths.IDS_PATH).toBeDefined();
      expect(ApiPaths.IDS_PATH).toEqual(IDS_PATH);
    });

    it(`should expose "${NAMESPACE_PATH}"`, () => {
      expect(ApiPaths.NAMESPACE_PATH).toBeDefined();
      expect(ApiPaths.NAMESPACE_PATH).toEqual(NAMESPACE_PATH);
    });

    it(`should expose "${PRINCIPALS_PATH}"`, () => {
      expect(ApiPaths.PRINCIPALS_PATH).toBeDefined();
      expect(ApiPaths.PRINCIPALS_PATH).toEqual(PRINCIPALS_PATH);
    });

    it(`should expose "${PROPERTY_TYPE_PATH}"`, () => {
      expect(ApiPaths.PROPERTY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.PROPERTY_TYPE_PATH).toEqual(PROPERTY_TYPE_PATH);
    });

    it(`should expose "${ROLES_PATH}"`, () => {
      expect(ApiPaths.ROLES_PATH).toBeDefined();
      expect(ApiPaths.ROLES_PATH).toEqual(ROLES_PATH);
    });

    it(`should expose "${SET_PATH}"`, () => {
      expect(ApiPaths.SET_PATH).toBeDefined();
      expect(ApiPaths.SET_PATH).toEqual(SET_PATH);
    });

    it(`should expose "${TYPE_PATH}"`, () => {
      expect(ApiPaths.TYPE_PATH).toBeDefined();
      expect(ApiPaths.TYPE_PATH).toEqual(TYPE_PATH);
    });

  });

  describe('AuthorizationApi specific paths', () => {

    it(`should expose "${AUTHORIZATIONS_PATH}"`, () => {
      expect(ApiPaths.AUTHORIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.AUTHORIZATIONS_PATH).toEqual(AUTHORIZATIONS_PATH);
    });

  });

  describe('DataApi specific paths', () => {

    it(`should expose "${DATA_PATH}"`, () => {
      expect(ApiPaths.DATA_PATH).toBeDefined();
      expect(ApiPaths.DATA_PATH).toEqual(DATA_PATH);
    });

    it(`should expose "${ENTITY_DATA_PATH}"`, () => {
      expect(ApiPaths.ENTITY_DATA_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_DATA_PATH).toEqual(ENTITY_DATA_PATH);
    });

    it(`should expose "${TICKET_PATH}"`, () => {
      expect(ApiPaths.TICKET_PATH).toBeDefined();
      expect(ApiPaths.TICKET_PATH).toEqual(TICKET_PATH);
    });

  });

  describe('DataSourcesApi specific paths', () => {

    it(`should expose "${DATA_SOURCES_PATH}"`, () => {
      expect(ApiPaths.DATA_SOURCES_PATH).toBeDefined();
      expect(ApiPaths.DATA_SOURCES_PATH).toEqual(DATA_SOURCES_PATH);
    });

  });

  describe('EntityDataModelApi specific paths', () => {

    it(`should expose "${EDM_PATH}"`, () => {
      expect(ApiPaths.EDM_PATH).toBeDefined();
      expect(ApiPaths.EDM_PATH).toEqual(EDM_PATH);
    });

    it(`should expose "${SCHEMA_PATH}"`, () => {
      expect(ApiPaths.SCHEMA_PATH).toBeDefined();
      expect(ApiPaths.SCHEMA_PATH).toEqual(SCHEMA_PATH);
    });

  });

  describe('LinkingApi specific paths', () => {

    it(`should expose "${LINKING_PATH}"`, () => {
      expect(ApiPaths.LINKING_PATH).toBeDefined();
      expect(ApiPaths.LINKING_PATH).toEqual(LINKING_PATH);
    });

  });

  describe('OrganizationsApi specific paths', () => {

    it(`should expose "${DESCRIPTION_PATH}"`, () => {
      expect(ApiPaths.DESCRIPTION_PATH).toBeDefined();
      expect(ApiPaths.DESCRIPTION_PATH).toEqual(DESCRIPTION_PATH);
    });

    it(`should expose "${EMAIL_DOMAINS_PATH}"`, () => {
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toBeDefined();
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toEqual(EMAIL_DOMAINS_PATH);
    });

    it(`should expose "${MEMBERS_PATH}"`, () => {
      expect(ApiPaths.MEMBERS_PATH).toBeDefined();
      expect(ApiPaths.MEMBERS_PATH).toEqual(MEMBERS_PATH);
    });

    it(`should expose "${ORGANIZATIONS_PATH}"`, () => {
      expect(ApiPaths.ORGANIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.ORGANIZATIONS_PATH).toEqual(ORGANIZATIONS_PATH);
    });

    it(`should expose "${TITLE_PATH}"`, () => {
      expect(ApiPaths.TITLE_PATH).toBeDefined();
      expect(ApiPaths.TITLE_PATH).toEqual(TITLE_PATH);
    });

  });

  describe('PermissionsApi specific paths', () => {

    it(`should expose "${PERMISSIONS_PATH}"`, () => {
      expect(ApiPaths.PERMISSIONS_PATH).toBeDefined();
      expect(ApiPaths.PERMISSIONS_PATH).toEqual(PERMISSIONS_PATH);
    });

  });

  describe('PermissionsRequestsApi specific paths', () => {

    it(`should expose "${ADMIN_PATH}"`, () => {
      expect(ApiPaths.ADMIN_PATH).toBeDefined();
      expect(ApiPaths.ADMIN_PATH).toEqual(ADMIN_PATH);
    });

    it(`should expose "${PERMISSIONS_REQUESTS_PATH}"`, () => {
      expect(ApiPaths.PERMISSIONS_REQUESTS_PATH).toBeDefined();
      expect(ApiPaths.PERMISSIONS_REQUESTS_PATH).toEqual(PERMISSIONS_REQUESTS_PATH);
    });

    it(`should expose "${RESOLVED_PATH}"`, () => {
      expect(ApiPaths.RESOLVED_PATH).toBeDefined();
      expect(ApiPaths.RESOLVED_PATH).toEqual(RESOLVED_PATH);
    });

    it(`should expose "${UNRESOLVED_PATH}"`, () => {
      expect(ApiPaths.UNRESOLVED_PATH).toBeDefined();
      expect(ApiPaths.UNRESOLVED_PATH).toEqual(UNRESOLVED_PATH);
    });

  });

  describe('PrincipalsApi specific paths', () => {

    it(`should expose "${USERS_PATH}"`, () => {
      expect(ApiPaths.USERS_PATH).toBeDefined();
      expect(ApiPaths.USERS_PATH).toEqual(USERS_PATH);
    });

  });

  describe('RequestsApi specific paths', () => {

    it(`should expose "${REQUESTS_PATH}"`, () => {
      expect(ApiPaths.REQUESTS_PATH).toBeDefined();
      expect(ApiPaths.REQUESTS_PATH).toEqual(REQUESTS_PATH);
    });

  });

  describe('SearchApi specific paths', () => {

    it(`should expose "${POPULAR_PATH}"`, () => {
      expect(ApiPaths.POPULAR_PATH).toBeDefined();
      expect(ApiPaths.POPULAR_PATH).toEqual(POPULAR_PATH);
    });

    it(`should expose "${SEARCH_PATH}"`, () => {
      expect(ApiPaths.SEARCH_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_PATH).toEqual(SEARCH_PATH);
    });

  });

});
