/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as PermissionsApi from './PermissionsApi';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { EXPLAIN_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ACL_KEY, MOCK_ACL_DATA } from '../utils/testing/MockDataModels';
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

describe('PermissionsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAcl()', () => {

    const fnToTest = PermissionsApi.getAcl;

    const validParams = [MOCK_ACL_KEY];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = ['/', MOCK_ACL_KEY];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAclExplanation()', () => {

    const fnToTest = PermissionsApi.getAclExplanation;

    const validParams = [MOCK_ACL_KEY];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${EXPLAIN_PATH}`, MOCK_ACL_KEY];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateAcl()', () => {

    const fnToTest = PermissionsApi.updateAcl;

    const validParams = [MOCK_ACL_DATA];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_ACL_DATA];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateAcls()', () => {

    const fnToTest = PermissionsApi.updateAcls;

    const validParams = [[MOCK_ACL_DATA]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}`, [MOCK_ACL_DATA]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
