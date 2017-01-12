import * as ApiNames from '../../src/constants/ApiNames';

const DATA_API :string = 'DataApi';
const EDM_API :string = 'EntityDataModelApi';
const PERMISSIONS_API :string = 'PermissionsApi';
const SEARCH_API :string = 'SearchApi';
const USERS_API :string = 'UsersApi';

describe('ApiNames', () => {

  it(`should expose "${DATA_API}"`, () => {
    expect(ApiNames.DATA_API).toBeDefined();
    expect(ApiNames.DATA_API).toEqual(DATA_API);
  });

  it(`should expose "${EDM_API}"`, () => {
    expect(ApiNames.EDM_API).toBeDefined();
    expect(ApiNames.EDM_API).toEqual(EDM_API);
  });

  it(`should expose "${PERMISSIONS_API}"`, () => {
    expect(ApiNames.PERMISSIONS_API).toBeDefined();
    expect(ApiNames.PERMISSIONS_API).toEqual(PERMISSIONS_API);
  });

  it(`should expose "${SEARCH_API}"`, () => {
    expect(ApiNames.SEARCH_API).toBeDefined();
    expect(ApiNames.SEARCH_API).toEqual(SEARCH_API);
  });

  it(`should expose "${USERS_API}"`, () => {
    expect(ApiNames.USERS_API).toBeDefined();
    expect(ApiNames.USERS_API).toEqual(USERS_API);
  });

});
