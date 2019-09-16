/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as EntitySetsApi from './EntitySetsApi';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ENTITY_SET_DM } from '../utils/testing/MockDataModels';
import { genMockBaseUrl, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  ALL_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
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
    const axiosParams = [`/${ALL_PATH}/${MOCK_ENTITY_SET_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ENTITY_SETS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
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

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const fnToTest = EntitySetsApi.getEntitySet;

    const validParams = [MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${ALL_PATH}/${MOCK_ENTITY_SET_DM.id}`];

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
  });
}
