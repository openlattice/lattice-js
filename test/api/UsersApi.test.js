/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as UsersApi from '../../src/api/UsersApi';

import {
  USERS_API
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

describe('UsersApi', () => {

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
  testResetUserRoles();
});

function testGetUser() {

  describe('getUser()', () => {

    const functionInvocation = [
      UsersApi.getUser, MOCK_USER_ID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      UsersApi.getUser(MOCK_USER_ID)
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

    testApiFunctionShouldGetCorrectAxiosInstance(USERS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    const functionInvocation = [
      UsersApi.getAllUsers
    ];

    it('should send a GET request with the correct URL path', (done) => {

      UsersApi.getAllUsers()
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

    testApiFunctionShouldGetCorrectAxiosInstance(USERS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}

function testGetAllUsersForRole() {

  describe('getAllUsersForRole()', () => {

    const functionInvocation = [
      UsersApi.getAllUsersForRole, MOCK_ROLE
    ];

    it('should send a GET request with the correct URL path', (done) => {

      UsersApi.getAllUsersForRole(MOCK_ROLE)
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

    testApiFunctionShouldGetCorrectAxiosInstance(USERS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllUsersForAllRoles() {

  describe('getAllUsersForAllRoles()', () => {

    const functionInvocation = [
      UsersApi.getAllUsersForAllRoles
    ];

    it('should send a GET request with the correct URL path', (done) => {

      UsersApi.getAllUsersForAllRoles()
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

    testApiFunctionShouldGetCorrectAxiosInstance(USERS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}

function testResetUserRoles() {

  describe('resetUserRoles()', () => {

    const functionInvocation = [
      UsersApi.resetUserRoles, MOCK_USER_ID, [MOCK_ROLE]
    ];

    it('should send a PATCH request with the correct URL path', (done) => {

      UsersApi.resetUserRoles(MOCK_USER_ID, [MOCK_ROLE])
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${ROLES_PATH}/${RESET_PATH}/${MOCK_USER_ID}`,
            [MOCK_ROLE]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(USERS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
