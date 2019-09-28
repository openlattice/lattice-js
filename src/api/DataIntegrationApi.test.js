/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataIntegrationApi from './DataIntegrationApi';
import { DATA_INTEGRATION_API } from '../constants/ApiNames';
import { ENTITY_KEY_IDS_PATH } from '../constants/UrlConstants';

import {
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockAxiosInstance
} from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldReturnPromise,
  testApiShouldUseCorrectAxiosInstance
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

    const apiToTest = DataIntegrationApi.createEntityAndAssociationData;

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

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

    });

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_INTEGRATION_API);
  });
}

function getEntityKeyIds() {
  describe('getEntityKeyIds()', () => {

    const apiToTest = DataIntegrationApi.getEntityKeyIds;

    const validParams = MOCK_ENTITY_KEYS;

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_INTEGRATION_API);
  });
}
