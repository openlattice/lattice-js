/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataApi from './DataApi';
import { DATA_API } from '../constants/ApiNames';
import { ENTITY_DATA_PATH, TICKET_PATH } from '../constants/ApiPaths';
import { genMockBaseUrl, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldSendCorrectDeleteRequest,
  testApiShouldSendCorrectPatchRequest,
  testApiShouldSendCorrectPostRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_BASE_URL = genMockBaseUrl();
const MOCK_FILE_TYPE = 'json';
const MOCK_ENTITY_SET_UUID = genRandomUUID();
const MOCK_PROPERTY_TYPE_UUID = genRandomUUID();
const MOCK_SYNC_UUID = genRandomUUID();
const MOCK_TICKET_UUID = genRandomUUID();

const MOCK_ENTITIES = {
  entityId_1: [
    {
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }
  ]
};

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

  testGetEntitySetData();
  testGetEntitySetDataFileUrl();
  testCreateEntityData();
  testStoreEntityData();
  testAcquireSyncTicket();
  testReleaseSyncTicket();
});

function testGetEntitySetData() {

  describe('getEntitySetData()', () => {

    const apiToTest = DataApi.getEntitySetData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_SYNC_UUID,
      [MOCK_PROPERTY_TYPE_UUID]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED,
      INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED
    ];

    describe('should send a POST request with the correct params', () => {

      test('+syncId, +propertyTypeIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          [MOCK_PROPERTY_TYPE_UUID]
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          {
            syncId: MOCK_SYNC_UUID,
            properties: [MOCK_PROPERTY_TYPE_UUID]
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('+syncId, -propertyTypeIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          undefined
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { syncId: MOCK_SYNC_UUID }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-syncId, +propertyTypeIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          undefined,
          [MOCK_PROPERTY_TYPE_UUID]
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { properties: [MOCK_PROPERTY_TYPE_UUID] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-syncId, -propertyTypeIds', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
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

function testGetEntitySetDataFileUrl() {

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
        `${MOCK_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    test('should correctly set the fileType query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${MOCK_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(apiToTest, validParams, invalidParams);

  });
}

function testCreateEntityData() {

  describe('createEntityData()', () => {

    const apiToTest = DataApi.createEntityData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_SYNC_UUID,
      MOCK_ENTITIES
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED,
      INVALID_PARAMS
    ];

    describe('should send a PUT request with the correct URL path and data when syncId is given', () => {

      test('+syncId', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          MOCK_ENTITIES
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}/${MOCK_SYNC_UUID}`,
          MOCK_ENTITIES
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });

      test('-syncId', () => {

        const apiInvocationParams = [
          MOCK_ENTITY_SET_UUID,
          undefined,
          MOCK_ENTITIES
        ];

        const expectedAxiosParams = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          MOCK_ENTITIES
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });

    });

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

  });
}

function testStoreEntityData() {

  describe('storeEntityData()', () => {

    const apiToTest = DataApi.storeEntityData;

    const validParams = [
      MOCK_TICKET_UUID,
      MOCK_SYNC_UUID,
      MOCK_ENTITIES
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${ENTITY_DATA_PATH}/${TICKET_PATH}/${MOCK_TICKET_UUID}/${MOCK_SYNC_UUID}`,
      MOCK_ENTITIES
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectPatchRequest(apiToTest, validParams, axiosParams);
  });
}

function testAcquireSyncTicket() {

  describe('acquireSyncTicket()', () => {

    const apiToTest = DataApi.acquireSyncTicket;

    const validParams = [MOCK_ENTITY_SET_UUID, MOCK_SYNC_UUID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${TICKET_PATH}/${MOCK_ENTITY_SET_UUID}/${MOCK_SYNC_UUID}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(apiToTest, validParams, axiosParams);
  });
}

function testReleaseSyncTicket() {

  describe('releaseSyncTicket()', () => {

    const apiToTest = DataApi.releaseSyncTicket;

    const validParams = [MOCK_TICKET_UUID];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TICKET_PATH}/${MOCK_TICKET_UUID}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(apiToTest, validParams, axiosParams);
  });
}
