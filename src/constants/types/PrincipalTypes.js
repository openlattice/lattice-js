/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const PrincipalTypes = {
  APP: 'APP',
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER'
};

export type PrincipalType = $Keys<typeof PrincipalTypes>;

export { PrincipalTypes as default };
