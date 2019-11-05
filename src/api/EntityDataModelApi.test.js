/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as EntityDataModelApi from './EntityDataModelApi';
import { EDM_API } from '../constants/ApiNames';
import { genMockBaseUrl, genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  DIFF_PATH,
  IDS_PATH,
  NAMESPACE_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  VERSION_PATH,
} from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';


import {
  MOCK_EDM_DM,
  MOCK_FQN,
  MOCK_ENTITY_TYPE,
  MOCK_PROPERTY_TYPE,
  MOCK_SCHEMA,
} from '../utils/testing/MockDataModels';

import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

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

    const apiToTest = EntityDataModelApi.getEntityDataModel;

    const validParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetEntityDataModelDiff() {

  describe('getEntityDataModelDiff()', () => {

    const apiToTest = EntityDataModelApi.getEntityDataModelDiff;

    const validParams = [MOCK_EDM_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${DIFF_PATH}`, MOCK_EDM_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetEntityDataModelProjection() {

  describe('getEntityDataModelProjection()', () => {

    const apiToTest = EntityDataModelApi.getEntityDataModelProjection;

    // TODO: create mock projection object
    const mockProjection = [{}];
    const validParams = [mockProjection];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', mockProjection];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    // TODO: add invalid parameters tests
    // testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetEntityDataModelVersion() {

  describe('getEntityDataModelVersion()', () => {

    const apiToTest = EntityDataModelApi.getEntityDataModelVersion;

    const validParams = [];
    const axiosParams = [`/${VERSION_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateEntityDataModel() {

  describe('updateEntityDataModel()', () => {

    const apiToTest = EntityDataModelApi.updateEntityDataModel;

    const validParams = [MOCK_EDM_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_EDM_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    const apiToTest = EntityDataModelApi.getSchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetSchemaFileUrl() {

  describe('getSchemaFileUrl()', () => {

    const apiToTest = EntityDataModelApi.getSchemaFileUrl;

    const MOCK_FILE_TYPE = 'json';
    const validParams = [MOCK_FQN, MOCK_FILE_TYPE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];

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

    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(apiToTest, validParams, invalidParams);
  });
}

function testGetAllSchemas() {

  describe('getAllSchemas()', () => {

    const apiToTest = EntityDataModelApi.getAllSchemas;

    const validParams = [];
    const axiosParams = [`/${SCHEMA_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    const apiToTest = EntityDataModelApi.getAllSchemasInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    const apiToTest = EntityDataModelApi.createSchema;

    const validParams = [MOCK_SCHEMA];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}`, MOCK_SCHEMA];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreateEmptySchema() {

  describe('createEmptySchema()', () => {

    const apiToTest = EntityDataModelApi.createEmptySchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateSchema() {

  describe('updateSchema()', () => {

    const apiToTest = EntityDataModelApi.updateSchema;
    const MOCK_ACTION = 'ADD';

    const validParams = [
      MOCK_FQN,
      MOCK_ACTION,
      [MOCK_ENTITY_TYPE.id],
      [MOCK_PROPERTY_TYPE.id]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY
    ];

    const axiosParams = [
      `/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`,
      {
        action: MOCK_ACTION,
        entityTypes: [MOCK_ENTITY_TYPE.id],
        propertyTypes: [MOCK_PROPERTY_TYPE.id]
      }
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    const apiToTest = EntityDataModelApi.getEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetEntityTypeId() {

  describe('getEntityTypeId()', () => {

    const apiToTest = EntityDataModelApi.getEntityTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${IDS_PATH}/${ENTITY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAllEntityTypes() {

  describe('getAllEntityTypes()', () => {

    const apiToTest = EntityDataModelApi.getAllEntityTypes;

    const validParams = [];
    const axiosParams = [`/${ENTITY_TYPE_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const apiToTest = EntityDataModelApi.createEntityType;

    const validParams = [MOCK_ENTITY_TYPE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}`, MOCK_ENTITY_TYPE];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    const apiToTest = EntityDataModelApi.deleteEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testAddPropertyTypeToEntityType() {

  describe('addPropertyTypeToEntityType()', () => {

    const apiToTest = EntityDataModelApi.addPropertyTypeToEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testRemovePropertyTypeFromEntityType() {

  describe('removePropertyTypeFromEntityType()', () => {

    const apiToTest = EntityDataModelApi.removePropertyTypeFromEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateEntityTypeMetaData() {

  describe('updateEntityTypeMetaData()', () => {

    const apiToTest = EntityDataModelApi.updateEntityTypeMetaData;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    const apiToTest = EntityDataModelApi.getPropertyType;

    const validParams = [MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetPropertyTypeId() {

  describe('getPropertyTypeId()', () => {

    const apiToTest = EntityDataModelApi.getPropertyTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAllPropertyTypes() {

  describe('getAllPropertyTypes()', () => {

    const apiToTest = EntityDataModelApi.getAllPropertyTypes;

    const validParams = [];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const apiToTest = EntityDataModelApi.getAllPropertyTypesInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    const apiToTest = EntityDataModelApi.createPropertyType;

    const validParams = [MOCK_PROPERTY_TYPE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}`, MOCK_PROPERTY_TYPE];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    const apiToTest = EntityDataModelApi.deletePropertyType;

    const validParams = [MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdatePropertyTypeMetaData() {

  describe('updatePropertyTypeMetaData()', () => {

    const apiToTest = EntityDataModelApi.updatePropertyTypeMetaData;

    const validParams = [MOCK_PROPERTY_TYPE.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}
