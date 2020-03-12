/* eslint-disable no-use-before-define */

import * as EntityDataModelApi from './EntityDataModelApi';

import * as AxiosUtils from '../utils/axios';
import { EDM_API } from '../constants/ApiNames';
import {
  DIFF_PATH,
  ENTITY_TYPE_PATH,
  IDS_PATH,
  NAMESPACE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  VERSION_PATH,
} from '../constants/UrlConstants';
import { FQN } from '../models';
import { ASSOCIATION_TYPE_MOCK } from '../models/AssociationType';
import { ENTITY_TYPE_MOCK } from '../models/EntityType';
import { PROPERTY_TYPE_MOCK } from '../models/PropertyType';
import { SCHEMA_MOCK } from '../models/Schema';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL_ARRAY,
  INVALID_PARAMS_REQUIRED_STRING,
} from '../utils/testing/InvalidParams';
import { genMockBaseUrl, genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

const MOCK_NAMESPACE = 'mock';
const MOCK_FQN = FQN.of('mock.fqn');
const MOCK_EDM_DM = {
  associationTypes: [ASSOCIATION_TYPE_MOCK],
  entityTypes: [ENTITY_TYPE_MOCK],
  namespaces: [MOCK_NAMESPACE],
  propertyTypes: [PROPERTY_TYPE_MOCK],
  schemas: [SCHEMA_MOCK],
  version: 'd7553374-4ab8-4954-ae50-857948f5265f',
};

/*
 * mocks
 */

const MOCK_BASE_URL = genMockBaseUrl();
const MOCK_METADATA_UPDATE = {
  type: MOCK_FQN,
  name: genRandomString(),
  title: genRandomString(),
  description: genRandomString(),
  contacts: ['support@openlattice.com']
};

jest.mock('../utils/axios');
AxiosUtils.getApiBaseUrl.mockImplementation(() => MOCK_BASE_URL);
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('EntityDataModelApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetEntityDataModel();
  testGetEntityDataModelDiff();
  testGetEntityDataModelProjection();
  testGetEntityDataModelVersion();
  testUpdateEntityDataModel();
  testGetSchema();
  testGetAllSchemas();
  testGetAllSchemasInNamespace();
  testGetSchemaFileUrl();
  testCreateSchema();
  testCreateEmptySchema();
  testUpdateSchema();
  testGetEntityType();
  testGetEntityTypeId();
  testGetAllEntityTypes();
  testCreateEntityType();
  testDeleteEntityType();
  testAddPropertyTypeToEntityType();
  testRemovePropertyTypeFromEntityType();
  testUpdateEntityTypeMetaData();
  testGetPropertyType();
  testGetPropertyTypeId();
  testGetAllPropertyTypes();
  testGetAllPropertyTypesInNamespace();
  testCreatePropertyType();
  testDeletePropertyType();
  testUpdatePropertyTypeMetaData();
});

