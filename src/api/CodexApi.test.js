import * as CodexApi from './CodexApi';

import * as AxiosUtils from '../utils/axios';
import { CODEX_API } from '../constants/ApiNames';
import { INVALID_PARAMS } from '../utils/testing/InvalidParams';
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

describe('CodexApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendOutgoingText()', () => {

    const fnToTest = CodexApi.sendOutgoingText;

    const validParams = [{ organizationId: genRandomUUID(), messageContents: genRandomString() }];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', validParams[0]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, CODEX_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
