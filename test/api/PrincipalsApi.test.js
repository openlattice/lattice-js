/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PrincipalsApi from '../../src/api/PrincipalsApi';

import {
  PRINCIPALS_API
} from '../../src/constants/ApiNames';

import {
  RESET_PATH,
  ROLES_PATH,
  USERS_PATH
} from '../../src/constants/ApiPaths';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_USER_ID = 'kryptnostic';
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

    const functionInvocation = [
      PrincipalsApi.getUser, MOCK_USER_ID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getUser(MOCK_USER_ID)
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

    testApiFunctionShouldGetCorrectAxiosInstance(PRINCIPALS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    const functionInvocation = [
      PrincipalsApi.getAllUsers
    ];

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

    testApiFunctionShouldGetCorrectAxiosInstance(PRINCIPALS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}

function testGetAllUsersForRole() {

  describe('getAllUsersForRole()', () => {

    const functionInvocation = [
      PrincipalsApi.getAllUsersForRole, MOCK_ROLE
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PrincipalsApi.getAllUsersForRole(MOCK_ROLE)
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

    testApiFunctionShouldGetCorrectAxiosInstance(PRINCIPALS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllUsersForAllRoles() {

  describe('getAllUsersForAllRoles()', () => {

    const functionInvocation = [
      PrincipalsApi.getAllUsersForAllRoles
    ];

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

    testApiFunctionShouldGetCorrectAxiosInstance(PRINCIPALS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}
