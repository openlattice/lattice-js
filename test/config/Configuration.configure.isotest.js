import EnvToUrlMap from '../../src/constants/EnvToUrlMap';

import * as Config from '../../src/config/Configuration';

describe('Configuration.configure()', () => {

  it(`should correctly set the base URL to ${EnvToUrlMap.get('LOCAL')}`, () => {

    Config.configure({ baseUrl: 'local' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

    Config.configure({ baseUrl: 'localhost' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));

    Config.configure({ baseUrl: EnvToUrlMap.get('LOCAL') });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('LOCAL'));
  });

  it(`should correctly set the base URL to ${EnvToUrlMap.get('DEV')}`, () => {

    Config.configure({ baseUrl: 'dev' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));

    Config.configure({ baseUrl: 'dev.loom.digital' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));

    Config.configure({ baseUrl: EnvToUrlMap.get('DEV') });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('DEV'));
  });

  it(`should correctly set the base URL to ${EnvToUrlMap.get('STG')}`, () => {

    Config.configure({ baseUrl: 'staging' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));

    Config.configure({ baseUrl: 'staging.loom.digital' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));

    Config.configure({ baseUrl: EnvToUrlMap.get('STG') });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('STG'));
  });

  it(`should correctly set the base URL to ${EnvToUrlMap.get('PROD')}`, () => {

    Config.configure({ baseUrl: 'api' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

    Config.configure({ baseUrl: 'api.loom.digital' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

    Config.configure({ baseUrl: 'loom' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

    Config.configure({ baseUrl: 'loom.digital' });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));

    Config.configure({ baseUrl: EnvToUrlMap.get('PROD') });
    expect(Config.getConfig().get('baseUrl')).toEqual(EnvToUrlMap.get('PROD'));
  });

});
