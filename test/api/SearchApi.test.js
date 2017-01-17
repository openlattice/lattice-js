/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as SearchApi from '../../src/api/SearchApi';

import {
  SEARCH_API
} from '../../src/constants/ApiNames';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_KEYWORD = 'test';
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

  testSearch();
});

function testSearch() {

  describe('search()', () => {

    function testSearchInvocation(searchOptions, expectedParameters) {

      const functionInvocation = [
        SearchApi.search, searchOptions
      ];

      it('should send a POST request with the correct URL path and data', (done) => {

        SearchApi.search(searchOptions)
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
        keyword: MOCK_KEYWORD
      };

      const expectedParameters = [
        '/',
        [],
        {
          params: {
            kw: MOCK_KEYWORD
          }
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by keyword and EntityType UUID', () => {

      const searchOptions = {
        keyword: MOCK_KEYWORD,
        entityTypeId: MOCK_ENTITY_TYPE_UUID
      };

      const expectedParameters = [
        '/',
        [],
        {
          params: {
            kw: MOCK_KEYWORD,
            eid: MOCK_ENTITY_TYPE_UUID
          }
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by keyword and PropertyType UUIDs', () => {

      const searchOptions = {
        keyword: MOCK_KEYWORD,
        propertyTypeIds: MOCK_PROPERTY_TYPE_UUIDS
      };

      const expectedParameters = [
        '/',
        MOCK_PROPERTY_TYPE_UUIDS,
        {
          params: {
            kw: MOCK_KEYWORD
          }
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by EntityType UUID', () => {

      const searchOptions = {
        entityTypeId: MOCK_ENTITY_TYPE_UUID
      };

      const expectedParameters = [
        '/',
        [],
        {
          params: {
            eid: MOCK_ENTITY_TYPE_UUID
          }
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

    describe('search by PropertyType UUIDs', () => {

      const searchOptions = {
        propertyTypeIds: MOCK_PROPERTY_TYPE_UUIDS
      };

      const expectedParameters = [
        '/',
        MOCK_PROPERTY_TYPE_UUIDS,
        {
          params: {}
        }
      ];

      testSearchInvocation(searchOptions, expectedParameters);
    });

  });
}
