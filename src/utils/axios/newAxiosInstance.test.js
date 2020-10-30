import axios from 'axios';
import { Map, fromJS } from 'immutable';

import newAxiosInstance from './newAxiosInstance';

import * as Config from '../../config/Configuration';
import { INVALID_PARAMS } from '../testing/InvalidParams';
import { genMockAuthToken, genMockBaseUrl } from '../testing/MockUtils';

const axiosCreateSpy = jest.spyOn(axios, 'create');

/*
 * mocks
 */

jest.mock('../../config/Configuration');
Config.getConfig.mockImplementation(() => Map());

/*
 * tests
 */

describe('AxiosUtils : newAxiosInstance()', () => {

  beforeEach(() => {
    jest.resetModules();
    Config.getConfig.mockClear();
    axiosCreateSpy.mockClear();
  });

  test('should throw if the given URL is invalid', () => {
    INVALID_PARAMS.forEach((invalid) => {
      expect(() => {
        newAxiosInstance(invalid);
      }).toThrow();
    });
  });

  test('should not throw if the given URL is valid', () => {
    expect(() => {
      newAxiosInstance(genMockBaseUrl());
    }).not.toThrow();
  });

  test('should not throw if the given URL is localhost', () => {
    expect(() => {
      newAxiosInstance('http://localhost:8080');
    }).not.toThrow();
  });

  test('should create a new Axios instance with the correct Authorization header', () => {

    const mockBaseUrl = genMockBaseUrl();
    const mockAuthToken = genMockAuthToken();

    Config.getConfig.mockImplementationOnce(() => fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance = newAxiosInstance(mockBaseUrl);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: mockBaseUrl,
      headers: {
        common: {
          Authorization: `Bearer ${mockAuthToken}`,
          'Content-Type': 'application/json',
        },
        patch: {
          'Content-Type': 'application/json',
        },
        post: {
          'Content-Type': 'application/json',
        },
        put: {
          'Content-Type': 'application/json',
        },
      }
    });

    expect(axiosInstance.defaults.baseURL).toEqual(mockBaseUrl);
    expect(axiosInstance.defaults.headers.common.Authorization).toEqual(`Bearer ${mockAuthToken}`);
  });

  test('should create a new Axios instance without an Authorization header when authToken is undefined', () => {

    const mockBaseUrl = genMockBaseUrl();
    const axiosInstance = newAxiosInstance(mockBaseUrl);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: mockBaseUrl,
      headers: {
        common: {
          'Content-Type': 'application/json',
        },
        patch: {
          'Content-Type': 'application/json',
        },
        post: {
          'Content-Type': 'application/json',
        },
        put: {
          'Content-Type': 'application/json',
        },
      }
    });

    expect(axiosInstance.defaults.baseURL).toEqual(mockBaseUrl);
    expect(axiosInstance.defaults.headers.common.Authorization).toBeUndefined();
  });

});
