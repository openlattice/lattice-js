import * as ApiPaths from '../../src/constants/ApiPaths';

// base paths
const DATA_PATH :string = 'data';
const DATASTORE_PATH :string = 'datastore';
const ONTOLOGY_PATH :string = 'ontology';

// shared paths
const ENTITY_SET_PATH :string = 'entity/set';
const ENTITY_TYPE_PATH :string = 'entity/type';
const PROPERTY_TYPE_PATH :string = 'property/type';
const NAMESPACE_PATH :string = 'namespace';

// DataApi specific paths
const ENTITY_DATA_PATH :string = 'entitydata';
const MULTIPLE_PATH :string = 'multiple';
const SELECTED_PATH :string = 'selected';

// EntityDataModelApi specific paths
const SCHEMA_PATH :string = 'schema';
const ADD_PROPERTY_TYPES_PATH :string = 'addPropertyTypes';
const DELETE_PROPERTY_TYPES_PATH :string = 'deletePropertyTypes';

// PermissionsApi specific paths
const ACL_PATH :string = 'acl';
const ALL_PATH :string = 'all';
const OWNER_PATH :string = 'owner';
const REQUESTS_PATH :string = 'requests';

// UsersApi specific paths
const ADMIN_PATH :string = 'admin';
const RESET_PATH :string = 'reset';
const ROLES_PATH :string = 'roles';
const USERS_PATH :string = 'users';

describe('ApiPaths', () => {

  describe('base paths', () => {

    it(`should expose "${DATA_PATH}"`, () => {
      expect(ApiPaths.DATA_PATH).toBeDefined();
      expect(ApiPaths.DATA_PATH).toEqual(DATA_PATH);
    });

    it(`should expose "${DATASTORE_PATH}"`, () => {
      expect(ApiPaths.DATASTORE_PATH).toBeDefined();
      expect(ApiPaths.DATASTORE_PATH).toEqual(DATASTORE_PATH);
    });

    it(`should expose "${ONTOLOGY_PATH}"`, () => {
      expect(ApiPaths.ONTOLOGY_PATH).toBeDefined();
      expect(ApiPaths.ONTOLOGY_PATH).toEqual(ONTOLOGY_PATH);
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

    it(`should expose "${PROPERTY_TYPE_PATH}"`, () => {
      expect(ApiPaths.PROPERTY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.PROPERTY_TYPE_PATH).toEqual(PROPERTY_TYPE_PATH);
    });

    it(`should expose "${NAMESPACE_PATH}"`, () => {
      expect(ApiPaths.NAMESPACE_PATH).toBeDefined();
      expect(ApiPaths.NAMESPACE_PATH).toEqual(NAMESPACE_PATH);
    });

  });

  describe('DataApi specific paths', () => {

    it(`should expose "${ENTITY_DATA_PATH}"`, () => {
      expect(ApiPaths.ENTITY_DATA_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_DATA_PATH).toEqual(ENTITY_DATA_PATH);
    });

    it(`should expose "${MULTIPLE_PATH}"`, () => {
      expect(ApiPaths.MULTIPLE_PATH).toBeDefined();
      expect(ApiPaths.MULTIPLE_PATH).toEqual(MULTIPLE_PATH);
    });

    it(`should expose "${SELECTED_PATH}"`, () => {
      expect(ApiPaths.SELECTED_PATH).toBeDefined();
      expect(ApiPaths.SELECTED_PATH).toEqual(SELECTED_PATH);
    });

  });

  describe('EntityDataModelApi specific paths', () => {

    it(`should expose "${SCHEMA_PATH}"`, () => {
      expect(ApiPaths.SCHEMA_PATH).toBeDefined();
      expect(ApiPaths.SCHEMA_PATH).toEqual(SCHEMA_PATH);
    });

    it(`should expose "${ADD_PROPERTY_TYPES_PATH}"`, () => {
      expect(ApiPaths.ADD_PROPERTY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.ADD_PROPERTY_TYPES_PATH).toEqual(ADD_PROPERTY_TYPES_PATH);
    });

    it(`should expose "${DELETE_PROPERTY_TYPES_PATH}"`, () => {
      expect(ApiPaths.DELETE_PROPERTY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.DELETE_PROPERTY_TYPES_PATH).toEqual(DELETE_PROPERTY_TYPES_PATH);
    });

  });

  describe('PermissionsApi specific paths', () => {

    it(`should expose "${ACL_PATH}"`, () => {
      expect(ApiPaths.ACL_PATH).toBeDefined();
      expect(ApiPaths.ACL_PATH).toEqual(ACL_PATH);
    });

    it(`should expose "${ALL_PATH}"`, () => {
      expect(ApiPaths.ALL_PATH).toBeDefined();
      expect(ApiPaths.ALL_PATH).toEqual(ALL_PATH);
    });

    it(`should expose "${OWNER_PATH}"`, () => {
      expect(ApiPaths.OWNER_PATH).toBeDefined();
      expect(ApiPaths.OWNER_PATH).toEqual(OWNER_PATH);
    });

    it(`should expose "${REQUESTS_PATH}"`, () => {
      expect(ApiPaths.REQUESTS_PATH).toBeDefined();
      expect(ApiPaths.REQUESTS_PATH).toEqual(REQUESTS_PATH);
    });

  });

  describe('UsersApi specific paths', () => {

    it(`should expose "${ADMIN_PATH}"`, () => {
      expect(ApiPaths.ADMIN_PATH).toBeDefined();
      expect(ApiPaths.ADMIN_PATH).toEqual(ADMIN_PATH);
    });

    it(`should expose "${RESET_PATH}"`, () => {
      expect(ApiPaths.RESET_PATH).toBeDefined();
      expect(ApiPaths.RESET_PATH).toEqual(RESET_PATH);
    });

    it(`should expose "${ROLES_PATH}"`, () => {
      expect(ApiPaths.ROLES_PATH).toBeDefined();
      expect(ApiPaths.ROLES_PATH).toEqual(ROLES_PATH);
    });

    it(`should expose "${USERS_PATH}"`, () => {
      expect(ApiPaths.USERS_PATH).toBeDefined();
      expect(ApiPaths.USERS_PATH).toEqual(USERS_PATH);
    });

  });

});
