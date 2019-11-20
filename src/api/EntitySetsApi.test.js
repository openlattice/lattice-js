/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as EntitySetsApi from './EntitySetsApi';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ENTITY_SET } from '../utils/testing/MockData';
import { genMockBaseUrl, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  ALL_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
import {
  testApiShouldCatchRejectedPromise,
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

  testCreateEntitySets();
  testDeleteEntitySet();
  testGetAllEntitySets();
  testGetEntitySet();
  testGetEntitySetId();
  testGetEntitySetIds();
  testGetPropertyTypeMetaDataForEntitySet();
  testGetPropertyTypeMetaDataForEntitySets();
});

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const fnToTest = EntitySetsApi.createEntitySets;

    const validParams = [[MOCK_ENTITY_SET]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', [MOCK_ENTITY_SET]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testDeleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const fnToTest = EntitySetsApi.deleteEntitySet;

    const validParams = [MOCK_ENTITY_SET.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL_PATH}/${MOCK_ENTITY_SET.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const fnToTest = EntitySetsApi.getEntitySet;

    const validParams = [MOCK_ENTITY_SET.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL_PATH}/${MOCK_ENTITY_SET.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntitySetId() {

  describe('getEntitySetId()', () => {

    const fnToTest = EntitySetsApi.getEntitySetId;

    const validParams = [MOCK_ENTITY_SET.name];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${IDS_PATH}/${MOCK_ENTITY_SET.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetEntitySetIds() {

  describe('getEntitySetIds()', () => {

    const fnToTest = EntitySetsApi.getEntitySetIds;

    const validParams = [[MOCK_ENTITY_SET.name]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [
      `/${IDS_PATH}`,
      [MOCK_ENTITY_SET.name],
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetPropertyTypeMetaDataForEntitySet() {

  describe('getPropertyTypeMetaDataForEntitySet() - entitySetId', () => {

    const fnToTest = EntitySetsApi.getPropertyTypeMetaDataForEntitySet;

    const validParams = [genRandomUUID()];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL_PATH}/${validParams[0]}/${METADATA_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getPropertyTypeMetaDataForEntitySet() - entitySetId, propertyTypeId', () => {

    const fnToTest = EntitySetsApi.getPropertyTypeMetaDataForEntitySet;

    const validParams = [genRandomUUID(), genRandomUUID()];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_SS];
    const axiosParams = [`/${ALL_PATH}/${validParams[0]}/${PROPERTIES_PATH}/${validParams[1]}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetPropertyTypeMetaDataForEntitySets() {

  describe('getPropertyTypeMetaDataForEntitySets()', () => {

    const fnToTest = EntitySetsApi.getPropertyTypeMetaDataForEntitySets;

    const validParams = [[genRandomUUID(), genRandomUUID()]];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL_PATH}/${METADATA_PATH}`, validParams[0]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
