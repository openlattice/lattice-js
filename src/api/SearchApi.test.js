/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as SearchApi from './SearchApi';
import { SEARCH_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  ADVANCED_PATH,
  FQN_PATH,
  ORGANIZATIONS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
  SEARCH_PROPERTY_TYPES_PATH
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

const MOCK_START = 20;
const MOCK_MAX_HITS = 100;
const MOCK_NAME = 'NAME';
const MOCK_NAMESPACE = 'NAMESPACE';
const MOCK_SEARCH_TERM = genRandomString();
const MOCK_ENTITY_SET_UUID = genRandomUUID();
const MOCK_ENTITY_TYPE_UUID = genRandomUUID();
const MOCK_PROPERTY_TYPE_UUIDS = [genRandomUUID(), genRandomUUID()];

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('SearchApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testSearchEntitySetMetaData();
  testSearchEntitySetData();
  testAdvancedSearchEntitySetData();
  testSearchOrganizations();
  testSearchEntityTypes();
  testSearchEntityTypesByFQN();
  testSearchPropertyTypes();
  testSearchPropertyTypesByFQN();
});

function testSearchEntitySetMetaData() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchEntitySetMetaData()', () => {

    function testSearchInvocation(searchOptions, axiosParams) {

      const fnToTest = SearchApi.searchEntitySetMetaData;

      const validParams = [searchOptions];
      const invalidParams = [INVALID_PARAMS];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    }

    describe('search by keyword', () => {

      const searchOptions = {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          kw: MOCK_SEARCH_TERM,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by keyword and EntityType UUID', () => {

      const searchOptions = {
        searchTerm: MOCK_SEARCH_TERM,
        entityTypeId: MOCK_ENTITY_TYPE_UUID,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          kw: MOCK_SEARCH_TERM,
          entityTypeId: MOCK_ENTITY_TYPE_UUID,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by keyword and PropertyType UUIDs', () => {

      const searchOptions = {
        searchTerm: MOCK_SEARCH_TERM,
        propertyTypeIds: MOCK_PROPERTY_TYPE_UUIDS,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          kw: MOCK_SEARCH_TERM,
          pid: MOCK_PROPERTY_TYPE_UUIDS,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by EntityType UUID', () => {

      const searchOptions = {
        entityTypeId: MOCK_ENTITY_TYPE_UUID,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          entityTypeId: MOCK_ENTITY_TYPE_UUID,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by PropertyType UUIDs', () => {

      const searchOptions = {
        propertyTypeIds: MOCK_PROPERTY_TYPE_UUIDS,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          pid: MOCK_PROPERTY_TYPE_UUIDS,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

  });
}

function testSearchEntitySetData() {

  describe('searchEntitySetData()', () => {

    const fnToTest = SearchApi.searchEntitySetData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${MOCK_ENTITY_SET_UUID}`,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testAdvancedSearchEntitySetData() {

  // TODO: figure out how to test object parameters with optional properties

  describe('advancedSearchEntitySetData()', () => {

    const fnToTest = SearchApi.advancedSearchEntitySetData;

    // TODO: searchFields needs to be List<SearchDetails>
    const validParams = [
      MOCK_ENTITY_SET_UUID,
      {
        searchFields: [
          { [MOCK_PROPERTY_TYPE_UUIDS[0]]: MOCK_SEARCH_TERM },
          { [MOCK_PROPERTY_TYPE_UUIDS[1]]: MOCK_SEARCH_TERM }
        ],
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${ADVANCED_PATH}/${MOCK_ENTITY_SET_UUID}`,
      {
        searchFields: [
          { [MOCK_PROPERTY_TYPE_UUIDS[0]]: MOCK_SEARCH_TERM },
          { [MOCK_PROPERTY_TYPE_UUIDS[1]]: MOCK_SEARCH_TERM }
        ],
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSearchOrganizations() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchOrganizations()', () => {

    const fnToTest = SearchApi.searchOrganizations;

    const validParams = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams = [
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${ORGANIZATIONS_PATH}`,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSearchEntityTypes() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchEntityTypes()', () => {

    const fnToTest = SearchApi.searchEntityTypes;

    const validParams = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams = [
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${SEARCH_ENTITY_TYPES_PATH}`,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSearchEntityTypesByFQN() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchEntityTypesByFQN()', () => {

    const fnToTest = SearchApi.searchEntityTypesByFQN;

    const validParams = [{
      namespace: MOCK_NAMESPACE,
      name: MOCK_NAME,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams = [
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${SEARCH_ENTITY_TYPES_PATH}/${FQN_PATH}`,
      {
        namespace: MOCK_NAMESPACE,
        name: MOCK_NAME,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSearchPropertyTypes() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchPropertyTypes()', () => {

    const fnToTest = SearchApi.searchPropertyTypes;

    const validParams = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams = [
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${SEARCH_PROPERTY_TYPES_PATH}`,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSearchPropertyTypesByFQN() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchPropertyTypesByFQN()', () => {

    const fnToTest = SearchApi.searchPropertyTypesByFQN;

    const validParams = [{
      namespace: MOCK_NAMESPACE,
      name: MOCK_NAME,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams = [
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${SEARCH_PROPERTY_TYPES_PATH}/${FQN_PATH}`,
      {
        namespace: MOCK_NAMESPACE,
        name: MOCK_NAME,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}
