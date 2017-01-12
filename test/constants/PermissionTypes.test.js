import PermissionTypes from '../../src/constants/PermissionTypes';

const ALTER :string = 'ALTER';
const DISCOVER :string = 'DISCOVER';
const LINK :string = 'LINK';
const OWNER :string = 'OWNER';
const READ :string = 'READ';
const WRITE :string = 'WRITE';

describe('PermissionTypes', () => {

  it(`should expose "${ALTER}"`, () => {
    expect(PermissionTypes.ALTER).toBeDefined();
    expect(PermissionTypes.ALTER).toEqual(ALTER);
  });

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
