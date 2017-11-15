/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const PrincipalTypes = {
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER',
  APP: 'APP'
};

export type PrincipalType = $Keys<typeof PrincipalTypes>;

export {
  PrincipalTypes as default
};
