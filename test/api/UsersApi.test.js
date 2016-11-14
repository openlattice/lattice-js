import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as UsersApi from '../../src/api/UsersApi';

import {
  USERS_API
} from '../../src/constants/ApiNames';

const MOCK_PROMISE = new Promise((resolve) => {
  resolve({ data: {} });
});

let mockAxiosInstance = null;
// let requestPromise = null;

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

}

function testGetAllUsers() {

}

function testGetAllUsersForRole() {

}

function testGetAllUsersForAllRoles() {

}

function testResetUserRoles() {

}

describe('UsersApi', () => {

  beforeEach(() => {

    mockAxiosInstance = jasmine.createSpyObj('mockAxiosInstance', ['get', 'post', 'put', 'patch', 'delete']);
    mockAxiosInstance.get.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.post.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.put.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.delete.and.returnValue(MOCK_PROMISE);

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
