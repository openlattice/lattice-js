/*
 * @flow
 */

/* eslint-disable arrow-body-style */

import BBPromise from 'bluebird';
import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isNumber from 'lodash/isNumber';
import _isPlainObject from 'lodash/isPlainObject';
import _isString from 'lodash/isString';

import * as TheTypes from '../../constants/types';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL,
  INVALID_PARAMS_OPTIONAL_ARRAY,
  INVALID_PARAMS_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_OPTIONAL_NUMBER,
  INVALID_PARAMS_OPTIONAL_OBJECT,
  INVALID_PARAMS_OPTIONAL_SPECIAL_STRING,
  INVALID_PARAMS_OPTIONAL_STRING,
  INVALID_PARAMS_REQUIRED_BOOLEAN,
  INVALID_PARAMS_REQUIRED_NUMBER,
  INVALID_PARAMS_REQUIRED_STRING,
} from './InvalidParams';
import { genRandomUUID, getMockAxiosInstance } from './MockUtils';
import { isValidUUID } from '../ValidationUtils';

import * as AxiosUtils from '../axios';

export const OBJECT_TAG = '[object Object]';

function isSpecialString(value :string) {

  if (!_isString(value)) {
    return false;
  }

  if (isValidUUID(value)) {
    return true;
  }

  return Object.keys(TheTypes).reduce((special, key) => special || _has(TheTypes[key], value), false);
}

