/*
 * @flow
 */

import _has from 'lodash/has';
import _hasIn from 'lodash/hasIn';
import { List } from 'immutable';

import {
  getInvalidParams,
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance,
} from './TestUtils';

const HTTP_METHODS = ['delete', 'get', 'patch', 'post', 'put', 'request'];

const BASE_TEST_CASE = `
  '': {
    params: {
      optional: [...],
      valid: [...]
    }
  }
`;

const AXIOS_TEST_CASE = `
  '(...params...)': {
    method: '...',
    params: {
      axios: [...],
      valid: [...]
    }
  }
`;

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function runTestSuite(
  api :Object,
  apiName :string,
  config :Object,
) {

  afterEach(() => {
    jest.clearAllMocks();
  });

  Object.keys(config).sort().forEach((fnName) => {
    describe(fnName, () => {

      const fnToTest = api[fnName];
      const tests = config[fnName];

      describe('', () => {
        const { params } = tests[''];
        if (!_has(params, 'optional') || !_has(params, 'valid') || _has(params, 'axios')) {
          throw new Error(`bad base test case, expected... ${BASE_TEST_CASE}`);
        }
        const {
          optional: optionalParams = [],
          valid: validParams,
        } = params;
        const invalidParams = List(validParams).map(
          (validParam, i) => getInvalidParams(validParam, optionalParams[i])
        ).toJS();
        testApiShouldReturnPromise(fnToTest, validParams);
        testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, apiName);
        testApiShouldCatchRejectedPromise(fnToTest, validParams);
        testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
        if (validParams.length > 0) {
          // console.log('invalidParams', invalidParams);
          testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
        }
      });

      Object.keys(tests)
        .filter((testName) => _hasIn(tests, [testName, 'method']))
        .forEach((testName) => {
          describe(testName, () => {
            const { method, params } = tests[testName];
            if (!_has(params, 'axios') || !_has(params, 'valid') || !HTTP_METHODS.includes(method)) {
              throw new Error(`bad axios test case, expected... ${AXIOS_TEST_CASE}`);
            }
            testApiShouldSendCorrectHttpRequest(fnToTest, params.valid, params.axios, method);
          });
        });
    });
  });
}

export {
  runTestSuite,
};
