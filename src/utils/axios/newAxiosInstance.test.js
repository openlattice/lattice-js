import Axios from 'axios';
import Immutable from 'immutable';

import newAxiosInstance from './newAxiosInstance';
import * as Config from '../../config/Configuration';
import { INVALID_PARAMS_SS } from '../testing/Invalid';
import { genMockAuthToken, genMockBaseUrl } from '../testing/MockDataUtils';

const axiosCreateSpy = jest.spyOn(Axios, 'create');

/*
 * mocks
 */

jest.mock('../../config/Configuration');
Config.getConfig.mockImplementation(() => Immutable.Map());

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
    INVALID_PARAMS_SS.forEach((invalid) => {
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

  test('should create a new Axios instance with the correct Authorization header', () => {

    const mockBaseUrl = genMockBaseUrl();
    const mockAuthToken = genMockAuthToken();

    Config.getConfig.mockImplementationOnce(() => Immutable.fromJS({
      authToken: mockAuthToken
    }));

    const axiosInstance = newAxiosInstance(mockBaseUrl);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: mockBaseUrl,
      headers: {
        common: {
          Authorization: `Bearer ${mockAuthToken}`,
          'Content-Type': 'application/json'
        }
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
          'Content-Type': 'application/json'
        }
      }
    });

    expect(axiosInstance.defaults.baseURL).toEqual(mockBaseUrl);
    expect(axiosInstance.defaults.headers.common.Authorization).toBeUndefined();
  });

});
