import PrincipalTypes from './PrincipalTypes';

const ORGANIZATION = 'ORGANIZATION';
const ROLE = 'ROLE';
const USER = 'USER';
const APP = 'APP';

describe('PrincipalTypes', () => {

  test(`should export "${ORGANIZATION}"`, () => {
    expect(PrincipalTypes.ORGANIZATION).toBeDefined();
    expect(PrincipalTypes.ORGANIZATION).toEqual(ORGANIZATION);
  });

  test(`should export "${ROLE}"`, () => {
    expect(PrincipalTypes.ROLE).toBeDefined();
    expect(PrincipalTypes.ROLE).toEqual(ROLE);
  });

  test(`should export "${USER}"`, () => {
    expect(PrincipalTypes.USER).toBeDefined();
    expect(PrincipalTypes.USER).toEqual(USER);
  });

  test(`should export "${APP}"`, () => {
    expect(PrincipalTypes.APP).toBeDefined();
    expect(PrincipalTypes.APP).toEqual(APP);
  });

});
