/* eslint-disable no-use-before-define */

import * as PrincipalsApi from './PrincipalsApi';

import * as AxiosUtils from '../utils/axios';
import { PRINCIPALS_API } from '../constants/ApiNames';
import {
  CURRENT_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  SYNC_PATH,
  USERS_PATH,
} from '../constants/UrlConstants';
import { genRandomPrincipal } from '../models/Principal';
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

  describe('getSecurablePrincipal()', () => {

    const fnToTest = PrincipalsApi.getSecurablePrincipal;
    const mockPrincipal = genRandomPrincipal();

    const validParams = [mockPrincipal];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', mockPrincipal];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

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

  describe('syncUser()', () => {

    const fnToTest = PrincipalsApi.syncUser;

    const validParams = [];
    const axiosParams = [`/${SYNC_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PRINCIPALS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
