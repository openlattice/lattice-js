/* eslint-disable global-require */

// import Axios from 'axios';
// import Immutable from 'immutable';

import * as ApiNames from '../constants/ApiNames';
import * as ApiPaths from '../constants/ApiPaths';
// import * as AxiosUtils from './AxiosUtils';
// import * as Config from '../config/Configuration';
import { INVALID_PARAMS_SPECIAL_STRINGS } from './testing/Invalid';
import { randomId } from './Utils';

const MOCK_BASE_URL = `https://${randomId()}.openlattice.com`;

let AxiosUtils = null;
let Config = null;

/*
 * helper functions
 */

function testShouldReturnCorrectApiUrl(apiName, apiPath) {
  test(`should return the correct base url for ${apiName}`, () => {
    expect(AxiosUtils.getApiBaseUrl(apiName)).toEqual(
      `${MOCK_BASE_URL}/${ApiPaths.DATASTORE_PATH}/${apiPath}`
    );
  });
}

/*
 * tests
 */

describe('AxiosUtils', () => {

  beforeEach(() => {
    jest.resetModules();
    AxiosUtils = require('./AxiosUtils');
    Config = require('../config/Configuration');
  });

  describe('getApiBaseUrl()', () => {

    beforeEach(() => {
      Config.configure({
        baseUrl: MOCK_BASE_URL
      });
    });

    test('should throw if api is invalid', () => {
      INVALID_PARAMS_SPECIAL_STRINGS.forEach((invalid) => {
        expect(() => {
          AxiosUtils.getApiBaseUrl(invalid);
        }).toThrow();
      });
    });

    test('should implement a case to handle all APIs ', () => {
      Object.values(ApiNames).forEach((api) => {
        expect(() => {
          AxiosUtils.getApiBaseUrl(api);
        }).not.toThrow();
      });
    });

    testShouldReturnCorrectApiUrl(ApiNames.ANALYSIS_API, ApiPaths.ANALYSIS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.APP_API, ApiPaths.APP_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.AUTHORIZATION_API, ApiPaths.AUTHORIZATIONS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.DATA_API, ApiPaths.DATA_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.DATA_SOURCES_API, ApiPaths.DATA_SOURCES_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.EDM_API, ApiPaths.EDM_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.LINKING_API, ApiPaths.LINKING_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.ORGANIZATIONS_API, ApiPaths.ORGANIZATIONS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.PERMISSIONS_API, ApiPaths.PERMISSIONS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.PRINCIPALS_API, ApiPaths.PRINCIPALS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.REQUESTS_API, ApiPaths.REQUESTS_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.SEARCH_API, ApiPaths.SEARCH_PATH);
    testShouldReturnCorrectApiUrl(ApiNames.SYNC_API, ApiPaths.SYNC_PATH);

  });

  describe('getApiAxiosInstance()', () => {

    const DATA_API_BASE_URL = `${MOCK_BASE_URL}/${ApiPaths.DATASTORE_PATH}/${ApiPaths.DATA_PATH}`;
    const EDM_API_BASE_URL = `${MOCK_BASE_URL}/${ApiPaths.DATASTORE_PATH}/${ApiPaths.EDM_PATH}`;

    test('should create a new Axios instance for each distinct URL', () => {

      const mockAuthToken = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(ApiNames.DATA_API);
      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(2);
      expect(axiosInstance1.defaults.baseURL).toEqual(DATA_API_BASE_URL);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

    test('should reuse the existing Axios instance for the same URL', () => {

      const mockAuthToken = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(EDM_API_BASE_URL);

      // Axios.create.calls.reset();

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).not.toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(0);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance1).toBe(axiosInstance2);
      expect(axiosInstance1).toEqual(axiosInstance2);
    });

    test('should create a new Axios instance for the same URL if the authToken changes', () => {

      const mockAuthToken1 = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken1,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken1}`);

      // Axios.create.calls.reset();
      const mockAuthToken2 = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken2,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken2}`);
      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

    test('should not set the Authorization header if authToken is not set', () => {

      Config.configure({
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance.defaults.headers.common.Authorization).toBeUndefined();
    });

    test('should not set the Authorization header if the authToken changes to undefined', () => {

      const mockAuthToken = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);

      // Axios.create.calls.reset();
      Config.configure({
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance2.defaults.headers.common.Authorization).toBeUndefined();

      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

    test('should set the Authorization header if the authToken changes and was previously undefined', () => {

      Config.configure({
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance1.defaults.headers.common.Authorization).toBeUndefined();

      // Axios.create.calls.reset();
      const mockAuthToken = `${randomId()}.${randomId()}.${randomId()}`;
      Config.configure({
        authToken: mockAuthToken,
        baseUrl: MOCK_BASE_URL
      });

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(ApiNames.EDM_API);
      // expect(Axios.create).toHaveBeenCalled();
      // expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);
      expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

  });

});
