import PrincipalTypes from '../../src/constants/types/PrincipalTypes';

const ORGANIZATION = 'ORGANIZATION';
const ROLE = 'ROLE';
const USER = 'USER';
const APP = 'APP';

describe('PrincipalTypes', () => {

  it(`should expose "${ORGANIZATION}"`, () => {
    expect(PrincipalTypes.ORGANIZATION).toBeDefined();
    expect(PrincipalTypes.ORGANIZATION).toEqual(ORGANIZATION);
  });

  it(`should expose "${ROLE}"`, () => {
    expect(PrincipalTypes.ROLE).toBeDefined();
    expect(PrincipalTypes.ROLE).toEqual(ROLE);
  });

  it(`should expose "${USER}"`, () => {
    expect(PrincipalTypes.USER).toBeDefined();
    expect(PrincipalTypes.USER).toEqual(USER);
  });

  it(`should expose "${APP}"`, () => {
    expect(PrincipalTypes.APP).toBeDefined();
    expect(PrincipalTypes.APP).toEqual(APP);
  });

});
