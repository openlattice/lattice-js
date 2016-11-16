import BBPromise from 'bluebird';

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
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_USER_ID = 'kryptnostic';
const MOCK_ROLE = 'admin';

/* eslint-disable no-array-constructor, no-new-object */
const INVALID_INPUT = [
  undefined,
  null,
  [],
  new Array(),
  {},
  new Object(),
  true,
  false,
  -1,
  0,
  1,
  '',
  ' ',
  /regex/
];
/* eslint-enable */

let mockAxiosInstance = null;

function testApiAxiosInstanceInvocation() {

  it('should invoke getApiAxiosInstance() once with the correct API', () => {
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(USERS_API);
  });
}

function testApiMethods() {

  it('should expose getUser()', () => {
    expect(UsersApi.getUser).toEqual(jasmine.any(Function));
  });

  it('should expose getAllUsers()', () => {
    expect(UsersApi.getAllUsers).toEqual(jasmine.any(Function));
  });

  it('should expose getAllUsersForRole()', () => {
    expect(UsersApi.getAllUsersForRole).toEqual(jasmine.any(Function));
  });

  it('should expose getAllUsersForAllRoles()', () => {
    expect(UsersApi.getAllUsersForAllRoles).toEqual(jasmine.any(Function));
  });

  it('should expose resetUserRoles()', () => {
    expect(UsersApi.resetUserRoles).toEqual(jasmine.any(Function));
  });
}

function testGetUser() {

  describe('getUser()', () => {

    beforeEach(() => {
      UsersApi.getUser(MOCK_USER_ID);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {
      const returnValue = UsersApi.getUser(MOCK_USER_ID);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${USERS_PATH}/${MOCK_USER_ID}`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          UsersApi.getUser(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          UsersApi.getUser(invalidInput)
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    beforeEach(() => {
      UsersApi.getAllUsers();
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {
      const returnValue = UsersApi.getAllUsers();
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${USERS_PATH}`
      );
    });

  });
}

function testGetAllUsersForRole() {

  describe('getAllUsersForRole()', () => {

    beforeEach(() => {
      UsersApi.getAllUsersForRole(MOCK_ROLE);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {
      const returnValue = UsersApi.getAllUsersForRole(MOCK_ROLE);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${USERS_PATH}/${ROLES_PATH}/${MOCK_ROLE}`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          UsersApi.getAllUsersForRole(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          UsersApi.getAllUsersForRole(invalidInput)
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

function testGetAllUsersForAllRoles() {

  describe('getAllUsersForAllRoles()', () => {

    beforeEach(() => {
      UsersApi.getAllUsersForAllRoles();
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {
      const returnValue = UsersApi.getAllUsersForAllRoles();
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${USERS_PATH}/${ROLES_PATH}`
      );
    });

  });
}

function testResetUserRoles() {

  describe('resetUserRoles()', () => {

    beforeEach(() => {
      UsersApi.resetUserRoles(MOCK_USER_ID, [MOCK_ROLE]);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {
      const returnValue = UsersApi.resetUserRoles(MOCK_USER_ID, [MOCK_ROLE]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a PATCH request with the correct URL path', () => {
      expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
        `/${USERS_PATH}/${ROLES_PATH}/${RESET_PATH}/${MOCK_USER_ID}`,
        [MOCK_ROLE]
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          UsersApi.resetUserRoles(invalidInput, [MOCK_ROLE]).catch(() => {});
        }).not.toThrow();

        expect(() => {
          UsersApi.resetUserRoles(MOCK_USER_ID, invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          UsersApi.resetUserRoles(invalidInput, [MOCK_ROLE])
        );
        promises.push(
          UsersApi.resetUserRoles(MOCK_USER_ID, invalidInput)
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

describe('UsersApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testApiMethods();
  testGetUser();
  testGetAllUsers();
  testGetAllUsersForRole();
  testGetAllUsersForAllRoles();
  testResetUserRoles();
});
