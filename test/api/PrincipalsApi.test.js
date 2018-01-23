/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/axios';
import * as PrincipalsApi from '../../src/api/PrincipalsApi';

import {
  PRINCIPALS_API
} from '../../src/constants/ApiNames';

import {
  EMAIL_PATH,
  SEARCH_PATH,
  USERS_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS
} from '../constants/InvalidParams';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockUtils';

const MOCK_USER_ID = 'openlattice';
const MOCK_EMAIL = 'support@openlattice.com';

let mockAxiosInstance = null;

describe('PrincipalsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetUser();
  testGetAllUsers();
  testSearchAllUsersByEmail();
});

function testGetUser() {

  describe('getUser()', () => {

    const functionToTest = PrincipalsApi.getUser;

    const validParams = [
      MOCK_USER_ID
    ];

    const invalidParams = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getUser(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${USERS_PATH}/${MOCK_USER_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    const functionToTest = PrincipalsApi.getAllUsers;

    const validParams = [];
    const invalidParams = [];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getAllUsers()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${USERS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSearchAllUsersByEmail() {

  describe('searchAllUsersByEmail()', () => {

    const functionToTest = PrincipalsApi.searchAllUsersByEmail;

    const validParams = [
      MOCK_EMAIL
    ];

    const invalidParams = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.searchAllUsersByEmail(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${MOCK_EMAIL}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
