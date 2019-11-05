/* eslint-disable no-use-before-define */

import RequestStateTypes from '../constants/types/RequestStateTypes';

import * as AxiosUtils from '../utils/axios';
import * as RequestsApi from './RequestsApi';
import { REQUESTS_API } from '../constants/ApiNames';
// import { isDefined } from '../utils/LangUtils';
import { INVALID_PARAMS, INVALID_PARAMS_NOT_DEFINED_ALLOWED } from '../utils/testing/Invalid';
import { MOCK_ACL_KEY, MOCK_REQUEST_DM } from '../utils/testing/MockDataModels';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

// const GET_ALL_REQUEST_STATUSES_INVALID_PARAMS = [];
// GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
//   state: 'invalid'
// });
//
// INVALID_PARAMS.forEach((invalidParam) => {
//
//   if (isDefined(invalidParam)) {
//     GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push(
//       invalidParam
//     );
//   }
//
//   GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
//     state: invalidParam
//   });
//
//   GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
//     aclKeys: invalidParam
//   });
// });
//
// INVALID_PARAMS.forEach((invalidParam1) => {
//   INVALID_PARAMS.forEach((invalidParam2) => {
//     GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
//       state: invalidParam1,
//       aclKeys: invalidParam2
//     });
//   });
// });

/*
 * mocks
 */

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('RequestsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetAllRequestStatuses();
  testSubmitRequests();
});

function testGetAllRequestStatuses() {

  // TODO: figure out how to test object parameters with optional properties like in RequestsApi.getAllRequestStatuses

  describe('getAllRequestStatuses()', () => {

    // testApiFunctionShouldRejectOnGivenInvalidParameters(
    //   GET_ALL_REQUEST_STATUSES_INVALID_PARAMS,
    //   RequestsApi.getAllRequestStatuses
    // );

    describe('get all RequestStatuses', () => {

      const fnToTest = RequestsApi.getAllRequestStatuses;
      const validParams = [];
      const axiosParams = [{ url: '/', method: 'get' }];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, REQUESTS_API);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

    describe('get all RequestStatuses for the specified RequestState', () => {

      const fnToTest = RequestsApi.getAllRequestStatuses;
      const validParams = [{ state: RequestStateTypes.SUBMITTED }];
      const invalidParams = [INVALID_PARAMS_NOT_DEFINED_ALLOWED];
      const axiosParams = [{ url: `/${RequestStateTypes.SUBMITTED}`, method: 'get' }];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, REQUESTS_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

    describe('get all RequestStatuses for the specified AclKeys', () => {

      // TODO: temporary
      const fnToTest = RequestsApi.getAllRequestStatuses;
      let validParams = [{ aclKeys: [MOCK_ACL_KEY] }];
      const invalidParams = [INVALID_PARAMS_NOT_DEFINED_ALLOWED];
      let axiosParams = [{
        url: '/',
        method: 'post',
        data: [MOCK_ACL_KEY]
      }];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, REQUESTS_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);

      test('should send a Set of AclKeys by correctly removing duplicates', () => {

        validParams = [{
          aclKeys: [
            ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
            ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e'],
            ['8f79e123-3411-4099-a41f-88e5d22d0e8d'],
            ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
            ['fae6af98-2675-45bd-9a5b-1619a87235a8', '4b08e1f9-4a00-4169-92ea-10e377070220'],
            ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e']
          ]
        }];

        axiosParams = [{
          url: '/',
          method: 'post',
          data: [
            ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
            ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e'],
            ['8f79e123-3411-4099-a41f-88e5d22d0e8d'],
            ['fae6af98-2675-45bd-9a5b-1619a87235a8', '4b08e1f9-4a00-4169-92ea-10e377070220']
          ]
        }];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
      });
    });

    describe('get all RequestStatuses for the specified RequestState and AclKeys', () => {

      // TODO: temporary
      const fnToTest = RequestsApi.getAllRequestStatuses;
      const validParams = [{ state: RequestStateTypes.SUBMITTED, aclKeys: [MOCK_ACL_KEY] }];
      const invalidParams = [INVALID_PARAMS_NOT_DEFINED_ALLOWED];
      const axiosParams = [{ url: `/${RequestStateTypes.SUBMITTED}`, method: 'post', data: [MOCK_ACL_KEY] }];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, REQUESTS_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });
  });
}

function testSubmitRequests() {

  describe('submitRequests()', () => {

    const fnToTest = RequestsApi.submitRequests;

    const validParams = [[MOCK_REQUEST_DM]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', [MOCK_REQUEST_DM]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, REQUESTS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