function testGetEntityDataModel() {

  describe('getEntityDataModel()', () => {

    const fnToTest = EntityDataModelApi.getEntityDataModel;

    const validParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntityDataModelDiff() {

  describe('getEntityDataModelDiff()', () => {

    const fnToTest = EntityDataModelApi.getEntityDataModelDiff;

    const validParams = [MOCK_EDM_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${DIFF_PATH}`, MOCK_EDM_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntityDataModelProjection() {

  describe('getEntityDataModelProjection()', () => {

    const fnToTest = EntityDataModelApi.getEntityDataModelProjection;

    // TODO: create mock projection object
    const mockProjection = [{}];
    const validParams = [mockProjection];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', mockProjection];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    // TODO: add invalid parameters tests
    // testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntityDataModelVersion() {

  describe('getEntityDataModelVersion()', () => {

    const fnToTest = EntityDataModelApi.getEntityDataModelVersion;

    const validParams = [];
    const axiosParams = [`/${VERSION_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdateEntityDataModel() {

  describe('updateEntityDataModel()', () => {

    const fnToTest = EntityDataModelApi.updateEntityDataModel;

    const validParams = [MOCK_EDM_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_EDM_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    const fnToTest = EntityDataModelApi.getSchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetSchemaFileUrl() {

  describe('getSchemaFileUrl()', () => {

    const fnToTest = EntityDataModelApi.getSchemaFileUrl;

    const MOCK_FILE_TYPE = 'json';
    const validParams = [MOCK_FQN, MOCK_FILE_TYPE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];

    test('should return the correct URL', () => {

      expect(EntityDataModelApi.getSchemaFileUrl(MOCK_FQN, MOCK_FILE_TYPE)).toEqual(
        // eslint-disable-next-line
        `${MOCK_BASE_URL}/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    test('should correctly set the fileType query param as lowercase', () => {

      expect(EntityDataModelApi.getSchemaFileUrl(MOCK_FQN, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        // eslint-disable-next-line
        `${MOCK_BASE_URL}/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(fnToTest, validParams, invalidParams);
  });
}

function testGetAllSchemas() {

  describe('getAllSchemas()', () => {

    const fnToTest = EntityDataModelApi.getAllSchemas;

    const validParams = [];
    const axiosParams = [`/${SCHEMA_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    const fnToTest = EntityDataModelApi.getAllSchemasInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    const fnToTest = EntityDataModelApi.createSchema;

    const validParams = [SCHEMA_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}`, SCHEMA_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreateEmptySchema() {

  describe('createEmptySchema()', () => {

    const fnToTest = EntityDataModelApi.createEmptySchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdateSchema() {

  describe('updateSchema()', () => {

    const fnToTest = EntityDataModelApi.updateSchema;
    const MOCK_ACTION = 'ADD';

    const validParams = [
      MOCK_FQN,
      MOCK_ACTION,
      [ENTITY_TYPE_MOCK.id],
      [PROPERTY_TYPE_MOCK.id]
    ];

    const invalidParams = [
      INVALID_PARAMS,
      INVALID_PARAMS,
      INVALID_PARAMS_OPTIONAL_ARRAY,
      INVALID_PARAMS_OPTIONAL_ARRAY,
    ];

    const axiosParams = [
      `/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`,
      {
        action: MOCK_ACTION,
        entityTypes: [ENTITY_TYPE_MOCK.id],
        propertyTypes: [PROPERTY_TYPE_MOCK.id]
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    const fnToTest = EntityDataModelApi.getEntityType;

    const validParams = [ENTITY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntityTypeId() {

  describe('getEntityTypeId()', () => {

    const fnToTest = EntityDataModelApi.getEntityTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${IDS_PATH}/${ENTITY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllEntityTypes() {

  describe('getAllEntityTypes()', () => {

    const fnToTest = EntityDataModelApi.getAllEntityTypes;

    const validParams = [];
    const axiosParams = [`/${ENTITY_TYPE_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const fnToTest = EntityDataModelApi.createEntityType;

    const validParams = [ENTITY_TYPE_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}`, ENTITY_TYPE_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    const fnToTest = EntityDataModelApi.deleteEntityType;

    const validParams = [ENTITY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testAddPropertyTypeToEntityType() {

  describe('addPropertyTypeToEntityType()', () => {

    const fnToTest = EntityDataModelApi.addPropertyTypeToEntityType;

    const validParams = [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testRemovePropertyTypeFromEntityType() {

  describe('removePropertyTypeFromEntityType()', () => {

    const fnToTest = EntityDataModelApi.removePropertyTypeFromEntityType;

    const validParams = [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdateEntityTypeMetaData() {

  describe('updateEntityTypeMetaData()', () => {

    const fnToTest = EntityDataModelApi.updateEntityTypeMetaData;

    const validParams = [ENTITY_TYPE_MOCK.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    const fnToTest = EntityDataModelApi.getPropertyType;

    const validParams = [PROPERTY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetPropertyTypeId() {

  describe('getPropertyTypeId()', () => {

    const fnToTest = EntityDataModelApi.getPropertyTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllPropertyTypes() {

  describe('getAllPropertyTypes()', () => {

    const fnToTest = EntityDataModelApi.getAllPropertyTypes;

    const validParams = [];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const fnToTest = EntityDataModelApi.getAllPropertyTypesInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    const fnToTest = EntityDataModelApi.createPropertyType;

    const validParams = [PROPERTY_TYPE_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}`, PROPERTY_TYPE_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    const fnToTest = EntityDataModelApi.deletePropertyType;

    const validParams = [PROPERTY_TYPE_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdatePropertyTypeMetaData() {

  describe('updatePropertyTypeMetaData()', () => {

    const fnToTest = EntityDataModelApi.updatePropertyTypeMetaData;

    const validParams = [PROPERTY_TYPE_MOCK.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
