/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PrincipalsApi from '../../src/api/PrincipalsApi';

import {
  PRINCIPALS_API
} from '../../src/constants/ApiNames';

import {
  ROLES_PATH,
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
} from '../utils/MockDataUtils';

const MOCK_USER_ID = 'openlattice';
const MOCK_ROLE = 'admin';

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
  testGetAllUsersForRole();
  testGetAllUsersForAllRoles();
});

function testGetUser() {

  describe('getUser()', () => {

    const functionToTest :Function = PrincipalsApi.getUser;

    const validParams :any[] = [
      MOCK_USER_ID
    ];

    const invalidParams :any[] = [
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

    const functionToTest :Function = PrincipalsApi.getAllUsers;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

function testGetAllUsersForRole() {

  describe('getAllUsersForRole()', () => {

    const functionToTest :Function = PrincipalsApi.getAllUsersForRole;

    const validParams :any[] = [
      MOCK_ROLE
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getAllUsersForRole(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ROLES_PATH}/${MOCK_ROLE}`
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

function testGetAllUsersForAllRoles() {

  describe('getAllUsersForAllRoles()', () => {

    const functionToTest :Function = PrincipalsApi.getAllUsersForAllRoles;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getAllUsersForAllRoles()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ROLES_PATH}`
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
