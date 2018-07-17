/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataApi from './DataApi';
import { DATA_API } from '../constants/ApiNames';
import { COUNT_PATH, SET_PATH } from '../constants/ApiPaths';
import { PARTIAL } from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_BOOLEANS_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED
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

  clearEntitySet();
  clearEntityFromEntitySet();
  createOrMergeEntityData();
  getEntity();
  getEntitySetData();
  getEntitySetDataFileUrl();
  getEntitySetSize();
  replaceEntityData();
  replaceEntityInEntitySet();
  replaceEntityInEntitySetUsingFqns();
});

function clearEntityFromEntitySet() {

  describe('clearEntityFromEntitySet()', () => {

    const apiToTest = DataApi.clearEntityFromEntitySet;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();

    const validParams = [mockEntitySetId, mockEntityKeyId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
  });
}

function clearEntitySet() {

  describe('clearEntitySet()', () => {

    const apiToTest = DataApi.clearEntitySet;
    const mockEntitySetId = genRandomUUID();

    const validParams = [mockEntitySetId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
  });
}

function createOrMergeEntityData() {

  describe('createOrMergeEntityData()', () => {

    const apiToTest = DataApi.createOrMergeEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = [{
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }];

    const validParams = [mockEntitySetId, mockEntityData];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

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

function getEntitySetData() {

  describe('getEntitySetData()', () => {

    const apiToTest = DataApi.getEntitySetData;
    const mockEntityKeyId = genRandomUUID();
    const mockEntitySetId = genRandomUUID();
    const mockPropertyTypeId = genRandomUUID();

    const validParams = [
      mockEntitySetId,
      [mockPropertyTypeId],
      [mockEntityKeyId]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
      INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED
    ];

    describe('should send a POST request with the correct params', () => {

      test('+propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          {
            ids: [mockEntityKeyId],
            properties: [mockPropertyTypeId]
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          undefined,
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { ids: [mockEntityKeyId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('+propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          undefined
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { properties: [mockPropertyTypeId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
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
    const mockEntitySetId = genRandomUUID();

    const validParams = [
      mockEntitySetId,
      MOCK_FILE_TYPE
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    test('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE)).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    test('should correctly set the "fileType" query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(apiToTest, validParams, invalidParams);

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

function replaceEntityData() {

  describe('replaceEntityData()', () => {

    const apiToTest = DataApi.replaceEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = {
      [`${genRandomUUID()}`]: {
        [`${genRandomUUID()}`]: ['value_1', 'value_2'],
        [`${genRandomUUID()}`]: ['value_3', 'value_4']
      }
    };

    // TODO: generate invalid params for the "entities" param

    const validParams = [mockEntitySetId, mockEntityData, false];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS, []];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

    // TODO: add tests to validate "partial" query param is being set correctly for invalid values
    describe('should send a PUT request with the correct params', () => {

      test('partial=true', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, true];
        const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}?${PARTIAL}=true`, mockEntityData];
        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });

      test('partial=false', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, false];
        const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}?${PARTIAL}=false`, mockEntityData];
        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });
    });
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
