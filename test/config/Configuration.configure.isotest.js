import EnvToUrlMap from '../../src/constants/EnvToUrlMap';

import * as Config from '../../src/config/Configuration';

const MOCK_JWT = 'j.w.t';

describe('Configuration.configure()', () => {

  it('should throw if configuration object is missing', () => {
    expect(() => {
      Config.configure();
    }).toThrow();
  });

  it('should throw if configuration object is empty', () => {
    expect(() => {
      Config.configure({});
    }).toThrow();
  });

  describe('authToken', () => {

    it('should throw if authToken is missing', () => {

      expect(() => {
        Config.configure({ hello: 'world' });
      }).toThrow();
    });

    it('should throw if authToken is invalid', () => {

      expect(() => {
        Config.configure({ authToken: 123 });
      }).toThrow();
    });

    it('should not throw if authToken is valid', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT });
      }).not.toThrow();
    });

    it('should correctly set the auth token', () => {

      Config.configure({ authToken: MOCK_JWT });
      expect(Config.getConfig().get('authToken')).toEqual(MOCK_JWT);
    });

  });

  describe('baseUrl', () => {

    it(`should correctly set the base URL to ${EnvToUrlMap.get('LOCAL')}`, () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'local' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'localhost' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('LOCAL') });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));
    });

    it(`should correctly set the base URL to ${EnvToUrlMap.get('DEV')}`, () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'dev' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'dev.loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('DEV') });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));
    });

    it(`should correctly set the base URL to ${EnvToUrlMap.get('STG')}`, () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'staging' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'staging.loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('STG') });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));
    });

    it(`should correctly set the base URL to ${EnvToUrlMap.get('PROD')}`, () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'api' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'api.loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'loom' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('PROD') });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));
    });

  });

});
