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
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectGetRequest,
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

  testGetUser();
  testGetAllUsers();
  testGetCurrentRoles();
  testSearchAllUsers();
  testSearchAllUsersByEmail();
});

function testGetUser() {

  describe('getUser()', () => {

    const functionToTest = PrincipalsApi.getUser;
    const mockUserId = genRandomString();

    const validParams = [mockUserId];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${mockUserId}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetAllUsers() {

  describe('getAllUsers()', () => {

    const functionToTest = PrincipalsApi.getAllUsers;

    const validParams = [];
    const axiosParams = [`/${USERS_PATH}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetAllRoles() {

  describe('getAllRoles()', () => {

    const functionToTest = PrincipalsApi.getAllRoles;

    const validParams = [];
    const axiosParams = [`/${ROLES_PATH}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetCurrentRoles() {

  describe('getCurrentRoles()', () => {

    const functionToTest = PrincipalsApi.getCurrentRoles;

    const validParams = [];
    const axiosParams = [`/${ROLES_PATH}/${CURRENT_PATH}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testSearchAllUsersByEmail() {

  describe('searchAllUsersByEmail()', () => {

    const functionToTest = PrincipalsApi.searchAllUsersByEmail;
    const mockEmail = `${genRandomString()}@openlattice.com`;

    const validParams = [mockEmail];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${mockEmail}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testSearchAllUsers() {

  describe('searchAllUsers()', () => {

    const functionToTest = PrincipalsApi.searchAllUsers;
    const mockInput = `${genRandomString()}`;

    const validParams = [mockInput];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${USERS_PATH}/${SEARCH_PATH}/${mockInput}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}
