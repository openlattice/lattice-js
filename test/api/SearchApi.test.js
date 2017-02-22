/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as SearchApi from '../../src/api/SearchApi';

import {
  SEARCH_API
} from '../../src/constants/ApiNames';

import {
  ORGANIZATIONS_PATH,
  POPULAR_PATH
} from '../../src/constants/ApiPaths';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_START = 20;
const MOCK_MAX_HITS = 100;
const MOCK_SEARCH_TERM = 'test';
const MOCK_ENTITY_SET_UUID = '27ae8ba3-1f7f-42d4-a04a-2c44d1cbf3aa';
const MOCK_ENTITY_TYPE_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_PROPERTY_TYPE_UUIDS = [
  '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  '4b08e1f9-4a00-4169-92ea-10e377070220'
];

let mockAxiosInstance = null;

describe('SearchApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testSearchEntitySetMetaData();
  testSearchEntitySetData();
  testSearchOrganizations();
  testGetPopularEntitySets();
});

function testSearchEntitySetMetaData() {

  describe('searchEntitySetMetaData()', () => {

    function testSearchInvocation(searchOptions, expectedParameters) {

      const functionInvocation = [
        SearchApi.searchEntitySetMetaData, searchOptions
      ];

      it('should send a POST request with the correct URL path and data', (done) => {

        SearchApi.searchEntitySetMetaData(searchOptions)
          .then(() => {
            expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.post).toHaveBeenCalledWith(...expectedParameters);
            done();
          })
          .catch((e) => {
            done.fail(e);
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(SEARCH_API, ...functionInvocation);
      testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
      testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
      testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
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
          eid: MOCK_ENTITY_TYPE_UUID,
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
          eid: MOCK_ENTITY_TYPE_UUID,
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

    const searchOptions = {
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    };

    const functionInvocation = [
      SearchApi.searchEntitySetData, MOCK_ENTITY_SET_UUID, searchOptions
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchEntitySetData(MOCK_ENTITY_SET_UUID, searchOptions)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ENTITY_SET_UUID}`,
            {
              searchTerm: MOCK_SEARCH_TERM,
              start: MOCK_START,
              maxHits: MOCK_MAX_HITS
            }
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(SEARCH_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
  });
}

function testSearchOrganizations() {

  describe('searchOrganizations()', () => {

    const searchOptions = {
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    };

    const functionInvocation = [
      SearchApi.searchOrganizations, searchOptions
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchOrganizations(searchOptions)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ORGANIZATIONS_PATH}`,
            {
              searchTerm: MOCK_SEARCH_TERM,
              start: MOCK_START,
              maxHits: MOCK_MAX_HITS
            }
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(SEARCH_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
  });
}

function testGetPopularEntitySets() {

  describe('getPopularEntitySets()', () => {

    const functionInvocation = [
      SearchApi.getPopularEntitySets
    ];

    it('should send a GET request with the correct URL path', (done) => {

      SearchApi.getPopularEntitySets()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/${POPULAR_PATH}`);
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(SEARCH_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}