function getInvalidParams(validParam :any, isOptional :boolean = false) {

  let invalidParams = INVALID_PARAMS;

  // optional && allowed to be empty
  if (isOptional === true) {
    if (isSpecialString(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_SPECIAL_STRING;
    }
    else if (_isString(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_STRING;
    }
    else if (_isBoolean(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_BOOLEAN;
    }
    else if (_isNumber(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_NUMBER;
    }
    else if (_isArray(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_ARRAY;
    }
    else if (_isPlainObject(validParam)) {
      invalidParams = INVALID_PARAMS_OPTIONAL_OBJECT;
    }
    else {
      invalidParams = INVALID_PARAMS_OPTIONAL;
    }
  }
  // required
  else if (_isString(validParam) && !isSpecialString(validParam)) {
    invalidParams = INVALID_PARAMS_REQUIRED_STRING;
  }
  else if (_isBoolean(validParam)) {
    invalidParams = INVALID_PARAMS_REQUIRED_BOOLEAN;
  }
  else if (_isNumber(validParam)) {
    invalidParams = INVALID_PARAMS_REQUIRED_NUMBER;
  }

  return invalidParams;
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function assertApiShouldSendCorrectHttpRequest(
  functionToTest :Function,
  functionParams :Array<any>,
  requestParams :Array<any>,
  axiosFunction :string,
) {

  const mockAxiosResponse = { data: { id: genRandomUUID() } };
  const mockPromise = new Promise((resolve) => resolve(mockAxiosResponse));
  const mockAxiosInstance = getMockAxiosInstance(mockPromise);
  // $FlowFixMe
  AxiosUtils.getApiAxiosInstance.mockImplementationOnce(() => mockAxiosInstance);
  expect.assertions(8);
  return functionToTest(...functionParams)
    .then((r) => {
      ['delete', 'get', 'patch', 'post', 'put', 'request']
        .filter((fn) => (fn !== axiosFunction))
        .forEach((fn) => {
          expect(mockAxiosInstance[fn]).not.toHaveBeenCalled();
        });
      expect(mockAxiosInstance[axiosFunction.toLowerCase()]).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance[axiosFunction.toLowerCase()]).toHaveBeenCalledWith(...requestParams);
      expect(r).toEqual(mockAxiosResponse.data);
    });
}

function testApiShouldSendCorrectHttpRequest(
  functionToTest :Function,
  functionParams :Array<any>,
  requestParams :Array<any>,
  axiosFunction :string,
) {

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

function testApiShouldCatchRejectedPromise(functionToTest :Function, functionParams :Array<any>) {

  test('should catch rejected promise on http error', () => {

    const axiosError = new Error('failure');
    const mockPromise = new Promise((resolve, reject) => reject(axiosError));
    const mockAxiosInstance = getMockAxiosInstance(mockPromise);
    // $FlowFixMe
    AxiosUtils.getApiAxiosInstance.mockImplementationOnce(() => mockAxiosInstance);
    return functionToTest(...functionParams)
      .catch((e) => {
        expect(e).toEqual(axiosError);
      });
  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldReturnPromise(functionToTest :Function, validParams :Array<any>) {

  test('should return a Promise when given valid parameters', () => {
    expect(functionToTest(...validParams)).toEqual(expect.any(Promise));
  });
}

// AxiosUtils.getApiAxiosInstance() is expected to be mocked with jest.mock() in the test file
function testApiShouldUseCorrectAxiosInstance(functionToTest :Function, validParams :Array<any>, apiName :string) {

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
function testApiShouldReturnNullOnInvalidParameters(
  functionToTest :Function,
  validParams :Array<any>,
  invalidParams :Array<any>,
) {

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
function testApiShouldNotThrowOnInvalidParameters(
  functionToTest :Function,
  validParams :Array<any> = [],
  invalidParams :Array<any> = [],
) {

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
        if (_isPlainObject(invalidParams[i])) {
          Object.keys(invalidParams[i]).forEach((key) => {
            invalidParams[i][key].forEach((invalidValue) => {
              const invocationParams1 = JSON.parse(JSON.stringify(validParams));
              const invocationParams2 = JSON.parse(JSON.stringify(validParams));
              invocationParams1[i][key] = invalidValue;
              invocationParams2[i][key] = [invalidValue];
              invocationParams.push(invocationParams1);
              // invocationParams.push(invocationParams2);
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
            // invocationParams.push(invocationParams2);
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
function testApiShouldRejectOnInvalidParameters(
  functionToTest :Function,
  validParams :Array<any>,
  invalidParams :Array<any>,
) {

  test('should reject when given invalid parameters', (done) => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const invocationParams = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidValue) => {
        invocationParams.push([invalidValue]);
        invocationParams.push([[invalidValue]]);
      });
    }
    else {
      // NOTE: JSON.parse(JSON.stringify()) might be too heavy
      // NOTE: this might be problematic if params are functions / classes
      for (let i = 0; i < validParams.length; i += 1) {
        if (_isPlainObject(invalidParams[i])) {
          Object.keys(invalidParams[i]).forEach((key) => {
            invalidParams[i][key].forEach((invalidValue) => {
              const invocationParams1 = JSON.parse(JSON.stringify(validParams));
              const invocationParams2 = JSON.parse(JSON.stringify(validParams));
              invocationParams1[i][key] = invalidValue;
              invocationParams2[i][key] = [invalidValue];
              invocationParams.push(invocationParams1);
              // invocationParams.push(invocationParams2);
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
            // invocationParams.push(invocationParams2);
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

function testEnumIntegrity(enumToTest :Object, expectedEnum :Object, keysEqualValues :boolean = true) {

  test('should contain only expected keys and values', () => {
    if (keysEqualValues) {
      expect(Object.keys(enumToTest)).toEqual(Object.values(enumToTest));
    }
    expect(Object.keys(enumToTest)).toEqual(expectedEnum.keySeq().toJS());
    expect(Object.values(enumToTest)).toEqual(expectedEnum.valueSeq().toJS());
  });

  expectedEnum.forEach((value, key) => {
    test(`should contain "${key}":"${value}"`, () => {
      expect(enumToTest).toHaveProperty(key);
      expect(enumToTest[key]).toEqual(value);
    });
  });
}

export {
  assertApiShouldSendCorrectHttpRequest,
  getInvalidParams,
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance,
  testEnumIntegrity,
};
