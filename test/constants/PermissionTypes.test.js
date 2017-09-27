import PermissionTypes from '../../src/constants/types/PermissionTypes';

const DISCOVER = 'DISCOVER';
const LINK = 'LINK';
const OWNER = 'OWNER';
const READ = 'READ';
const WRITE = 'WRITE';

describe('PermissionTypes', () => {

  it(`should expose "${DISCOVER}"`, () => {
    expect(PermissionTypes.DISCOVER).toBeDefined();
    expect(PermissionTypes.DISCOVER).toEqual(DISCOVER);
  });

  it(`should expose "${LINK}"`, () => {
    expect(PermissionTypes.LINK).toBeDefined();
    expect(PermissionTypes.LINK).toEqual(LINK);
  });

  it(`should expose "${OWNER}"`, () => {
    expect(PermissionTypes.OWNER).toBeDefined();
    expect(PermissionTypes.OWNER).toEqual(OWNER);
  });

  it(`should expose "${READ}"`, () => {
    expect(PermissionTypes.READ).toBeDefined();
    expect(PermissionTypes.READ).toEqual(READ);
  });

  it(`should expose "${WRITE}"`, () => {
    expect(PermissionTypes.WRITE).toBeDefined();
    expect(PermissionTypes.WRITE).toEqual(WRITE);
  });

});
