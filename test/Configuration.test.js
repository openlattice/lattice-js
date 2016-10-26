import * as ApiEndpoints from '../src/config/ApiEndpoints';
import * as ApiNames from '../src/constants/ApiNames';
import * as Configuration from '../src/config/Configuration';

const ENVIRONMENT_URLS = {
  LOCAL: 'http://localhost:8080',
  DEV: 'http://dev.loom.digital',
  STG: 'http://staging.loom.digital',
  PROD: 'http://api.loom.digital'
};

describe('Configuration', () => {

  describe('backend URLS', () => {

    it(`should return ${ENVIRONMENT_URLS.LOCAL} for LOCAL`, () => {
      expect(Configuration.BACKEND_URLS.get('LOCAL')).toEqual(ENVIRONMENT_URLS.LOCAL);
    });

    it(`should return ${ENVIRONMENT_URLS.DEV} for DEV`, () => {
      expect(Configuration.BACKEND_URLS.get('DEV')).toEqual(ENVIRONMENT_URLS.DEV);
    });

    it(`should return ${ENVIRONMENT_URLS.STG} for STG`, () => {
      expect(Configuration.BACKEND_URLS.get('STG')).toEqual(ENVIRONMENT_URLS.STG);
    });

    it(`should return ${ENVIRONMENT_URLS.PROD} for PROD`, () => {
      expect(Configuration.BACKEND_URLS.get('PROD')).toEqual(ENVIRONMENT_URLS.PROD);
    });

  });

  describe('configure() and getBaseUrl()', () => {

    it(`should default to ${ENVIRONMENT_URLS.LOCAL}`, () => {
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.LOCAL);
    });

    it(`should correctly set the base URL to ${ENVIRONMENT_URLS.LOCAL}`, () => {

      Configuration.configure({ baseUrl: 'local' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.LOCAL);

      Configuration.configure({ baseUrl: 'localhost' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.LOCAL);

      Configuration.configure({ baseUrl: ENVIRONMENT_URLS.LOCAL });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.LOCAL);
    });

    it(`should correctly set the base URL to ${ENVIRONMENT_URLS.DEV}`, () => {

      Configuration.configure({ baseUrl: 'dev' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.DEV);

      Configuration.configure({ baseUrl: 'dev.loom.digital' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.DEV);

      Configuration.configure({ baseUrl: ENVIRONMENT_URLS.DEV });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.DEV);
    });

    it(`should correctly set the base URL to ${ENVIRONMENT_URLS.STG}`, () => {

      Configuration.configure({ baseUrl: 'staging' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.STG);

      Configuration.configure({ baseUrl: 'staging.loom.digital' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.STG);

      Configuration.configure({ baseUrl: ENVIRONMENT_URLS.STG });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.STG);
    });

    it(`should correctly set the base URL to ${ENVIRONMENT_URLS.PROD}`, () => {

      Configuration.configure({ baseUrl: 'api' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.PROD);

      Configuration.configure({ baseUrl: 'api.loom.digital' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.PROD);

      Configuration.configure({ baseUrl: 'loom' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.PROD);

      Configuration.configure({ baseUrl: 'loom.digital' });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.PROD);

      Configuration.configure({ baseUrl: ENVIRONMENT_URLS.PROD });
      expect(Configuration.getBaseUrl()).toEqual(ENVIRONMENT_URLS.PROD);
    });

  });

});
