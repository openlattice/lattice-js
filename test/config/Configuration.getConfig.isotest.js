import Immutable from 'immutable';

import EnvToUrlMap from '../../src/constants/EnvToUrlMap';

import * as Config from '../../src/config/Configuration';

describe('Configuration.getConfig()', () => {

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
