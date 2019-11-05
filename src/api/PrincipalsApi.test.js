/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as PrincipalsApi from './PrincipalsApi';
import { PRINCIPALS_API } from '../constants/ApiNames';
import {
  CURRENT_PATH,
  EMAIL_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  USERS_PATH,
} from '../constants/UrlConstants';
import { INVALID_PARAMS } from '../utils/testing/Invalid';
import { genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('PrincipalsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetAllRoles();
  testGetAllUsers();
  testGetCurrentRoles();
  testGetUser();
  testSearchAllUsers();
  testSearchAllUsersByEmail();
});

function testGetUser() {

  describe('getUser()', () => {

    const fnToTest = PrincipalsApi.getUser;
    const mockUserId = genRandomString();

    const validParams = [mockUserId];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${mockUserId}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    const fnToTest = PrincipalsApi.getAllUsers;

    const validParams = [];
    const axiosParams = [`/${USERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAllRoles() {

  describe('getAllRoles()', () => {

    const fnToTest = PrincipalsApi.getAllRoles;

    const validParams = [];
    const axiosParams = [`/${ROLES_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetCurrentRoles() {

  describe('getCurrentRoles()', () => {

    const fnToTest = PrincipalsApi.getCurrentRoles;

    const validParams = [];
    const axiosParams = [`/${ROLES_PATH}/${CURRENT_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testSearchAllUsersByEmail() {

  describe('searchAllUsersByEmail()', () => {

    const fnToTest = PrincipalsApi.searchAllUsersByEmail;
    const mockEmail = `${genRandomString()}@openlattice.com`;

    const validParams = [mockEmail];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${mockEmail}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testSearchAllUsers() {

  describe('searchAllUsers()', () => {

    const fnToTest = PrincipalsApi.searchAllUsers;
    const mockInput = `${genRandomString()}`;

    const validParams = [mockInput];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${SEARCH_PATH}/${mockInput}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
