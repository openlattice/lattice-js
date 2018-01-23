/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as PermissionsApi from './PermissionsApi';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ACL_KEY, MOCK_ACL_DATA_DM } from '../utils/testing/MockDataModels';
import { genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectPatchRequest,
  testApiShouldSendCorrectPostRequest,
  testApiShouldUseCorrectAxiosInstance
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

  testGetAcl();
  testUpdateAcl();
});

function testGetAcl() {

  describe('getAcl()', () => {

    const functionToTest = PermissionsApi.getAcl;

    const validParams = [MOCK_ACL_KEY];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = ['/', MOCK_ACL_KEY];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testUpdateAcl() {

  describe('updateAcl()', () => {

    const functionToTest = PermissionsApi.updateAcl;

    const validParams = [MOCK_ACL_DATA_DM];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = ['/', MOCK_ACL_DATA_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPatchRequest(functionToTest, validParams, axiosParams);
  });
}
