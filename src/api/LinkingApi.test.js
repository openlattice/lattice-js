/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as LinkingApi from './LinkingApi';
import { LINKING_API } from '../constants/ApiNames';
import { TYPE_PATH } from '../constants/UrlConstants';
import { INVALID_PARAMS } from '../utils/testing/Invalid';
import { MOCK_LINKING_ENTITY_TYPE_DM, MOCK_LINKING_REQUEST_DM } from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
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

describe('LinkingApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testCreateLinkingEntityType();
  testLinkEntitySets();
});

function testCreateLinkingEntityType() {

  describe('createLinkingEntityType()', () => {

    const fnToTest = LinkingApi.createLinkingEntityType;

    const validParams = [MOCK_LINKING_ENTITY_TYPE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}`, MOCK_LINKING_ENTITY_TYPE_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, LINKING_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testLinkEntitySets() {

  describe('linkEntitySets()', () => {

    const fnToTest = LinkingApi.linkEntitySets;

    const validParams = [MOCK_LINKING_REQUEST_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_LINKING_REQUEST_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, LINKING_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
