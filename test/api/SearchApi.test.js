/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as SearchApi from '../../src/api/SearchApi';

import {
  SEARCH_API
} from '../../src/constants/ApiNames';

import {
  ADVANCED_PATH,
  FQN_PATH,
  ORGANIZATIONS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
  SEARCH_PROPERTY_TYPES_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

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
const MOCK_NAMESPACE = 'NAMESPACE';
const MOCK_NAME = 'NAME';
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

    function testSearchInvocation(searchOptions, expectedParameters) {

      const functionToTest :Function = SearchApi.searchEntitySetMetaData;

      const validParams :any[] = [
        searchOptions
      ];

      const invalidParams :any[] = [
        INVALID_PARAMS
      ];

      it('should send a POST request with the correct URL path and data', (done) => {

        SearchApi.searchEntitySetMetaData(...validParams)
          .then(() => {
            expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.post).toHaveBeenCalledWith(...expectedParameters);
            done();
          })
          .catch((e) => {
            done.fail(e);
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
      testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
      testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
      testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
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

    const functionToTest :Function = SearchApi.searchEntitySetData;

    const validParams :any[] = [
      MOCK_ENTITY_SET_UUID,
      {
        searchTerm: MOCK_SEARCH_TERM,
        start: MOCK_START,
        maxHits: MOCK_MAX_HITS
      }
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchEntitySetData(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAdvancedSearchEntitySetData() {

  // TODO: figure out how to test object parameters with optional properties

  describe('advancedSearchEntitySetData()', () => {

    const functionToTest :Function = SearchApi.advancedSearchEntitySetData;

    // TODO: searchFields needs to be List<SearchDetails>
    const validParams :any[] = [
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

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.advancedSearchEntitySetData(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ADVANCED_PATH}/${MOCK_ENTITY_SET_UUID}`,
            {
              searchFields: [
                { [MOCK_PROPERTY_TYPE_UUIDS[0]]: MOCK_SEARCH_TERM },
                { [MOCK_PROPERTY_TYPE_UUIDS[1]]: MOCK_SEARCH_TERM }
              ],
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchOrganizations() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchOrganizations()', () => {

    const functionToTest :Function = SearchApi.searchOrganizations;

    const validParams :any[] = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchOrganizations(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchEntityTypes() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchEntityTypes()', () => {

    const functionToTest :Function = SearchApi.searchEntityTypes;

    const validParams :any[] = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchEntityTypes(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SEARCH_ENTITY_TYPES_PATH}`,
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchEntityTypesByFQN() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchEntityTypesByFQN()', () => {

    const functionToTest :Function = SearchApi.searchEntityTypesByFQN;

    const validParams :any[] = [{
      namespace: MOCK_NAMESPACE,
      name: MOCK_NAME,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchEntityTypesByFQN(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SEARCH_ENTITY_TYPES_PATH}/${FQN_PATH}`,
            {
              namespace: MOCK_NAMESPACE,
              name: MOCK_NAME,
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchPropertyTypes() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchPropertyTypes()', () => {

    const functionToTest :Function = SearchApi.searchPropertyTypes;

    const validParams :any[] = [{
      searchTerm: MOCK_SEARCH_TERM,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchPropertyTypes(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SEARCH_PROPERTY_TYPES_PATH}`,
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchPropertyTypesByFQN() {

  // TODO: figure out how to test object parameters with optional properties

  describe('searchPropertyTypesByFQN()', () => {

    const functionToTest :Function = SearchApi.searchPropertyTypesByFQN;

    const validParams :any[] = [{
      namespace: MOCK_NAMESPACE,
      name: MOCK_NAME,
      start: MOCK_START,
      maxHits: MOCK_MAX_HITS
    }];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      SearchApi.searchPropertyTypesByFQN(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SEARCH_PROPERTY_TYPES_PATH}/${FQN_PATH}`,
            {
              namespace: MOCK_NAMESPACE,
              name: MOCK_NAME,
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, SEARCH_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
