/* eslint-disable no-use-before-define */

import * as PermissionsApi from './PermissionsApi';

import * as AxiosUtils from '../utils/axios';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { EXPLAIN_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { ACL_DATA_MOCK } from '../models/AclData';
import { INVALID_PARAMS } from '../utils/testing/InvalidParams';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance,
} from '../utils/testing/TestUtils';

const MOCK_ACL_KEY = [
  'c7586209-552a-4dbd-b826-c6c262070291',
  'a0f46850-6115-4223-aa8b-abc269a7d375',
];

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
    const invalidParams = [INVALID_PARAMS];
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
    const invalidParams = [INVALID_PARAMS];
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

    const validParams = [ACL_DATA_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', ACL_DATA_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateAcls()', () => {

    const fnToTest = PermissionsApi.updateAcls;

    const validParams = [[ACL_DATA_MOCK]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}`, [ACL_DATA_MOCK]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
