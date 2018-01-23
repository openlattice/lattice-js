/* eslint-disable no-use-before-define */

import PermissionTypes from '../../src/constants/types/PermissionTypes';
import SecurableTypes from '../../src/constants/types/SecurableTypes';

import * as AxiosUtils from '../../src/utils/axios';
import * as AuthorizationApi from '../../src/api/AuthorizationApi';

import {
  AUTHORIZATION_API
} from '../../src/constants/ApiNames';

import {
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  getMockAxiosInstance
} from '../utils/MockUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const MOCK_QUERIES = [
  {
    aclKey: ['4b08e1f9-4a00-4169-92ea-10e377070220'],
    permissions: ['READ']
  }
];

const MOCK_PAGING_TOKEN = 'mockPagingToken';

let mockAxiosInstance = null;

describe('AuthorizationApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testCheckAuthorizations();
  testGetAccessibleObjects();
});

function testCheckAuthorizations() {

  describe('checkAuthorizations()', () => {

    const functionToTest = AuthorizationApi.checkAuthorizations;

    const validParams = [
      MOCK_QUERIES
    ];

    const invalidParams = [
      INVALID_PARAMS_EMPTY_ARRAY_ALLOWED
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      AuthorizationApi.checkAuthorizations(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith('/', MOCK_QUERIES);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, AUTHORIZATION_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAccessibleObjects() {

  describe('getAccessibleObjects()', () => {

    const functionToTest = AuthorizationApi.getAccessibleObjects;

    const validParams = [
      SecurableTypes.EntityType,
      PermissionTypes.READ,
      MOCK_PAGING_TOKEN
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS_EMPTY_STRING_ALLOWED
    ];

    it('should send a GET request with the correct URL path', (done) => {

      AuthorizationApi.getAccessibleObjects(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            // eslint-disable-next-line
            `/?objectType=${SecurableTypes.EntityType}&permission=${PermissionTypes.READ}&pagingToken=${MOCK_PAGING_TOKEN}`
          );
          /* eslint-enable */
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, AUTHORIZATION_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
