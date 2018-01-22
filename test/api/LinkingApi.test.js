/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/axios';
import * as LinkingApi from '../../src/api/LinkingApi';

import {
  LINKING_API
} from '../../src/constants/ApiNames';

import {
  TYPE_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_LINKING_ENTITY_TYPE_DM,
  MOCK_LINKING_REQUEST_DM
} from '../constants/MockDataModels';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

let mockAxiosInstance = null;

describe('LinkingApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testCreateLinkingEntityType();
  testLinkEntitySets();
});

function testCreateLinkingEntityType() {

  describe('createLinkingEntityType()', () => {

    const functionToTest = LinkingApi.createLinkingEntityType;

    const validParams = [
      MOCK_LINKING_ENTITY_TYPE_DM
    ];

    const invalidParams = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      LinkingApi.createLinkingEntityType(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/${TYPE_PATH}`, MOCK_LINKING_ENTITY_TYPE_DM);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, LINKING_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testLinkEntitySets() {

  describe('linkEntitySets()', () => {

    const functionToTest = LinkingApi.linkEntitySets;

    const validParams = [
      MOCK_LINKING_REQUEST_DM
    ];

    const invalidParams = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      LinkingApi.linkEntitySets(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith('/', MOCK_LINKING_REQUEST_DM);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, LINKING_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
