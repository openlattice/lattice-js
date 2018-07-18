/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as LinkingApi from './LinkingApi';
import { LINKING_API } from '../constants/ApiNames';
import { TYPE_PATH } from '../constants/UrlConstants';
import { INVALID_PARAMS } from '../utils/testing/Invalid';
import { MOCK_LINKING_ENTITY_TYPE_DM, MOCK_LINKING_REQUEST_DM } from '../utils/testing/MockDataModels';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
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

describe('LinkingApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testCreateLinkingEntityType();
  testLinkEntitySets();
});

function testCreateLinkingEntityType() {

  describe('createLinkingEntityType()', () => {

    const functionToTest = LinkingApi.createLinkingEntityType;

    const validParams = [MOCK_LINKING_ENTITY_TYPE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}`, MOCK_LINKING_ENTITY_TYPE_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, LINKING_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testLinkEntitySets() {

  describe('linkEntitySets()', () => {

    const functionToTest = LinkingApi.linkEntitySets;

    const validParams = [MOCK_LINKING_REQUEST_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_LINKING_REQUEST_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, LINKING_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}
