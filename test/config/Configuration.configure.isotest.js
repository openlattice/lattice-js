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
        Config.configure({ baseUrl: 'localhost' });
      }).toThrow();
    });

    it('should throw if authToken is invalid', () => {

      expect(() => {
        Config.configure({ authToken: 123, baseUrl: 'localhost' });
      }).toThrow();
    });

    it('should not throw if authToken is valid', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 'localhost' });
      }).not.toThrow();
    });

    it('should correctly set the auth token', () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'localhost' });
      expect(Config.getConfig().get('authToken')).toEqual(`Bearer ${MOCK_JWT}`);
    });

  });

  describe('baseUrl', () => {

    it('should throw if baseUrl is missing', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT });
      }).toThrow();
    });

    it('should throw if baseUrl is invalid', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 123 });
      }).toThrow();
    });

    it('should throw if baseUrl is not https', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 'http://api.loom.digital' });
      }).toThrow();

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 'http://api.thedataloom.com' });
      }).toThrow();

    });

    it('should throw if baseUrl does not match known URLs', () => {

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 'google.com' });
      }).toThrow();

      expect(() => {
        Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://www.google.com' });
      }).toThrow();

    });

    it('should correctly set the base URL to the URL that is passed in', () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://api.loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual('https://api.loom.digital');

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://stg.loom.digital' });
      expect(Config.getConfig().get('baseUrl')).toEqual('https://stg.loom.digital');

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://api.thedataloom.com' });
      expect(Config.getConfig().get('baseUrl')).toEqual('https://api.thedataloom.com');

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://stg.thedataloom.com' });
      expect(Config.getConfig().get('baseUrl')).toEqual('https://stg.thedataloom.com');
    });

    it(`should correctly set the base URL to ${EnvToUrlMap.get('LOCAL')}`, () => {

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'local' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: 'localhost' });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

      Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('LOCAL') });
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));
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
