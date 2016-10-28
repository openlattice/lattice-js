import Axios from 'axios';

import * as Config from '../src/config/Configuration';

/*
 * a hack to reset the AxiosUtils module for each test
 *
 * https://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
 */
let AxiosUtils = null;

const moduleId = './src/utils/AxiosUtils.js';
const context = require.context('../src', true, /AxiosUtils\.js$/);
context.keys().forEach(context);

beforeEach(() => {

  delete require.cache[moduleId];

  AxiosUtils = require('../src/utils/AxiosUtils');

  spyOn(Axios, 'create').and.callThrough();
});

fdescribe('AxiosUtils', () => {

  describe('getAxiosInstance()', () => {

    it('should create a new Axios instance for each distinct URL', () => {

      const axiosInstance1 = AxiosUtils.getAxiosInstance('localhost-1');
      const axiosInstance2 = AxiosUtils.getAxiosInstance('localhost-2');
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(2);
      expect(axiosInstance1.defaults.baseURL).toEqual('localhost-1');
      expect(axiosInstance2.defaults.baseURL).toEqual('localhost-2');

      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

    it('should reuse the existing Axios instance for the same URL', () => {

      const axiosInstance1 = AxiosUtils.getAxiosInstance('localhost');
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual('localhost');

      Axios.create.calls.reset();

      const axiosInstance2 = AxiosUtils.getAxiosInstance('localhost');
      expect(Axios.create).not.toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(0);
      expect(axiosInstance2.defaults.baseURL).toEqual('localhost');

      expect(axiosInstance1).toBe(axiosInstance2);
      expect(axiosInstance1).toEqual(axiosInstance2);
    });

    it('should create a new Axios instance for the same URL if the authToken changes', () => {

      Config.configure({ authToken: 'foo_bar' });

      const axiosInstance1 = AxiosUtils.getAxiosInstance('localhost');
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance1.defaults.baseURL).toEqual('localhost');
      expect(axiosInstance1.defaults.headers.common.Authorization).toEqual('foo_bar');

      Axios.create.calls.reset();
      Config.configure({ authToken: 'hello_world' });

      const axiosInstance2 = AxiosUtils.getAxiosInstance('localhost');
      expect(Axios.create).toHaveBeenCalled();
      expect(Axios.create).toHaveBeenCalledTimes(1);
      expect(axiosInstance2.defaults.baseURL).toEqual('localhost');
      expect(axiosInstance2.defaults.headers.common.Authorization).toEqual('hello_world');

      expect(axiosInstance1).not.toBe(axiosInstance2);
      expect(axiosInstance1).not.toEqual(axiosInstance2);
    });

  });

});
