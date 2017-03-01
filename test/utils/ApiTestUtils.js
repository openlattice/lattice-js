/* eslint-disable no-use-before-define */

import BBPromise from 'bluebird';

import * as AxiosUtils from '../../src/utils/AxiosUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

export function testApiFunctionShouldGetCorrectAxiosInstance(apiName, functionToTest, ...validParameters) {

  // expects AxiosUtils.getApiAxiosInstance() to already have a spy attached to it
  it('should invoke getApiAxiosInstance() with the correct API', (done) => {

    functionToTest(...validParameters)
      .then(() => {
        expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
        expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(apiName);
        done();
      })
      .catch(() => {
        done.fail();
      });
  });
}

export function testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, ...validParameters) {

  // expects AxiosUtils.getApiAxiosInstance() to already have a spy attached to it
  it('should return a Promise when given valid parameters', () => {

    expect(functionToTest(...validParameters)).toEqual(jasmine.any(Promise));
  });
}

export function testApiFunctionShouldReturnNullOnInvalidParameters(functionToTest, ...validParameters) {

  it('should return null when given invalid parameters', () => {

    for (let i = 0; i < validParameters.length; i += 1) {

      const invocationParameters = validParameters.slice(0);
      INVALID_PARAMS.forEach((invalidInput) => {

        invocationParameters[i] = invalidInput;

        expect(functionToTest(...invocationParameters)).toEqual(null);
        expect(functionToTest([...invocationParameters])).toEqual(null);
      });
    }
  });
}

export function testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, ...validParameters) {

  it('should not throw when given invalid parameters', () => {

    for (let i = 0; i < validParameters.length; i += 1) {

      const invocationParameters = validParameters.slice(0);
      INVALID_PARAMS.forEach((invalidInput) => {

        invocationParameters[i] = invalidInput;

        expect(() => {
          const result = functionToTest(...invocationParameters);
          if (result instanceof Promise) {
            result.catch(() => {});
          }
        }).not.toThrow();

        expect(() => {
          const result = functionToTest([...invocationParameters]);
          if (result instanceof Promise) {
            result.catch(() => {});
          }
        }).not.toThrow();
      });
    }
  });
}

export function testApiFunctionShouldRejectOnInvalidParameters(functionToTest, ...validParams) {

  it('should reject when given invalid parameters', (done) => {

    testShouldRejectOnInvalidParameters(done, INVALID_PARAMS, functionToTest, validParams);
  });
}

export function testApiFunctionShouldRejectOnGivenInvalidParameters(invalidParams, functionToTest, ...validParams) {

  it('should reject when given specific invalid parameters', (done) => {

    testShouldRejectOnInvalidParameters(done, invalidParams, functionToTest, validParams);
  });
}

function testShouldRejectOnInvalidParameters(done, invalidParams, functionToTest, ...validParams) {

  const promises = [];

  if (validParams.length === 0) {

    invalidParams.forEach((invalidInput :any) => {
      promises.push(
        functionToTest(invalidInput)
      );
      promises.push(
        functionToTest([invalidInput])
      );
    });
  }
  else {

    for (let i = 0; i < validParams.length; i += 1) {
      const invocationParams1 = validParams.slice(0);
      const invocationParams2 = validParams.slice(0);
      invalidParams.forEach((invalidInput :any) => {
        invocationParams1[i] = invalidInput;
        promises.push(
          functionToTest(...invocationParams1)
        );
        invocationParams2[i] = [invalidInput];
        promises.push(
          functionToTest(...invocationParams2)
        );
      });
    }
  }

  BBPromise.any(promises)
    .then(() => {
      done.fail();
    })
    .catch(() => {
      done();
    });
}
