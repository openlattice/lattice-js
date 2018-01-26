/* eslint-disable arrow-body-style */

import BBPromise from 'bluebird';

import * as AxiosUtils from '../axios';
import { INVALID_PARAMS } from './Invalid';
import { getMockAxiosInstance } from './MockUtils';

export const OBJECT_TAG = '[object Object]';

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, httpMethod) {

  const mockAxiosInstance = getMockAxiosInstance();
  AxiosUtils.getApiAxiosInstance.mockImplementationOnce(() => mockAxiosInstance);
  expect.assertions(2);
  return functionToTest(...functionParams)
    .then(() => {
      expect(mockAxiosInstance[httpMethod]).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance[httpMethod]).toHaveBeenCalledWith(...requestParams);
    });
}

function testApiShouldSendCorrectDeleteRequest(functionToTest, functionParams, requestParams) {

  test('should send a DELETE request with the correct params', () => {
    return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, 'delete');
  });
}

function testApiShouldSendCorrectGetRequest(functionToTest, functionParams, requestParams) {

  test('should send a GET request with the correct params', () => {
    return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, 'get');
  });
}

function testApiShouldSendCorrectPatchRequest(functionToTest, functionParams, requestParams) {

  test('should send a PATCH request with the correct params', () => {
    return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, 'patch');
  });
}

function testApiShouldSendCorrectPostRequest(functionToTest, functionParams, requestParams) {

  test('should send a POST request with the correct params', () => {
    return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, 'post');
  });
}

function testApiShouldSendCorrectPutRequest(functionToTest, functionParams, requestParams) {

  test('should send a PUT request with the correct params', () => {
    return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, 'put');
  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldReturnPromise(functionToTest, validParams) {

  test('should return a Promise when given valid parameters', () => {
    expect(functionToTest(...validParams)).toEqual(expect.any(Promise));
  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, apiName) {

  test('should invoke getApiAxiosInstance() with the correct API', () => {
    expect.assertions(2);
    return functionToTest(...validParams)
      .then(() => {
        expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
        expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(apiName);
      });
  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldReturnNullOnInvalidParameters(functionToTest, validParams, invalidParams) {

  test('should return null when given invalid parameters', () => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    for (let i = 0; i < validParams.length; i += 1) {
      const invocationParams1 = validParams.slice(0);
      const invocationParams2 = validParams.slice(0);
      invalidParams[i].forEach((invalidInput) => {
        invocationParams1[i] = invalidInput;
        invocationParams2[i] = [invalidInput];
        expect(functionToTest(...invocationParams1)).toEqual(null);
        expect(functionToTest(...invocationParams2)).toEqual(null);
      });
    }

  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams) {

  test('should not throw when given invalid parameters', () => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const invocations = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidInput) => {
        invocations.push([invalidInput]);
        invocations.push([[invalidInput]]);
      });
    }
    else {
      for (let i = 0; i < validParams.length; i += 1) {
        const invocationParams1 = validParams.slice(0);
        const invocationParams2 = validParams.slice(0);
        invalidParams[i].forEach((invalidInput) => {
          invocationParams1[i] = invalidInput;
          invocationParams2[i] = [invalidInput];
          invocations.push(invocationParams1.slice(0));
          invocations.push(invocationParams2.slice(0));
        });
      }
    }


    invocations.forEach((invocationParams) => {
      expect(() => {
        const result = functionToTest(...invocationParams);
        if (result instanceof Promise) {
          result.catch(() => {});
        }
      }).not.toThrow();
    });

  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams) {

  test('should reject when given invalid parameters', (done) => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const promises = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidInput) => {
        promises.push(functionToTest(invalidInput));
        promises.push(functionToTest([invalidInput]));
      });
    }
    else {
      for (let i = 0; i < validParams.length; i += 1) {
        const invocationParams1 = validParams.slice(0);
        const invocationParams2 = validParams.slice(0);
        invalidParams[i].forEach((invalidInput) => {
          invocationParams1[i] = invalidInput;
          invocationParams2[i] = [invalidInput];
          promises.push(functionToTest(...invocationParams1));
          promises.push(functionToTest(...invocationParams2));
        });
      }
    }

    // if any promises are fulfilled, fail
    BBPromise.any(promises)
      .then(() => {
        done.fail();
      })
      .catch(() => {
        done();
      });

  });
}

export {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectDeleteRequest,
  testApiShouldSendCorrectGetRequest,
  testApiShouldSendCorrectPatchRequest,
  testApiShouldSendCorrectPostRequest,
  testApiShouldSendCorrectPutRequest,
  testApiShouldUseCorrectAxiosInstance
};
