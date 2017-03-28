/* eslint-disable no-use-before-define */

import BBPromise from 'bluebird';

import * as AxiosUtils from '../../src/utils/AxiosUtils';

import {
  INVALID_PARAMS
} from '../constants/InvalidParams';

// export function testApiFunctionShouldSendGet() {}
// export function testApiFunctionShouldSendPost() {}
// export function testApiFunctionShouldSendPut() {}
// export function testApiFunctionShouldSendPatch() {}
// export function testApiFunctionShouldSendDelete() {}
// export function testApiFunctionShouldSendRequest() {}

// export function testApiFunctionInvocation(
//     mockAxiosInstance :Object,
//     httpMethod :string,
//     done :Function,
//     functionToTest :Function,
//     validParams :mixed[],
//     expectedParams :mixed[]) {
//
//   functionToTest(...validParams)
//     .then(() => {
//       expect(mockAxiosInstance[httpMethod]).toHaveBeenCalledTimes(1);
//       expect(mockAxiosInstance[httpMethod]).toHaveBeenCalledWith(...expectedParams);
//       done();
//     })
//     .catch(() => {
//       done.fail();
//     });
// }

export function testApiFunctionShouldGetCorrectAxiosInstance(
    functionToTest :Function, validParams :mixed[], apiName :string) {

  // expects AxiosUtils.getApiAxiosInstance() to already have a spy attached to it
  it('should invoke getApiAxiosInstance() with the correct API', (done) => {

    functionToTest(...validParams)
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

export function testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest :Function, validParams :mixed[]) {

  // expects AxiosUtils.getApiAxiosInstance() to already have a spy attached to it
  it('should return a Promise when given valid parameters', () => {

    expect(functionToTest(...validParams)).toEqual(jasmine.any(Promise));
  });
}

export function testApiFunctionShouldReturnNullOnInvalidParameters(
    functionToTest :Function, validParams :mixed[], invalidParams :mixed[]) {

  it('should return null when given invalid parameters', () => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    for (let i = 0; i < validParams.length; i += 1) {
      const invocationParams1 :mixed[] = validParams.slice(0);
      const invocationParams2 :mixed[] = validParams.slice(0);
      invalidParams[i].forEach((invalidInput :mixed) => {
        invocationParams1[i] = invalidInput;
        invocationParams2[i] = [invalidInput];
        expect(functionToTest(...invocationParams1)).toEqual(null);
        expect(functionToTest(...invocationParams2)).toEqual(null);
      });
    }

  });
}

export function testApiFunctionShouldNotThrowOnInvalidParameters(
    functionToTest :Function, validParams :mixed[], invalidParams :mixed[]) {

  it('should not throw when given invalid parameters', () => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const invocations :mixed[] = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidInput :mixed) => {
        invocations.push([invalidInput]);
        invocations.push([[invalidInput]]);
      });
    }
    else {
      for (let i = 0; i < validParams.length; i += 1) {
        const invocationParams1 :mixed[] = validParams.slice(0);
        const invocationParams2 :mixed[] = validParams.slice(0);
        invalidParams[i].forEach((invalidInput :mixed) => {
          invocationParams1[i] = invalidInput;
          invocationParams2[i] = [invalidInput];
          invocations.push(invocationParams1.slice(0));
          invocations.push(invocationParams2.slice(0));
        });
      }
    }


    invocations.forEach((invocationParams :mixed[]) => {
      expect(() => {
        const result = functionToTest(...invocationParams);
        if (result instanceof Promise) {
          result.catch(() => {});
        }
      }).not.toThrow();
    });

  });
}

export function testApiFunctionShouldRejectOnInvalidParameters(
    functionToTest :Function, validParams :mixed[], invalidParams :mixed[]) {

  it('should reject when given invalid parameters', (done) => {

    if (validParams.length !== invalidParams.length) {
      throw new Error('validParams.length should equal invalidParams.length');
    }

    const promises :Promise[] = [];

    if (validParams.length === 0) {
      INVALID_PARAMS.forEach((invalidInput :mixed) => {
        promises.push(functionToTest(invalidInput));
        promises.push(functionToTest([invalidInput]));
      });
    }
    else {
      for (let i = 0; i < validParams.length; i += 1) {
        const invocationParams1 :mixed[] = validParams.slice(0);
        const invocationParams2 :mixed[] = validParams.slice(0);
        invalidParams[i].forEach((invalidInput :mixed) => {
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
