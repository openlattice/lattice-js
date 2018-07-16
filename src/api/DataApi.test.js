/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataApi from './DataApi';
import { DATA_API } from '../constants/ApiNames';

import {
  COUNT_PATH,
  SET_PATH,
} from '../constants/ApiPaths';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

import {
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockAxiosInstance
} from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_BASE_URL = genMockBaseUrl();
const MOCK_FILE_TYPE = 'json';
const MOCK_ENTITY_KEY_UUID = genRandomUUID();
const MOCK_ENTITY_SET_UUID = genRandomUUID();
const MOCK_PROPERTY_TYPE_UUID = genRandomUUID();

const MOCK_ENTITIES = [
  {
    [`${genRandomUUID()}`]: ['value_1', 'value_2'],
    [`${genRandomUUID()}`]: ['value_3', 'value_4']
  }
];

jest.mock('../utils/axios');
AxiosUtils.getApiBaseUrl.mockImplementation(() => MOCK_BASE_URL);
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('DataApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  getEntitySetData();
  getEntitySetDataFileUrl();
  createOrMergeEntityData();
  deleteEntityFromEntitySet();
  replaceEntityInEntitySet();
  replaceEntityInEntitySetUsingFqns();
  getEntitySetSize();
  getEntity();
});

function getEntitySetData() {

  describe('getEntitySetData()', () => {

    const apiToTest = DataApi.getEntitySetData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      [MOCK_PROPERTY_TYPE_UUID],
      [MOCK_ENTITY_KEY_UUID]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
      INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED
    ];

    describe('should send a POST request with the correct params', () => {

      test('+propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          [MOCK_PROPERTY_TYPE_UUID],
          [MOCK_ENTITY_KEY_UUID]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${MOCK_ENTITY_SET_UUID}`,
          {
            ids: [MOCK_ENTITY_KEY_UUID],
            properties: [MOCK_PROPERTY_TYPE_UUID]
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          undefined,
          [MOCK_ENTITY_KEY_UUID]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { ids: [MOCK_ENTITY_KEY_UUID] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('+propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          [MOCK_PROPERTY_TYPE_UUID],
          undefined
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { properties: [MOCK_PROPERTY_TYPE_UUID] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${MOCK_ENTITY_SET_UUID}`,
          {}
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

    });

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
  });
}

function getEntitySetDataFileUrl() {

  describe('getEntitySetDataFileUrl()', () => {

    const apiToTest = DataApi.getEntitySetDataFileUrl;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_FILE_TYPE
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    test('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE)).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    test('should correctly set the fileType query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(apiToTest, validParams, invalidParams);

  });
}

function createOrMergeEntityData() {

  describe('createOrMergeEntityData()', () => {

    const apiToTest = DataApi.createOrMergeEntityData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_ENTITIES
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

  });
}

function deleteEntityFromEntitySet() {

  describe('deleteEntityFromEntitySet()', () => {

    const apiToTest = DataApi.deleteEntityFromEntitySet;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();

    const validParams = [mockEntitySetId, mockEntityKeyId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${ENTITY_DATA_PATH}/${mockEntitySetId}/${mockEntityKeyId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
  });
}

function replaceEntityInEntitySet() {

  describe('replaceEntityInEntitySet()', () => {

    const apiToTest = DataApi.replaceEntityInEntitySet;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomUUID()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'put');
  });
}

function replaceEntityInEntitySetUsingFqns() {

  describe('replaceEntityInEntitySetUsingFqns()', () => {

    const apiToTest = DataApi.replaceEntityInEntitySetUsingFqns;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomString()}.${genRandomString()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
  });
}

function getEntitySetSize() {

  describe('getEntitySetSize()', () => {

    const apiToTest = DataApi.getEntitySetSize;
    const mockEntitySetId = genRandomUUID();

    const validParams = [mockEntitySetId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${COUNT_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
  });
}

function getEntity() {

  describe('getEntity()', () => {

    const apiToTest = DataApi.getEntity;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();

    const validParams = [mockEntitySetId, mockEntityKeyId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${mockEntityKeyId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
  });
}
