/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as EntitySetsApi from './EntitySetsApi';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import { genMockBaseUrl, genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  ALL,
  IDS_PATH,
  METADATA_PATH
} from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';


import {
  MOCK_FQN,
  MOCK_ENTITY_SET_DM
} from '../utils/testing/MockDataModels';

import {
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
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

describe('EntitySetsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetEntitySet();
  testGetEntitySetId();
  testGetEntitySetIds();
  testGetAllEntitySets();
  testCreateEntitySets();
  testDeleteEntitySet();
  testUpdateEntitySetMetadata();
});

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const fnToTest = EntitySetsApi.getEntitySet;

    const validParams = [MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL}/${MOCK_ENTITY_SET_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetEntitySetId() {

  describe('getEntitySetId()', () => {

    const fnToTest = EntitySetsApi.getEntitySetId;

    const validParams = [MOCK_ENTITY_SET_DM.name];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${IDS_PATH}/${MOCK_ENTITY_SET_DM.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetEntitySetIds() {

  describe('getEntitySetIds()', () => {

    const fnToTest = EntitySetsApi.getEntitySetIds;

    const validParams = [[MOCK_ENTITY_SET_DM.name]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [
      `/${IDS_PATH}`,
      [MOCK_ENTITY_SET_DM.name],
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testGetAllEntitySets() {

  describe('getAllEntitySets()', () => {

    const fnToTest = EntitySetsApi.getAllEntitySets;

    const validParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const fnToTest = EntitySetsApi.createEntitySets;

    const validParams = [[MOCK_ENTITY_SET_DM]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', [MOCK_ENTITY_SET_DM]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const fnToTest = EntitySetsApi.deleteEntitySet;

    const validParams = [MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL}/${MOCK_ENTITY_SET_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdateEntitySetMetadata() {

  describe('updateEntitySetMetadata()', () => {

    const fnToTest = EntitySetsApi.updateEntitySetMetadata;

    const validParams = [MOCK_ENTITY_SET_DM.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${ALL}/${MOCK_ENTITY_SET_DM.id}/${METADATA_PATH}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}
