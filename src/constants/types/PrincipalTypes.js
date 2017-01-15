/*
 * @flow
 */

const PrincipalTypes = {
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER'
};

export type PrincipalType = $Keys<typeof PrincipalTypes>;

export {
  PrincipalTypes as default
};
