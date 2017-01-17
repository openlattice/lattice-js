/* eslint-disable global-require */

import Axios from 'axios';

import EnvToUrlMap from '../../src/constants/EnvToUrlMap';

import {
  DATA_API,
  EDM_API,
  PERMISSIONS_API,
  SEARCH_API,
  USERS_API
} from '../../src/constants/ApiNames';

import {
  EDM_PATH,
  DATA_PATH,
  DATASTORE_PATH,
  PERMISSIONS_PATH,
  PRINCIPALS_PATH,
  SEARCH_PATH
} from '../../src/constants/ApiPaths';

const MOCK_AUTH_TOKEN = 'hello_world';

/*
 * a hack to reset the AxiosUtils module for each test
 *
 * https://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
 *
 * useful links for future reference:
 * https://github.com/webpack/webpack/issues/118
 * https://github.com/webpack/webpack/issues/894
 */
let AxiosUtils = null;
let Config = null;

const context = require.context('../../src', true, /\.js$/);
const moduleIds = context.keys().map((module) => {
  return String(context.resolve(module));
});

describe('AxiosUtils', () => {

  beforeEach(() => {

    spyOn(Axios, 'create').and.callThrough();

    moduleIds.forEach((id) => {
      delete require.cache[id];
    });

    AxiosUtils = require('../../src/utils/AxiosUtils');
    Config = require('../../src/config/Configuration');

    Config.configure({
      authToken: MOCK_AUTH_TOKEN,
      baseUrl: 'localhost'
    });
  });

  describe('getApiBaseUrl()', () => {

    describe('DataApi', () => {

      it('should return the correct LOCAL URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(AxiosUtils.getApiBaseUrl(DATA_API)).toEqual(
          `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${DATA_PATH}`
        );
      });

      it('should return the correct PROD URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'api'
        });
        expect(AxiosUtils.getApiBaseUrl(DATA_API)).toEqual(
          `${EnvToUrlMap.get('PROD')}/${DATASTORE_PATH}/${DATA_PATH}`
        );
      });

    });

    describe('EntityDataModelApi', () => {

      it('should return the correct LOCAL URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(AxiosUtils.getApiBaseUrl(EDM_API)).toEqual(
          `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${EDM_PATH}`
        );
      });

      it('should return the correct PROD URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'api'
        });
        expect(AxiosUtils.getApiBaseUrl(EDM_API)).toEqual(
          `${EnvToUrlMap.get('PROD')}/${DATASTORE_PATH}/${EDM_PATH}`
        );
      });

    });

    describe('PermissionsApi', () => {

      it('should return the correct LOCAL URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(AxiosUtils.getApiBaseUrl(PERMISSIONS_API)).toEqual(
          `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${PERMISSIONS_PATH}`
        );
      });

      it('should return the correct PROD URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'api'
        });
        expect(AxiosUtils.getApiBaseUrl(PERMISSIONS_API)).toEqual(
          `${EnvToUrlMap.get('PROD')}/${DATASTORE_PATH}/${PERMISSIONS_PATH}`
        );
      });

    });

    describe('SearchApi', () => {

      it('should return the correct LOCAL URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(AxiosUtils.getApiBaseUrl(SEARCH_API)).toEqual(
          `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${SEARCH_PATH}`
        );
      });

      it('should return the correct PROD URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'api'
        });
        expect(AxiosUtils.getApiBaseUrl(SEARCH_API)).toEqual(
          `${EnvToUrlMap.get('PROD')}/${DATASTORE_PATH}/${SEARCH_PATH}`
        );
      });

    });

    describe('UsersApi', () => {

      it('should return the correct LOCAL URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(AxiosUtils.getApiBaseUrl(USERS_API)).toEqual(
          `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${PRINCIPALS_PATH}`
        );
      });

      it('should return the correct PROD URL', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'api'
        });
        expect(AxiosUtils.getApiBaseUrl(USERS_API)).toEqual(
          `${EnvToUrlMap.get('PROD')}/${DATASTORE_PATH}/${PRINCIPALS_PATH}`
        );
      });

    });

  });

  describe('getApiAxiosInstance()', () => {

    const DATA_API_BASE_URL = `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${DATA_PATH}`;
    const EDM_API_BASE_URL = `${EnvToUrlMap.get('LOCAL')}/${DATASTORE_PATH}/${EDM_PATH}`;

    it('should create a new Axios instance for each distinct URL', () => {

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(DATA_API);
      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(EDM_API);
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(2);
      expect(axiosInstance1.defaults.baseURL).toEqual(DATA_API_BASE_URL);
      expect(axiosInstance2.defaults.baseURL).toEqual(EDM_API_BASE_URL);

      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

    it('should reuse the existing Axios instance for the same URL', () => {

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(DATA_API);
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(DATA_API_BASE_URL);

      Axios.create.calls.reset();

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(DATA_API);
      expect(Axios.create).not.toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(0);
      expect(axiosInstance2.defaults.baseURL).toEqual(DATA_API_BASE_URL);

      expect(axiosInstance1).toBe(axiosInstance2);
      expect(axiosInstance1).toEqual(axiosInstance2);
    });

    it('should create a new Axios instance for the same URL if the authToken changes', () => {

      const axiosInstance1 = AxiosUtils.getApiAxiosInstance(DATA_API);
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual(DATA_API_BASE_URL);
      expect(axiosInstance1.defaults.headers.common.Authorization).toEqual(`Bearer ${MOCK_AUTH_TOKEN}`);

      Axios.create.calls.reset();
      Config.configure({
        authToken: 'foo_bar',
        baseUrl: 'localhost'
      });

      const axiosInstance2 = AxiosUtils.getApiAxiosInstance(DATA_API);
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance2.defaults.baseURL).toEqual(DATA_API_BASE_URL);
      expect(axiosInstance2.defaults.headers.common.Authorization).toEqual('Bearer foo_bar');

      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

  });

});
