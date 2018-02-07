/* eslint-disable global-require */

import { genRandomString } from '../utils/testing/MockUtils';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_NOT_DEFINED_ALLOWED
} from '../utils/testing/Invalid';

const MOCK_AUTH_TOKEN = `${genRandomString()}.${genRandomString()}.${genRandomString()}`;

let Config = null;

describe('Configuration', () => {

  beforeEach(() => {
    jest.resetModules();
    Config = require('./Configuration');
  });

  describe('configure()', () => {

    test('should throw if configuration object is missing', () => {
      expect(() => {
        Config.configure();
      }).toThrow();
    });

    test('should throw if configuration object is invalid', () => {
      INVALID_PARAMS.forEach((invalid) => {
        expect(() => {
          Config.configure(invalid);
        }).toThrow();
      });
    });

    test('should correctly set the configuration object', () => {

      Config.configure({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'localhost'
      });
      expect(Config.getConfig().toJS()).toEqual({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'http://localhost:8080'
      });

      Config.configure({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'staging'
      });
      expect(Config.getConfig().toJS()).toEqual({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'https://api.staging.openlattice.com'
      });

      Config.configure({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'production'
      });
      expect(Config.getConfig().toJS()).toEqual({
        authToken: MOCK_AUTH_TOKEN,
        baseUrl: 'https://api.openlattice.com'
      });
    });

    describe('authToken', () => {

      test('should throw if authToken is invalid', () => {
        INVALID_PARAMS_NOT_DEFINED_ALLOWED.forEach((invalid) => {
          expect(() => {
            Config.configure({
              authToken: invalid,
              baseUrl: 'localhost'
            });
          }).toThrow();
        });
      });

      test('should not throw if authToken is undefined', () => {

        expect(() => {
          Config.configure({
            baseUrl: 'localhost'
          });
        }).not.toThrow();

        expect(() => {
          Config.configure({
            authToken: undefined,
            baseUrl: 'localhost'
          });
        }).not.toThrow();
      });

      test('should not set authToken if authToken is undefined', () => {

        Config.configure({
          baseUrl: 'localhost'
        });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();

        Config.configure({
          authToken: undefined,
          baseUrl: 'localhost'
        });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();
      });

      test('should not throw if authToken is null', () => {
        expect(() => {
          Config.configure({
            authToken: null,
            baseUrl: 'localhost'
          });
        }).not.toThrow();
      });

      test('should not set authToken if authToken is null', () => {
        Config.configure({
          authToken: null,
          baseUrl: 'localhost'
        });
        expect(Config.getConfig().has('authToken')).toEqual(false);
        expect(Config.getConfig().get('authToken')).toBeUndefined();
      });

      test('should correctly set authToken', () => {
        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(Config.getConfig().get('authToken')).toEqual(MOCK_AUTH_TOKEN);
      });

    });

    describe('baseUrl', () => {

      test('should throw if baseUrl is missing', () => {
        expect(() => {
          Config.configure({
            authToken: MOCK_AUTH_TOKEN
          });
        }).toThrow();
      });

      test('should throw if baseUrl is invalid', () => {
        INVALID_PARAMS.forEach((invalid) => {
          expect(() => {
            Config.configure({
              authToken: MOCK_AUTH_TOKEN,
              baseUrl: invalid
            });
          }).toThrow();
        });
      });

      test('should throw if baseUrl is not https', () => {
        expect(() => {
          Config.configure({
            authToken: MOCK_AUTH_TOKEN,
            baseUrl: 'http://api.openlattice.com'
          });
        }).toThrow();
      });

      test('should throw if baseUrl does not match known URLs', () => {

        expect(() => {
          Config.configure({
            authToken: MOCK_AUTH_TOKEN,
            baseUrl: 'justbeamit.com'
          });
        }).toThrow();

        expect(() => {
          Config.configure({
            authToken: MOCK_AUTH_TOKEN,
            baseUrl: 'https://justbeamit.com'
          });
        }).toThrow();
      });

      test('should correctly set baseUrl when a valid URL is passed in', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'https://api.v2.openlattice.com'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.v2.openlattice.com');
      });

      test('should correctly set baseUrl to "http://localhost:8080"', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'localhost'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('http://localhost:8080');

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'http://localhost:8080'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('http://localhost:8080');
      });

      test('should correctly set baseUrl to "https://api.staging.openlattice.com"', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'staging'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.staging.openlattice.com');

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'https://api.staging.openlattice.com'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.staging.openlattice.com');
      });

      test('should correctly set baseUrl to "https://api.openlattice.com"', () => {

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'production'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.openlattice.com');

        Config.configure({
          authToken: MOCK_AUTH_TOKEN,
          baseUrl: 'https://api.openlattice.com'
        });
        expect(Config.getConfig().get('baseUrl')).toEqual('https://api.openlattice.com');
      });

    });

  });

  describe('getConfig()', () => {

    test('should be an instance of Immutable.Map', () => {
      // expect(Config.getConfig()).toBeInstanceOf(Immutable.Map);
      expect(Config.getConfig()['@@__IMMUTABLE_MAP__@@']).toEqual(true);
    });

    test('should not be mutable', () => {
      Config.getConfig().set('foo', 'bar');
      expect(Config.getConfig().get('foo')).toBeUndefined();
    });

    test('should not be empty', () => {
      expect(Config.getConfig().isEmpty()).toEqual(false);
    });

    test('should set correct default value for authToken', () => {
      expect(Config.getConfig().get('authToken')).toEqual('');
    });

    test('should set correct default value for baseUrl', () => {
      expect(Config.getConfig().get('baseUrl')).toEqual('http://localhost:8080');
    });

  });

});
