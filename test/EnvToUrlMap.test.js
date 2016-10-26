import Immutable from 'immutable';

import EnvToUrlMap from '../src/constants/EnvToUrlMap';

const URLS = {
  LOCAL: 'http://localhost:8080',
  DEV: 'http://dev.loom.digital',
  STG: 'http://staging.loom.digital',
  PROD: 'http://api.loom.digital'
};

describe('EnvToUrlMap', () => {

  it('should be an instance of Immutable.Map', () => {
    expect(EnvToUrlMap).toEqual(jasmine.any(Immutable.Map));
  });

  it('should not be empty', () => {
    expect(EnvToUrlMap.isEmpty()).toBe(false);
  });

  it('should not be mutable', () => {

    EnvToUrlMap.set('foo', 'bar');
    expect(EnvToUrlMap.get('foo')).toBeUndefined();

    EnvToUrlMap.set('LOCAL', 'foobar');
    expect(EnvToUrlMap.get('LOCAL')).toEqual(URLS.LOCAL);
  });

  it('should have the correct LOCAL URL', () => {
    expect(EnvToUrlMap.get('LOCAL')).toEqual(URLS.LOCAL);
  });

  it('should have the correct DEV URL', () => {
    expect(EnvToUrlMap.get('DEV')).toEqual(URLS.DEV);
  });

  it('should have the correct STG URL', () => {
    expect(EnvToUrlMap.get('STG')).toEqual(URLS.STG);
  });

  it('should have the correct PROD URL', () => {
    expect(EnvToUrlMap.get('PROD')).toEqual(URLS.PROD);
  });

});
