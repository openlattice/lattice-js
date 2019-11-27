/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as SearchApi from './SearchApi';
import { SEARCH_API } from '../constants/ApiNames';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  ADVANCED_PATH,
  FQN_PATH,
  IDS_PATH,
  NEIGHBORS_PATH,
  ORGANIZATIONS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
  SEARCH_PROPERTY_TYPES_PATH,
} from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance,
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_START = 20;
const MOCK_MAX_HITS = 100;
const MOCK_NAME = 'NAME';
const MOCK_NAMESPACE = 'NAMESPACE';
const MOCK_SEARCH_TERM = genRandomString();
const MOCK_ENTITY_KEY_ID = genRandomUUID();
const MOCK_ENTITY_SET_ID = genRandomUUID();
const MOCK_ENTITY_TYPE_ID = genRandomUUID();
const MOCK_PROPERTY_TYPE_IDS = [genRandomUUID(), genRandomUUID()];

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

  searchEntityNeighbors();
  searchEntityNeighborsWithFilter();
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
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
        entityTypeId: MOCK_ENTITY_TYPE_ID,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          kw: MOCK_SEARCH_TERM,
          entityTypeId: MOCK_ENTITY_TYPE_ID,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by keyword and PropertyType UUIDs', () => {

      const searchOptions = {
        searchTerm: MOCK_SEARCH_TERM,
        propertyTypeIds: MOCK_PROPERTY_TYPE_IDS,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          kw: MOCK_SEARCH_TERM,
          pid: MOCK_PROPERTY_TYPE_IDS,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by EntityType UUID', () => {

      const searchOptions = {
        entityTypeId: MOCK_ENTITY_TYPE_ID,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          entityTypeId: MOCK_ENTITY_TYPE_ID,
          start: MOCK_START,
          maxHits: MOCK_MAX_HITS
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by PropertyType UUIDs', () => {

      const searchOptions = {
        propertyTypeIds: MOCK_PROPERTY_TYPE_IDS,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      };

      const expectedParameters = [
        '/',
        {
          pid: MOCK_PROPERTY_TYPE_IDS,
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
      MOCK_ENTITY_SET_ID,
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
      `/${MOCK_ENTITY_SET_ID}`,
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testAdvancedSearchEntitySetData() {

  // TODO: figure out how to test object parameters with optional properties

  describe('advancedSearchEntitySetData()', () => {

    const fnToTest = SearchApi.advancedSearchEntitySetData;

    // TODO: searchFields needs to be List<SearchDetails>
    const validParams = [
      MOCK_ENTITY_SET_ID,
      {
        searchFields: [
          { [MOCK_PROPERTY_TYPE_IDS[0]]: MOCK_SEARCH_TERM },
          { [MOCK_PROPERTY_TYPE_IDS[1]]: MOCK_SEARCH_TERM }
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
      `/${ADVANCED_PATH}/${MOCK_ENTITY_SET_ID}`,
      {
        searchFields: [
          { [MOCK_PROPERTY_TYPE_IDS[0]]: MOCK_SEARCH_TERM },
          { [MOCK_PROPERTY_TYPE_IDS[1]]: MOCK_SEARCH_TERM }
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function searchEntityNeighbors() {

  describe('searchEntityNeighbors', () => {

    const fnToTest = SearchApi.searchEntityNeighbors;
    const validParams = [MOCK_ENTITY_SET_ID, MOCK_ENTITY_KEY_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ENTITY_SET_ID}/${MOCK_ENTITY_KEY_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function searchEntityNeighborsWithFilter() {

  // TODO: test deduplicating arrays into sets

  describe('searchEntityNeighborsWithFilter', () => {
    describe('default', () => {
      const fnToTest = SearchApi.searchEntityNeighborsWithFilter;
      const validParams = [MOCK_ENTITY_SET_ID, { entityKeyIds: [MOCK_ENTITY_KEY_ID] }];
      const invalidParams = [
        INVALID_PARAMS_SS,
        {
          destinationEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
          edgeEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
          entityKeyIds: INVALID_PARAMS_SS,
          sourceEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
        },
      ];
      const axiosParams = [
        `/${MOCK_ENTITY_SET_ID}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`,
        { entityKeyIds: [MOCK_ENTITY_KEY_ID] },
      ];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

    describe('idsOnly = true', () => {
      const fnToTest = SearchApi.searchEntityNeighborsWithFilter;
      const validParams = [MOCK_ENTITY_SET_ID, { entityKeyIds: [MOCK_ENTITY_KEY_ID] }, true];
      const invalidParams = [
        INVALID_PARAMS_SS,
        {
          destinationEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
          edgeEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
          entityKeyIds: INVALID_PARAMS_SS,
          sourceEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
        },
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN
      ];
      const axiosParams = [
        `/${MOCK_ENTITY_SET_ID}/${NEIGHBORS_PATH}/${ADVANCED_PATH}/${IDS_PATH}`,
        { entityKeyIds: [MOCK_ENTITY_KEY_ID] },
      ];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, SEARCH_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

  });
}
