import * as AuthorizationApi from './AuthorizationApi';

import * as AxiosUtils from '../utils/axios';
import { AUTHORIZATION_API } from '../constants/ApiNames';
import { ACCESS_CHECK_MOCK } from '../models/AccessCheck';
import { INVALID_PARAMS_OPTIONAL_ARRAY } from '../utils/testing/InvalidParams';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';
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

  describe('checkAuthorizations()', () => {

    const fnToTest = AuthorizationApi.checkAuthorizations;

    const validParams = [[ACCESS_CHECK_MOCK]];
    const invalidParams = [INVALID_PARAMS_OPTIONAL_ARRAY];
    const axiosParams = ['/', [ACCESS_CHECK_MOCK]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, AUTHORIZATION_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
