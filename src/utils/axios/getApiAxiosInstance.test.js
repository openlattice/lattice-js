import axios from 'axios';
import { Map, fromJS } from 'immutable';

import getApiAxiosInstance from './getApiAxiosInstance';
import getApiBaseUrl from './getApiBaseUrl';
import * as Config from '../../config/Configuration';
import { genMockAuthToken, genMockBaseUrl, genRandomString } from '../testing/MockUtils';

const axiosCreateSpy = jest.spyOn(axios, 'create');

/*
 * mocks
 */

jest.mock('./getApiBaseUrl');
jest.mock('../../config/Configuration');

/*
 * tests
 */

describe('AxiosUtils : getApiAxiosInstance()', () => {

  beforeEach(() => {
    jest.resetModules();
    getApiBaseUrl.mockClear();
    Config.getConfig.mockClear();
    axiosCreateSpy.mockClear();
  });

  test('should create a new Axios instance for each distinct API', () => {

    const mockApi1 = genRandomString();
    const mockApi2 = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl1 = `${mockBaseUrl}/${mockApi1}`;
    const mockApiBaseUrl2 = `${mockBaseUrl}/${mockApi2}`;
    const mockAuthToken = genMockAuthToken();

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance1 = getApiAxiosInstance(mockApi1);
    const axiosInstance2 = getApiAxiosInstance(mockApi2);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(2);
    expect(axiosInstance1.defaults.baseURL).toEqual(mockApiBaseUrl1);
    expect(axiosInstance2.defaults.baseURL).toEqual(mockApiBaseUrl2);
    expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
    expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
    expect(axiosInstance1).not.toBe(axiosInstance2);
    expect(axiosInstance1).not.toEqual(axiosInstance2);
  });

  test('should reuse the existing Axios instance for the same API', () => {

    const mockApi = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl = `${mockBaseUrl}/${mockApi}`;
    const mockAuthToken = genMockAuthToken();

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance1 = getApiAxiosInstance(mockApi);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance1.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);

    axiosCreateSpy.mockClear();

    const axiosInstance2 = getApiAxiosInstance(mockApi);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(0);
    expect(axiosInstance2.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
    expect(axiosInstance1).toBe(axiosInstance2);
    expect(axiosInstance1).toEqual(axiosInstance2);
  });

  test('should create a new Axios instance for the same API if the authToken changes', () => {

    const mockApi = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl = `${mockBaseUrl}/${mockApi}`;
    const mockAuthToken1 = genMockAuthToken();
    const mockAuthToken2 = genMockAuthToken();

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken1
    }));

    const axiosInstance1 = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance1.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken1}`);

    axiosCreateSpy.mockClear();
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken2
    }));

    const axiosInstance2 = getApiAxiosInstance(mockApi);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance2.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken2}`);
    expect(axiosInstance1).not.toBe(axiosInstance2);
    expect(axiosInstance1).not.toEqual(axiosInstance2);
  });

  test('should not set the Authorization header if authToken is not set', () => {

    const mockApi = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl = `${mockBaseUrl}/${mockApi}`;

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => Map());

    const axiosInstance = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance.defaults.headers.common.Authorization).toBeUndefined();
  });

  test('should not set the Authorization header if the authToken changes to undefined', () => {

    const mockApi = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl = `${mockBaseUrl}/${mockApi}`;
    const mockAuthToken = genMockAuthToken();

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance1 = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance1.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);

    axiosCreateSpy.mockClear();
    Config.getConfig.mockImplementation(() => Map());

    const axiosInstance2 = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance2.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance2.defaults.headers.common.Authorization).toBeUndefined();

    expect(axiosInstance1).not.toBe(axiosInstance2);
    expect(axiosInstance1).not.toEqual(axiosInstance2);
  });

  test('should set the Authorization header if the authToken changes and was previously undefined', () => {

    const mockApi = genRandomString();
    const mockBaseUrl = genMockBaseUrl();
    const mockApiBaseUrl = `${mockBaseUrl}/${mockApi}`;
    const mockAuthToken = genMockAuthToken();

    getApiBaseUrl.mockImplementation((api) => `${mockBaseUrl}/${api}`);
    Config.getConfig.mockImplementation(() => Map());

    const axiosInstance1 = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance1.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance1.defaults.headers.common.Authorization).toBeUndefined();

    axiosCreateSpy.mockClear();
    Config.getConfig.mockImplementation(() => fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance2 = getApiAxiosInstance(mockApi);
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosInstance2.defaults.baseURL).toEqual(mockApiBaseUrl);
    expect(axiosInstance2.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
    expect(axiosInstance1).not.toBe(axiosInstance2);
    expect(axiosInstance1).not.toEqual(axiosInstance2);
  });

});
