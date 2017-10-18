/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_ACL_KEY,
  MOCK_ACL_DATA_DM
} from '../constants/MockDataModels';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

let mockAxiosInstance = null;

describe('PermissionsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetAcl();
  testUpdateAcl();
});

function testGetAcl() {

  describe('getAcl()', () => {

    const functionToTest = PermissionsApi.getAcl;

    const validParams = [
      MOCK_ACL_KEY
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.getAcl(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/',
            MOCK_ACL_KEY
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateAcl() {

  describe('updateAcl()', () => {

    const functionToTest = PermissionsApi.updateAcl;

    const validParams = [
      MOCK_ACL_DATA_DM
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      PermissionsApi.updateAcl(...validParams)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            '/',
            MOCK_ACL_DATA_DM
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, PERMISSIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
