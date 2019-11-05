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

    const functionToTest = PermissionsApi.getAcl;

    const validParams = [MOCK_ACL_KEY];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = ['/', MOCK_ACL_KEY];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(functionToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(functionToTest, validParams);
  });

  describe('getAclExplanation()', () => {

    const functionToTest = PermissionsApi.getAclExplanation;

    const validParams = [MOCK_ACL_KEY];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${EXPLAIN_PATH}`, MOCK_ACL_KEY];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(functionToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(functionToTest, validParams);
  });

  describe('updateAcl()', () => {

    const functionToTest = PermissionsApi.updateAcl;

    const validParams = [MOCK_ACL_DATA];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_ACL_DATA];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(functionToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(functionToTest, validParams);
  });

  describe('updateAcls()', () => {

    const functionToTest = PermissionsApi.updateAcls;

    const validParams = [[MOCK_ACL_DATA]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}`, [MOCK_ACL_DATA]];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(functionToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(functionToTest, validParams);
  });

});
