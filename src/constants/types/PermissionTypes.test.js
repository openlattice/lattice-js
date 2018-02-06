import PermissionTypes from './PermissionTypes';

const DISCOVER = 'DISCOVER';
const LINK = 'LINK';
const OWNER = 'OWNER';
const READ = 'READ';
const WRITE = 'WRITE';

describe('PermissionTypes', () => {

  test(`should export "${DISCOVER}"`, () => {
    expect(PermissionTypes.DISCOVER).toBeDefined();
    expect(PermissionTypes.DISCOVER).toEqual(DISCOVER);
  });

  test(`should export "${LINK}"`, () => {
    expect(PermissionTypes.LINK).toBeDefined();
    expect(PermissionTypes.LINK).toEqual(LINK);
  });

  test(`should export "${OWNER}"`, () => {
    expect(PermissionTypes.OWNER).toBeDefined();
    expect(PermissionTypes.OWNER).toEqual(OWNER);
  });

  test(`should export "${READ}"`, () => {
    expect(PermissionTypes.READ).toBeDefined();
    expect(PermissionTypes.READ).toEqual(READ);
  });

  test(`should export "${WRITE}"`, () => {
    expect(PermissionTypes.WRITE).toBeDefined();
    expect(PermissionTypes.WRITE).toEqual(WRITE);
  });

});
