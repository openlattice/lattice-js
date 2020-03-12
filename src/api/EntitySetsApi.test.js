/* eslint-disable no-use-before-define */

import * as EntitySetsApi from './EntitySetsApi';

import * as AxiosUtils from '../utils/axios';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
import { ENTITY_SET_MOCK } from '../models/EntitySet';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL_SPECIAL_STRING,
  INVALID_PARAMS_REQUIRED_STRING,
} from '../utils/testing/InvalidParams';
import { genMockBaseUrl, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';
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

    const validParams = [[ENTITY_SET_MOCK]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', [ENTITY_SET_MOCK]];

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

    const validParams = [ENTITY_SET_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}`];

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

    const validParams = [ENTITY_SET_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}`];

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

    const validParams = [ENTITY_SET_MOCK.name];
    const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${IDS_PATH}/${ENTITY_SET_MOCK.name}`];

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

    const validParams = [[ENTITY_SET_MOCK.name]];
    const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [
      `/${IDS_PATH}`,
      [ENTITY_SET_MOCK.name],
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
    const invalidParams = [INVALID_PARAMS];
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
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_SPECIAL_STRING];
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
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ALL_PATH}/${METADATA_PATH}`, validParams[0]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
