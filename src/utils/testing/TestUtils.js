/* eslint-disable arrow-body-style */

import BBPromise from 'bluebird';

import isPlainObject from 'lodash/isPlainObject';
import * as AxiosUtils from '../axios';
import { INVALID_PARAMS } from './Invalid';
import { getMockAxiosInstance } from './MockUtils';

export const OBJECT_TAG = '[object Object]';

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, axiosFunction) {

  const mockAxiosInstance = getMockAxiosInstance();
  AxiosUtils.getApiAxiosInstance.mockImplementationOnce(() => mockAxiosInstance);
  expect.assertions(7);
  return functionToTest(...functionParams)
    .then(() => {
      ['delete', 'get', 'patch', 'post', 'put', 'request']
        .filter((fn) => (fn !== axiosFunction))
        .forEach((fn) => {
          expect(mockAxiosInstance[fn]).not.toHaveBeenCalled();
        });
      expect(mockAxiosInstance[axiosFunction.toLowerCase()]).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance[axiosFunction.toLowerCase()]).toHaveBeenCalledWith(...requestParams);
    });
}

function testApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, axiosFunction) {

  if (axiosFunction.toLowerCase() === 'request') {
    test(`should send a ${requestParams[0].method.toUpperCase()} request with the correct params`, () => {
      return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, axiosFunction);
    });
  }
  else {
    test(`should send a ${axiosFunction.toUpperCase()} request with the correct params`, () => {
      return assertApiShouldSendCorrectHttpRequest(functionToTest, functionParams, requestParams, axiosFunction);
    });
  }
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
      invalidParams[i].forEach((invalidInput) => {
        // NOTE: JSON.parse(JSON.stringify()) might be too heavy
        // NOTE: this might be problematic if params are functions / classes
        const invocationParams1 = JSON.parse(JSON.stringify(validParams));
        const invocationParams2 = JSON.parse(JSON.stringify(validParams));
        invocationParams1[i] = invalidInput;
        invocationParams2[i] = [invalidInput];
        expect(functionToTest(...invocationParams1)).toEqual(null);
        expect(functionToTest(...invocationParams2)).toEqual(null);
      });
    }

  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams = [], invalidParams = []) {

  test('should not throw when given invalid parameters', () => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const invocationParams = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidInput) => {
        invocationParams.push([invalidInput]);
        invocationParams.push([[invalidInput]]);
      });
    }
    else {
      // NOTE: JSON.parse(JSON.stringify()) might be too heavy
      // NOTE: this might be problematic if params are functions / classes
      for (let i = 0; i < validParams.length; i += 1) {
        if (isPlainObject(invalidParams[i])) {
          Object.keys(invalidParams[i]).forEach((key) => {
            invalidParams[i][key].forEach((invalidValue) => {
              const invocationParams1 = JSON.parse(JSON.stringify(validParams));
              const invocationParams2 = JSON.parse(JSON.stringify(validParams));
              invocationParams1[i][key] = invalidValue;
              invocationParams2[i][key] = [invalidValue];
              invocationParams.push(invocationParams1);
              invocationParams.push(invocationParams2);
            });
          });
        }
        else {
          invalidParams[i].forEach((invalidInput) => {
            const invocationParams1 = JSON.parse(JSON.stringify(validParams));
            const invocationParams2 = JSON.parse(JSON.stringify(validParams));
            invocationParams1[i] = invalidInput;
            invocationParams2[i] = [invalidInput];
            invocationParams.push(invocationParams1);
            invocationParams.push(invocationParams2);
          });
        }
      }
    }

    invocationParams.forEach((params) => {
      expect(() => {
        const result = functionToTest(...params);
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

    const invocationParams = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidValue) => {
        invocationParams.push(invalidValue);
        invocationParams.push([invalidValue]);
      });
    }
    else {
      // NOTE: JSON.parse(JSON.stringify()) might be too heavy
      // NOTE: this might be problematic if params are functions / classes
      for (let i = 0; i < validParams.length; i += 1) {
        if (isPlainObject(invalidParams[i])) {
          Object.keys(invalidParams[i]).forEach((key) => {
            invalidParams[i][key].forEach((invalidValue) => {
              const invocationParams1 = JSON.parse(JSON.stringify(validParams));
              const invocationParams2 = JSON.parse(JSON.stringify(validParams));
              invocationParams1[i][key] = invalidValue;
              invocationParams2[i][key] = [invalidValue];
              invocationParams.push(invocationParams1);
              invocationParams.push(invocationParams2);
            });
          });
        }
        else {
          invalidParams[i].forEach((invalidValue) => {
            const invocationParams1 = JSON.parse(JSON.stringify(validParams));
            const invocationParams2 = JSON.parse(JSON.stringify(validParams));
            invocationParams1[i] = invalidValue;
            invocationParams2[i] = [invalidValue];
            invocationParams.push(invocationParams1);
            invocationParams.push(invocationParams2);
          });
        }
      }
    }

    let failedParams;
    const promises = [];
    invocationParams.forEach((params) => {
      promises.push(
        functionToTest(...params).then(() => {
          failedParams = JSON.parse(JSON.stringify(params));
        })
      );
    });

    // if any promises are fulfilled, fail
    BBPromise.any(promises)
      .then(() => {
        done.fail(failedParams);
      })
      .catch(() => {
        done();
      });

  });
}

function testEnumIntegrity(enumToTest, expectedEnum, caseSensitive = true) {

  test('should contain only expected enum values', () => {
    if (caseSensitive) {
      expect(Object.keys(enumToTest)).toEqual(Object.values(enumToTest));
    }
    expect(Object.keys(enumToTest)).toEqual(expectedEnum.keySeq().toJS());
    expect(Object.values(enumToTest)).toEqual(expectedEnum.valueSeq().toJS());
  });

  expectedEnum.forEach((value, key) => {
    test(`should contain "${key}":"${value}"`, () => {
      expect(enumToTest).toHaveProperty(value);
      expect(enumToTest[value]).toEqual(value);
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
  testApiShouldSendCorrectHttpRequest,
  testApiShouldSendCorrectPatchRequest,
  testApiShouldSendCorrectPostRequest,
  testApiShouldSendCorrectPutRequest,
  testApiShouldUseCorrectAxiosInstance,
  testEnumIntegrity,
};
