/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataIntegrationApi from './DataIntegrationApi';
import { DATA_INTEGRATION_API } from '../constants/ApiNames';
import { ENTITY_KEY_IDS_PATH } from '../constants/UrlConstants';
import { INVALID_PARAMS } from '../utils/testing/Invalid';

import {
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockAxiosInstance
} from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldCatchRejectedPromise,
  testApiShouldReturnPromise,
  testApiShouldUseCorrectAxiosInstance,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldSendCorrectHttpRequest
} from '../utils/testing/TestUtils';

const MOCK_ENTITIES = [
  {
    key: {
      entitySetId: genRandomUUID(),
      entityId: genRandomString()
    },
    details: {
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }
  },
  {
    key: {
      entitySetId: genRandomUUID(),
      entityId: genRandomString()
    },
    details: {
      [`${genRandomUUID()}`]: ['value_5', 'value_6'],
      [`${genRandomUUID()}`]: ['value_7', 'value_8']
    }
  }
];

const MOCK_ASSOCIATIATIONS = [
  {
    key: {
      entitySetId: genRandomUUID(),
      entityId: genRandomString()
    },
    src: {
      entitySetId: genRandomUUID(),
      entityId: genRandomString()
    },
    dst: {
      entitySetId: genRandomUUID(),
      entityId: genRandomString()
    },
    details: {
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }
  }
];

const MOCK_ENTITY_KEYS = [
  { entitySetId: genRandomUUID(), entityId: genRandomString() },
  { entitySetId: genRandomUUID(), entityId: genRandomString() },
  { entitySetId: genRandomUUID(), entityId: genRandomString() },
  { entitySetId: genRandomUUID(), entityId: genRandomString() }
];

const MOCK_BASE_URL = genMockBaseUrl();

jest.mock('../utils/axios');
AxiosUtils.getApiBaseUrl.mockImplementation(() => MOCK_BASE_URL);
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('DataIntegrationApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  createEntityAndAssociationData();
  getEntityKeyIds();
});

// TODO: write unit tests for createEntityAndAssociationData()
function createEntityAndAssociationData() {

  describe('createEntityAndAssociationData()', () => {

    const fnToTest = DataIntegrationApi.createEntityAndAssociationData;

    const validParams = [
      {
        entities: MOCK_ENTITIES,
        associations: MOCK_ASSOCIATIATIONS
      }
    ];

    describe('should send a POST request with the correct params', () => {

      test('+entities, +associations', () => {

        const apiInvocationParams = [
          {
            entities: MOCK_ENTITIES,
            associations: MOCK_ASSOCIATIATIONS
          }
        ];

        const expectedAxiosParams = [
          '/',
          {
            entities: MOCK_ENTITIES,
            associations: MOCK_ASSOCIATIATIONS
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

    });

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_INTEGRATION_API);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function getEntityKeyIds() {

  describe('getEntityKeyIds()', () => {

    const fnToTest = DataIntegrationApi.getEntityKeyIds;
    const validParams = [MOCK_ENTITY_KEYS];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ENTITY_KEY_IDS_PATH}`, MOCK_ENTITY_KEYS];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_INTEGRATION_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
