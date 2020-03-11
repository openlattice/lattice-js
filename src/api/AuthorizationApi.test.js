/* eslint-disable no-use-before-define */

import * as AuthorizationApi from './AuthorizationApi';

import * as AxiosUtils from '../utils/axios';
import { AUTHORIZATION_API } from '../constants/ApiNames';
import { PermissionTypes, SecurableTypes } from '../constants/types';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL_ARRAY,
  INVALID_PARAMS_OPTIONAL_STRING,
} from '../utils/testing/InvalidParams';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';
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

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('AuthorizationApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testCheckAuthorizations();
  testGetAccessibleObjects();
});

function testCheckAuthorizations() {

  describe('checkAuthorizations()', () => {

    const fnToTest = AuthorizationApi.checkAuthorizations;
    const mockQueries = [{
      aclKey: [genRandomUUID()],
      permissions: [PermissionTypes.READ]
    }];

    const validParams = [mockQueries];
    const invalidParams = [INVALID_PARAMS_OPTIONAL_ARRAY];
    const axiosParams = ['/', mockQueries];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, AUTHORIZATION_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAccessibleObjects() {

  describe('getAccessibleObjects()', () => {

    const fnToTest = AuthorizationApi.getAccessibleObjects;
    const mockPagingToken = genRandomString();

    const validParams = [
      SecurableTypes.EntityType,
      PermissionTypes.READ,
      mockPagingToken
    ];

    const invalidParams = [
      INVALID_PARAMS,
      INVALID_PARAMS,
      INVALID_PARAMS_OPTIONAL_STRING,
    ];

    const axiosParams = [
      `/?objectType=${SecurableTypes.EntityType}&permission=${PermissionTypes.READ}&pagingToken=${mockPagingToken}`
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, AUTHORIZATION_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
