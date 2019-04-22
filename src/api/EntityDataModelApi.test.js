/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as EntityDataModelApi from './EntityDataModelApi';
import { EDM_API } from '../constants/ApiNames';
import { genMockBaseUrl, genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  DIFF_PATH,
  IDS_PATH,
  NAMESPACE_PATH,
  ENTITY_SET_PATH,
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
  MOCK_ENTITY_SET_DM,
  MOCK_ENTITY_TYPE,
  MOCK_PROPERTY_TYPE,
  MOCK_SCHEMA,
} from '../utils/testing/MockDataModels';

import {
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
  testGetEntitySet();
  testGetEntitySetId();
  testGetAllEntitySets();
  testCreateEntitySets();
  testDeleteEntitySet();
  testUpdateEntitySetMetaData();
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
  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    const fnToTest = EntityDataModelApi.getSchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetSchemaFileUrl() {

  describe('getSchemaFileUrl()', () => {

    const fnToTest = EntityDataModelApi.getSchemaFileUrl;

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
  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    const fnToTest = EntityDataModelApi.getAllSchemasInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    const fnToTest = EntityDataModelApi.createSchema;

    const validParams = [MOCK_SCHEMA];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${SCHEMA_PATH}`, MOCK_SCHEMA];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testCreateEmptySchema() {

  describe('createEmptySchema()', () => {

    const fnToTest = EntityDataModelApi.createEmptySchema;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testUpdateSchema() {

  describe('updateSchema()', () => {

    const fnToTest = EntityDataModelApi.updateSchema;
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

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const fnToTest = EntityDataModelApi.getEntitySet;

    const validParams = [MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetEntitySetId() {

  describe('getEntitySetId()', () => {

    const fnToTest = EntityDataModelApi.getEntitySetId;

    const validParams = [MOCK_ENTITY_SET_DM.name];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${IDS_PATH}/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetAllEntitySets() {

  describe('getAllEntitySets()', () => {

    const fnToTest = EntityDataModelApi.getAllEntitySets;

    const validParams = [];
    const axiosParams = [`/${ENTITY_SET_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const fnToTest = EntityDataModelApi.createEntitySets;

    const validParams = [[MOCK_ENTITY_SET_DM]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_SET_PATH}`, [MOCK_ENTITY_SET_DM]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const fnToTest = EntityDataModelApi.deleteEntitySet;

    const validParams = [MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdateEntitySetMetaData() {

  describe('updateEntitySetMetaData()', () => {

    const fnToTest = EntityDataModelApi.updateEntitySetMetaData;

    const validParams = [MOCK_ENTITY_SET_DM.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    const fnToTest = EntityDataModelApi.getEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetEntityTypeId() {

  describe('getEntityTypeId()', () => {

    const fnToTest = EntityDataModelApi.getEntityTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${IDS_PATH}/${ENTITY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
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
  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const fnToTest = EntityDataModelApi.createEntityType;

    const validParams = [MOCK_ENTITY_TYPE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}`, MOCK_ENTITY_TYPE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    const fnToTest = EntityDataModelApi.deleteEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testAddPropertyTypeToEntityType() {

  describe('addPropertyTypeToEntityType()', () => {

    const fnToTest = EntityDataModelApi.addPropertyTypeToEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testRemovePropertyTypeFromEntityType() {

  describe('removePropertyTypeFromEntityType()', () => {

    const fnToTest = EntityDataModelApi.removePropertyTypeFromEntityType;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdateEntityTypeMetaData() {

  describe('updateEntityTypeMetaData()', () => {

    const fnToTest = EntityDataModelApi.updateEntityTypeMetaData;

    const validParams = [MOCK_ENTITY_TYPE.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    const fnToTest = EntityDataModelApi.getPropertyType;

    const validParams = [MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetPropertyTypeId() {

  describe('getPropertyTypeId()', () => {

    const fnToTest = EntityDataModelApi.getPropertyTypeId;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
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
  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const fnToTest = EntityDataModelApi.getAllPropertyTypesInNamespace;

    const validParams = [MOCK_FQN.namespace];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${MOCK_FQN.namespace}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    const fnToTest = EntityDataModelApi.createPropertyType;

    const validParams = [MOCK_PROPERTY_TYPE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}`, MOCK_PROPERTY_TYPE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    const fnToTest = EntityDataModelApi.deletePropertyType;

    const validParams = [MOCK_PROPERTY_TYPE.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdatePropertyTypeMetaData() {

  describe('updatePropertyTypeMetaData()', () => {

    const fnToTest = EntityDataModelApi.updatePropertyTypeMetaData;

    const validParams = [MOCK_PROPERTY_TYPE.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, EDM_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}
