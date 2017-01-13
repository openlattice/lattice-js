import * as ApiNames from '../../src/constants/ApiNames';

const DATA_API :string = 'DataApi';
const EDM_API :string = 'EntityDataModelApi';
const ORGANIZATIONS_API :string = 'OrganizationsApi';
const PERMISSIONS_API :string = 'PermissionsApi';
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

  it(`should expose "${ORGANIZATIONS_API}"`, () => {
    expect(ApiNames.ORGANIZATIONS_API).toBeDefined();
    expect(ApiNames.ORGANIZATIONS_API).toEqual(ORGANIZATIONS_API);
  });

  it(`should expose "${PERMISSIONS_API}"`, () => {
    expect(ApiNames.PERMISSIONS_API).toBeDefined();
    expect(ApiNames.PERMISSIONS_API).toEqual(PERMISSIONS_API);
  });

  it(`should expose "${USERS_API}"`, () => {
    expect(ApiNames.USERS_API).toBeDefined();
    expect(ApiNames.USERS_API).toEqual(USERS_API);
  });

});
