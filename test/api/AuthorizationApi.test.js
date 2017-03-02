/* eslint-disable no-use-before-define */

import PermissionTypes from '../../src/constants/types/PermissionTypes';
import SecurableTypes from '../../src/constants/types/SecurableTypes';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as AuthorizationApi from '../../src/api/AuthorizationApi';

import {
  AUTHORIZATION_API
} from '../../src/constants/ApiNames';

import {
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED,
  INVALID_PARAMS_ENUM_VALUES,
  INVALID_PARAMS_NOT_DEFINED_ALLOWED
} from '../constants/TestConstants';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnGivenInvalidParameters
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

    const functionInvocation = [
      AuthorizationApi.checkAuthorizations, MOCK_QUERIES
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      AuthorizationApi.checkAuthorizations(MOCK_QUERIES)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith('/', MOCK_QUERIES);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(AUTHORIZATION_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    // testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    // testApiFunctionShouldRejectOnGivenInvalidParameters(
    //   [INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED],
    //   ...functionInvocation
    // );

  });
}

function testGetAccessibleObjects() {

  describe('getAccessibleObjects()', () => {

    const invocationParams = [
      SecurableTypes.EntityType, PermissionTypes.READ, MOCK_PAGING_TOKEN
    ];

    const functionInvocation = [
      AuthorizationApi.getAccessibleObjects, ...invocationParams
    ];

    it('should send a GET request with the correct URL path', (done) => {

      AuthorizationApi.getAccessibleObjects(...invocationParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            // eslint-disable-next-line
            `/?objectType=${SecurableTypes.EntityType}&permission=${PermissionTypes.READ}&pagingToken=${MOCK_PAGING_TOKEN}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(AUTHORIZATION_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    // testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    // testApiFunctionShouldRejectOnGivenInvalidParameters(
    //   [INVALID_PARAMS_ENUM_VALUES, INVALID_PARAMS_ENUM_VALUES, INVALID_PARAMS_NOT_DEFINED_ALLOWED],
    //   ...functionInvocation
    // );

  });
}
