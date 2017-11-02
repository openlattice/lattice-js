/* eslint-disable global-require */

import Immutable from 'immutable';

import EnvToUrlMap from '../../src/constants/EnvToUrlMap';

/*
 * a hack to reset the Config module for each test
 *
 * https://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
 *
 * useful links for future reference:
 * https://github.com/webpack/webpack/issues/118
 * https://github.com/webpack/webpack/issues/894
 */
let Config = null;

const context = require.context('../../src', true, /\.js$/);
const moduleIds = context.keys().map((module) => {
  return String(context.resolve(module));
});

/*
 * end hack
 */

const MOCK_JWT = 'j.w.t';

describe('Configuration', () => {

  beforeEach(() => {

    moduleIds.forEach((id) => {
      delete require.cache[id];
    });

    Config = require('../../src/config/Configuration');
  });

  describe('configure()', () => {

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

      it('should not throw if authToken is missing', () => {

        expect(() => {
          Config.configure({ baseUrl: 'localhost' });
        }).not.toThrow();
      });

      it('should not set the auth token if authToken is undefined', () => {

        Config.configure({ baseUrl: 'localhost' });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();

        Config.configure({ authToken: undefined, baseUrl: 'localhost' });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();
      });

      it('should not set the auth token if authToken is null', () => {

        Config.configure({ authToken: null, baseUrl: 'localhost' });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();
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
          Config.configure({ authToken: MOCK_JWT, baseUrl: 'http://api.openlattice.com' });
        }).toThrow();

        expect(() => {
          Config.configure({ authToken: MOCK_JWT, baseUrl: 'http://api.openlattice.com' });
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

        Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://api.openlattice.com' });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.openlattice.com');

        // Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://stg.openlattice.com' });
        // expect(Config.getConfig().get('baseUrl')).toEqual('https://stg.openlattice.com');

        Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://api.openlattice.com' });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.openlattice.com');

        // Config.configure({ authToken: MOCK_JWT, baseUrl: 'https://stg.openlattice.com' });
        // expect(Config.getConfig().get('baseUrl')).toEqual('https://stg.openlattice.com');
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

        Config.configure({ authToken: MOCK_JWT, baseUrl: 'api.openlattice.com' });
        expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

        Config.configure({ authToken: MOCK_JWT, baseUrl: 'openlattice' });
        expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

        Config.configure({ authToken: MOCK_JWT, baseUrl: 'openlattice.com' });
        expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

        Config.configure({ authToken: MOCK_JWT, baseUrl: EnvToUrlMap.get('PROD') });
        expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));
      });

    });

  });

  describe('getConfig()', () => {

    it('should be an instance of Immutable.Map', () => {
      expect(Config.getConfig()).toEqual(jasmine.any(Immutable.Map));
    });

    it('should not be empty', () => {
      expect(Config.getConfig().isEmpty()).toBe(false);
    });

    it('should not be mutable', () => {

      Config.getConfig().set('foo', 'bar');
      expect(Config.getConfig().get('foo')).toBeUndefined();

      Config.getConfig().set('baseUrl', 'foobar');
      expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));
    });

    describe('baseUrl', () => {

      it('should be defined', () => {
        expect(Config.getConfig().get('baseUrl')).toBeDefined();
      });

      it(`should default to ${EnvToUrlMap.get('LOCAL')}`, () => {
        expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));
      });

    });

  });

});
